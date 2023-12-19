<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(1)->hasProjects(15)->hasTasks(15)->create();
        User::factory()->count(1)->hasProjects(20)->hasTasks(5)->create();
        User::factory()->count(1)->hasProjects(5)->hasTasks(1)->create();
        User::factory()->count(2)->create();
    }
}
