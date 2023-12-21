<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::factory()->count(350)->create();
        // $user_ids = User::all('id')->pluck('id')->toArray();
        // $project_ids = Project::all('id')->pluck('id')->toArray();

        // Task::factory()->count(150)->create()->each(function ($task) use ($project_ids, $user_ids) {
        //     $user_id = array_rand($user_ids, 1);
        //     $project_id = array_rand($project_ids, 1);

        //     $task->user_id = $user_ids[$user_id];
        //     $task->project_id = $project_ids[$project_id];
        //     $task->save();
        // });
    }
}
