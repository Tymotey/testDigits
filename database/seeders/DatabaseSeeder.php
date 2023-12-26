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
        $this->update_user_login('bondastimotei-user@gmail.com', 'Tim User', 'asd', 2, 'user');
    }

    /**
     * Change user data
     * 
     * @param $email
     * @param $name
     * @param $password
     * @return void
     */
    private function update_user_login($email, $name, $password, $user_id = 1, $role = 'admin')
    {
        $user = User::find($user_id);
        $user->name = $name;
        $user->email = $email;
        $user->password = bcrypt($password); // Or whatever you use for password encryption
        $user->role = $role;
        $user->save();
    }
}
