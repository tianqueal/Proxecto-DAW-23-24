<?php

use App\Http\Controllers\VerificationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('email/verify/{id}', [VerificationController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');
/*
// Ruta que redirige todas las solicitudes a la vista index.blade.php, excepto las rutas definidas anteriormente
Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!email\/verify).*');
*/
Route::get('/', function () {
    return view('welcome');
});
