<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1000)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@something.com',
            'password' => 'password',
            'birth_date' => '2000-01-01',
            'type' => 'ADMIN'
        ]);
    }
}
