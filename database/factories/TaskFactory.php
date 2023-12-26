<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $assigned_to = User::inRandomOrder()->first()->id;
        $created_by = $assigned_to;
        $sameUsers = $this->faker->boolean();
        if (!$sameUsers) {
            $created_by = User::inRandomOrder()->first()->id;
        }

        return [
            'assigned_to' => $assigned_to,
            'project_id' => Project::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence(),
            'content' => $this->faker->text(),
            'visible' => $this->faker->boolean(),
            'status' => $this->faker->randomElement(['done', 'not-done']),
            'sort_by' => $this->faker->numberBetween(0, 100),
            'created_by' => $created_by,
            'created_at' => $this->faker->dateTimeBetween('-3 weeks', '-4 day'),
            'updated_at' => $this->faker->dateTimeBetween('-3 days')
        ];
    }
}
