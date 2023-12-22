<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            ProjectSeeder::class,
            TaskSeeder::class
        ]);
        $this->update_user_login('bondastimotei-admin@gmail.com', 'Tim Admin', 'asd');
        $this->update_user_login('bondastimotei-user@gmail.com', 'Tim User', 'asd', 2, 0);
    }

    /**
     * Change user data
     * 
     * @param $email
     * @param $name
     * @param $password
     * @return void
     */
    private function update_user_login($email, $name, $password, $user = 1, $is_admin = 1)
    {
        $user = User::find($user);
        $user->name = $name;
        $user->email = $email;
        $user->password = bcrypt($password); // Or whatever you use for password encryption
        $user->is_admin = $is_admin;
        $user->save();
    }
}
