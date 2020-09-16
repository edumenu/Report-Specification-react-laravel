<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function register(Request $request)
    {
        $request['email_verified_at'] = now();

        // $this->validator($request->all())->validate();

        $rules = array(
            'name' => 'required|max:50',
            'email' => 'required|email|unique:users',
            'role' => 'required',
            'password' => 'required|min:4'
        );

        $credentials = $request->only('name', 'email', 'role', 'password');

        $validator = Validator::make($credentials, $rules);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'nameMessage' => $errors->first('name'),
                'emailMessage' => $errors->first('email'),
                'roleMessage' => $errors->first('role'),
                'passwordMessage' => $errors->first('password')
            ], 401);
        } else {
            $user = $this->create($request->all());

            Auth::guard()->login($user);

            return response()->json([
                'user' => $user,
                'message' => 'You have successfully created an account!'
            ], 200);
        }
    }

    /**
     * Create a new user instance after a valid registration.
     */
    protected function create(array $data)
    {
        return User::forceCreate([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'password' => Hash::make($data['password']),
            'email_verified_at' => now()
        ]);
    }

    /**
     * Login function to create a new user
     */
    protected function login(Request $request)
    {
        // validate the info, create rules for the inputs
        $rules = array(
            'email'    => 'required|email',
            'password' => 'required|alphaNum|min:4'
        );

        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, $rules);

        if ($validator->fails()) {
            $errors = $validator->errors();
            // Return login error messages
            return response()->json([
                'emailMessage' => $errors->first('email'),
                'passwordMessage' => $errors->first('password')
            ], 401);
        } else {
            // Attempt will return true if the authentication was successful
            if (Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Login Successful!'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Invalid email or password. Try again!'
                ], 401);
            }
        }
    }

    /**
     * Update user information
     */
    protected function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // validate the info, create rules for the inputs
        $rules = array(
            'name' => 'nullable|max:50',
            'email' => ['nullable', 'email', Rule::unique('users')->ignore($user)],
            'role' => 'required',
            'password' => 'nullable|min:4'
        );

        $credentials = $request->only('name', 'email', 'role', 'password');

        $validator = Validator::make($credentials, $rules);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json([
                'nameMessage' => $errors->first('name'),
                'emailMessage' => $errors->first('email'),
                'roleMessage' => $errors->first('role'),
                'passwordMessage' => $errors->first('password')
            ], 401);
        } else {

            if ($request['name'] == '') $request['name'] = $user->name;
            if ($request['email'] == '') $request['email'] = $user->email;
            if ($request['role'] == '') $request['role'] = $user->role;
            if ($request['password'] == '') {
                $request['password'] = $user->password;
            } else {
                $request['password'] = Hash::make($request['password']);
            }

            $user->update($request->all());

            return response()->json([
                'message' => 'Update Successful!',
            ], 200);
        }
    }

    /**
     * Function to logout users
     */

    protected function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Logout successful!'
        ], 200);
    }
}
