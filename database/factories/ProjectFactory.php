<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assigned_to' => User::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->text(),
            'visible' => $this->faker->boolean(),
            'status' => $this->faker->randomElement(['new', 'in-progress', 'on-hold', 'done']),
            'created_by' => User::inRandomOrder()->first()->id,
            'created_at' => $this->faker->dateTimeBetween('-3 weeks', '-4 day'),
            'updated_at' => $this->faker->dateTimeBetween('-3 days')
        ];
    }
}
