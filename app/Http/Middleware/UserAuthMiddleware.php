<?php

namespace App\Http\Middleware;

use App\UserToken;
use Request;
use Closure;

class UserAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        $token = Request::header('apitoken');
        $user_id = Request::header('userid');
        $curtime = date("Y-m-d H:i:s");
        $userAuth = UserLog::where('user_id', $user_id)
                                where('token', $token)
                                where('status', 1)->first();

        if (!$userAuth->user_id) {
            return response('User not logged in, Please login.', 440);
        }
        
        return $next($request);
    }
}