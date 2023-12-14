<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index');
    }
    /**
     * Send users according to the keyword
     */
    public function get(Request $request)
    {
        $users = User::where('name', 'LIKE', '%' . $request->q . '%')->orWhere('email', 'LIKE', '%' . $request->q . '%')->orderBy('created_at', 'DESC')->paginate(15);
        return response()->json($users, 200);
    }

    public function getPairs()
    {
    }

    public function findUsersByAge(Request $request)
    {
        $$users = User::all();
        $ageMap = [];
        $pairs = [];

        // Create a map of age to users
        foreach ($users as $user) {
            $age = Carbon::parse($user->birth_date)->age;
            $ageMap[$age][] = $user;
        }

        // Find pairs
        foreach ($ageMap as $age => $usersWithAge) {
            $complementAge = $request->age - $age;

            if ($complementAge > 0 && isset($ageMap[$complementAge])) {
                foreach ($usersWithAge as $user1) {
                    foreach ($ageMap[$complementAge] as $user2) {
                        if ($user1->id != $user2->id) {
                            $pairs[] = ['user1' => $user1, 'user2' => $user2];
                        }
                    }
                }
            }
        }

        return response()->json($pairs);
    }


    public function ageDistribution()
    {
        $ageRanges = [
            '15-30' => [15, 30],
            '31-45' => [31, 45],
            '46-60' => [46, 60],
            '61-75' => [61, 75],
        ];

        $distribution = [];

        foreach ($ageRanges as $range => [$ageStart, $ageEnd]) {
            $count = User::whereRaw("TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) BETWEEN ? AND ?", [$ageStart, $ageEnd])
                ->count();

            $distribution[$range] = $count;
        }

        return response()->json(['age_distribution' => $distribution]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $request->validated();
        User::create(array_merge($request->validated(), [
            'type' => 'STANDARD'
        ]));
        return;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return;
    }
}
