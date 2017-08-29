<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Profile;
use App\Address;
use App\Role;
use App\UserLog;
use App\PasswordReset;
use Carbon\Carbon;
use Mail;
use Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('profile.address', 'roles', 'loginLog')->all();

        return response(array(
                'status' => 'success',
                'message' => $users
                    ), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {   
        $user = User::firstOrNew(['email' => $request->email]);
        if (!$user->id) {
            //store user resouce
            $user->email = $request->email;
            $user->password = md5($request->password);
            $user->save();
            //store user profile resouce
            $profile = new Profile();
            $profile->firstname = $request->firstname;
            $profile->lastname = $request->lastname;
            $user->profile()->save($profile);
            // Assign Customer Role to User
            $role = Role::find(2);
            $user->roles()->save($role);

            $data = array(
                'firstname' => $profile->firstname,
                'lastname' => $profile->lastname,
                'email' => $user->email,
                'link' => url('/#/verify-email/'.$user->id.'/'.$user->password.'941OI'),
                'site' => config('constants.site'),
            );
            $sendMail = Mail::send('emails.register', $data, function ($mail) use ($data) {
                $mail->to($data['email'])->subject('Welcome to Studio 149 Fashion!');
            });

            return response(array(
                'status' => 'success',
                'message' => 'User registered successfully'
                    ), 200);
        } else {

            return response(array(
                'status' => 'success',
                'message' => 'User already registered with this email'
                    ), 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $user = User::with('profile', 'roles')->where('email', $request->email)->first();
        if (!$user) {
            return response(array(
                'status' => 'error',
                'message' => 'User email is not registered'
                    ), 200);
        }
        if ($user->status === 2) {
            return response(array(
                'status' => 'error',
                'message' => 'User email is not yet verified. Check your email!'
                    ), 200);
        }
        if ($user->password === md5($request->password)) {
            // create user login records
            $currentDate = Carbon::now();
            $token = str_random(32);
            $userLoginLog = UserLog::firstOrNew(['user_id' => $user->id]);
            $userLoginLog->token = $token;
            $userLoginLog->logged_on = $currentDate;
            $userLoginLog->save();

            $user->apitoken = $userLoginLog;

            return response(array(
                'status' => 'success',
                'user' => $user
                    ), 200);
        } else {

            return response(array(
                'status' => 'error',
                'message' => 'Invalid user email/password'
                    ), 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function logout($id)
    {
        // logout user
        $currentDate = Carbon::now();
        $userLoginLog = UserLog::firstOrNew(['user_id' => $id]);
        $userLoginLog->logged_out = $currentDate;
        $userLoginLog->status = 2;
        $userLoginLog->save();

        return response(array(
            'status' => 'success',
            'message' => 'User logged successfully'
                ), 200);
    }

    /**
     * Verify the specified user resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function verifyEmail($id, $token)
    {
        // logout user
        $currentDate = Carbon::now();
        $user = User::find($id);
        if (!$user) {
            return response(array(
                'status' => 'success',
                'message' => 'Invalid User'
                    ), 200);
        }
        if ($user->status === 1) {
            return response(array(
            'status' => 'success',
            'message' => 'User email already verified'
                ), 200);
        }
        if ($user->password !== substr($token, 0, -5)) {
            return response(array(
            'status' => 'success',
            'message' => 'Verification failed. User token is invalid!'
                ), 200);
        }
        $user->updated_at = $currentDate;
        $user->status = 1;
        $user->save();

        return response(array(
            'status' => 'success',
            'message' => 'User email successfully verified'
                ), 200);
    }

    /**
     * Generate token for the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function forgotPassword(Request $request)
    {
        // logout user
        $currentDate = Carbon::now();
        $token = str_random(32);

        $user = User::Where('email', $request->email)->first();
        if (!$user) {
            return response(array(
                'status' => 'success',
                'message' => 'User not yet registered'
                    ), 200);
        }

        $passwordReset = PasswordReset::firstOrNew(['email' => $user->email]);
        $passwordReset->token = $token;
        $passwordReset->status = 1;
        $passwordReset->save();

        $data = array(
            'email' => $user->email,
            'link' => url('/#/reset-password/'.$user->id.'/'.$token),
            'site' => config('constants.site'),
        );
        $sendMail = Mail::send('emails.forgot_password', $data, function ($mail) use ($data) {
            $mail->to($data['email'])->subject('Studio149 - Forgot Password!');
        });

        return response(array(
            'status' => 'success',
            'message' => 'User password reset link has been sent successfully'
                ), 200);
    }

    /**
     * Reset the user password of the specified resource.
     *
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function resetPassword(Request $request)
    {
        // logout user
        $currentDate = Carbon::now();

        $user = User::find($request->id);
        
        $passwordReset = PasswordReset::firstOrNew(['email' => $user->email]);
        if(!$passwordReset) {
            return response(array(
            'status' => 'success',
            'message' => 'Invalid user email'
                ), 200);
        }
        if ($passwordReset->token !== $request->token) {
            return response(array(
            'status' => 'success',
            'message' => 'Invalid reset password link'
                ), 200);
        }
        if ($passwordReset->status != 1) {
            return response(array(
            'status' => 'success',
            'message' => 'Reset Password link expired'
                ), 200);
        }
        $passwordReset->updated_at = $currentDate;
        $passwordReset->status = 2;
        $passwordReset->save();

        $user->password = md5($request->password);
        $user->save();

        return response(array(
            'status' => 'success',
            'message' => 'User password updated successfully'
                ), 200);
    }
}
