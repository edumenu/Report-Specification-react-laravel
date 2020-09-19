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

        for($i = 0; $i < 50; $i++){
            Report::create([
                'report_name'=> $faker->company,
                'report_study'=> $faker->randomElement($array = array ('CDK9', 'QED PROPEL 001', 'QED PROPEL 002', 'Acerta', 'Alucent')),
                'study_id'=> $faker->numberBetween($min = 1, $max = 5),
                'report_status'=> $faker->randomElement($array = array ('passed','failed','programming','testing')),
            ]);
        }
    }
}
