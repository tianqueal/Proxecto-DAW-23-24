<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailVerificationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class VerificationController extends Controller
{
    /**
     * Instantiate a new VerificationController instance.
     */
    public function __construct()
    {
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    /**
     * User's email verificaiton.
     *
     * @param   $request
     * @return \Illuminate\Http\Response | \Illuminate\View\View
     */
    public function verify(EmailVerificationRequest $request)
    {
        /** @var \App\Models\User $user **/ $user = User::findOrFail($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return response([
                'message' => Lang::get('verification.already_verified')
            ], Response::HTTP_CONFLICT);
        }

        $request->fulfill();

        /* return response(['message' => Lang::get('verification.verified')]); */
        $appName = Config::get('app.name');
        return view('emails.verify_success', [
            'subject' => Lang::get('verification.verified.subject'),
            'app' => $appName,
            'header' => Lang::get('verification.verified.header'),
            'intro' => Lang::get('verification.verified.intro'),
            'url' => Config::get('app.cors.frontend_url'),
            'button' => Lang::get('verification.verified.exit') . ' ' . $appName,
        ]);
    }

    /**
     * Resent verificaiton email to user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response(['message' => Lang::get('verification.already_verified')]);
        }

        $request->user()->sendEmailVerificationNotification();

        return response(['message' => Lang::get('verification.sent')]);
    }
}
