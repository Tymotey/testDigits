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
        $this->update_credentials_for_login('bondastimotei@gmail.com', 'Tim', 'asd');
    }

    /**
     * @param $email
     * @param $name
     * @param $password
     * @return void
     */
    private function update_credentials_for_login($email, $name, $password)
    {
        $user = User::find(1);
        $user->name = $name;
        $user->email = $email;
        $user->password = bcrypt($password); // Or whatever you use for password encryption
        $user->save();
    }
}
