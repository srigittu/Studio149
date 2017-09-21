<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Razorpay\Api\Api;
use Carbon\Carbon;
use Mail;
use Log;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function enquiry(Request $request)
    {
        $data = array(
            'email' => $request->email,
            'self' => env('MAIL_FROM_ADDRESS'),
            'phone' => $request->phone,
            'name' => $request->firstname,
            'content' => $request->description,
            'subject' => $request->purpose,
            'site' => config('constants.site'),
        );
        if ($request->purposeType == 1) {
            $sendMail = Mail::send('emails.enquiry_appointment', $data, function ($mail) use ($data) {
                $mail->to($data['self'])->subject($data['subject']);
            });
        } elseif ($request->purposeType == 2) {
            $product = Product::with('productDetail.category', 'productDetail.sizes', 'creator')->where('id', $request->productId)->first();
            $data['product'] = $product;
            $sendMail = Mail::send('emails.enquiry_product', $data, function ($mail) use ($data) {
                $mail->to($data['self'])->subject($data['subject']);
            });
        }

        return response(array(
            'status' => 'success',
            'message' => 'Enquiry status success'
        ), 200);
    }

    /**
     * Payment for the product.
     *
     * @return \Illuminate\Http\Response
     */
    public function payment($paymentId, Request $request)
    {
        $api_key = config('constants.payment_key');
        $api_secret = config('constants.secret_key');
        $api = new Api($api_key, $api_secret);
        $payment = $api->payment->fetch($paymentId);
        $api->payment->fetch($paymentId)->capture(array('amount'=>$request->amount));
        $product = Product::find($request->product['id']);
        $product->status = 0;
        $product->save();
        $data = array(
            'buyer' => $payment->email,
            'seller' => env('MAIL_FROM_ADDRESS'),
            'product' => $request->product,
            'payment' => $payment,
            'subject' => 'Studio149 Fashion - Order',
            'site' => config('constants.site'),
        );
        $sendMail = Mail::send('emails.order_product', $data, function ($mail) use ($data) {
            $mail->to([$data['buyer'], $data['seller']])->subject($data['subject']);
        });
        return response(array(
            'status' => 'success',
            'message' => 'Product ordered successfully'
        ), 200);
    }

}