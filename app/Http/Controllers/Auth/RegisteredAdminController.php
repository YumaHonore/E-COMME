<?php

// app/Http/Controllers/Auth/AdminController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class RegisteredAdminController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/admin/register');
    }
    
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            // 'is_admin' => 'boolean',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assigner le rôle d'administrateur si nécessaire
        $roller = $user->assignRole('admin');
        
        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('adminDashboard', absolute: false));
        
        // return redirect()->route('dashboard')->with('success', 'Utilisateur ajouté avec succès.');
    }
}