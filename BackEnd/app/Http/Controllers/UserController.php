<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    private $status = 200;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //show all users
        $user = User::all();
        // check condition if count of users is greater than 0
        if (count($user) > 0) {
            // return json response
            return response()->json($user, 200);
        } else {
            // return json response
            return response()->json(['message' => 'No users found'], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required',
            'username' => 'required|max:30',
            'email' => 'required|max:191',
            'password' => 'required|min:8',
            'phone' => 'required',
            'role_as' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $user = new User;
            $user->fullname = $request->input('fullname');
            $user->username = $request->input('username');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->phone = $request->input('phone');
            $user->role_as = $request->input('role_as');
            $user->save();
            return response()->json([
                'status' => 200,
                'message' => 'Successfully created user',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        // show single user by username
        $data = [];
        $user = User::where('username', 'like', $username)->first();
        $data[] = $user;
        return response()->json([
            'data' => $data,
            'username' => $user->username,
            'status' => 200,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //update user
        $validator = Validator::make($request->all(), [
            'fullname' => 'required',
            'username' => 'required|max:30',
            'email' => 'required|max:191',
            'password' => 'required|min:8',
            'phone' => 'required',
            // 'role_as' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $user = User::find($id);
            if ($user) {
                $user->fullname = $request->input('fullname');
                $user->username = $request->input('username');
                $user->email = $request->input('email');
                $user->password = Hash::make($request->input('password'));
                $user->phone = $request->input('phone');
                // $user->role_as = $request->input('role_as') == true ? '1' : '0';
                $user->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Successfully updated user',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User not found',
                ]);
            }
        }
    }

    public function changePassword(Request $request, $username)
    {
        $validator = Validator::make($request->all(), [
            'old_password'=>'required',
            'password'=>'required|min:8|max:100',
            'confirm_password'=>'required|same:password'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Validations fails',
                'errors'=>$validator->errors(),
                'status'=> 422,
            ]);
        }

        $user= User::where('username','like',$username)->first();
        if(Hash::check($request->old_password,$user->password)){
            $user->update([
                'password'=>Hash::make($request->password)
            ]);
            return response()->json([
                'message'=>'Password successfully updated',
                'status'=>200,
            ]);
        }else{
            return response()->json([
                'message'=>'Old password does not matched',
                'status'=>400,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (!is_null($user)) {
            $delete_status = User::where("id", $id)->delete();
            if ($delete_status == 1) {
                return response()->json(["status" => $this->status, "success" => true, "message" => "user record deleted successfully"]);
            } else {
                return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
            }
        } else {
            return response()->json(["status" => "failed", "message" => "Whoops! no user found with this id"]);
        }
    }
}
