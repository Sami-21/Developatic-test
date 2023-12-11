<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserSeederTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_users_seeder(): void
    {
        $this->seed();
        $this->assertDatabaseCount('users', 1001);
        $this->assertDatabaseHas('users', ['email' => 'admin@something.com']);
    }
}
