<?php

use App\Report;
use Illuminate\Database\Seeder;

class ReportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Report::truncate();

        $faker = \Faker\Factory::create();

        for($i = 0; $i < 20; $i++){
            Report::create([
                'report_name'=> $faker->company,
                'report_study'=> $faker->company,
                'comment_id'=> $faker->numberBetween($min = 1, $max = 10),
                'study_id'=> $faker->numberBetween($min = 1, $max = 10),
                'report_status'=> 'pass',
            ]);
        }
    }
}
