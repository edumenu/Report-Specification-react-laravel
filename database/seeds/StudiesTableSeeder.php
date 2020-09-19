<?php

use Illuminate\Database\Seeder;
use App\Study;

class StudiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Study::truncate();

        $faker = \Faker\Factory::create();

        for($i = 0; $i < 5; $i++){
            Study::create([
                'study_name'=> $faker->randomElement($array = array ('CDK9', 'QED PROPEL 001', 'QED PROPEL 002', 'Acerta', 'Alucent')),
            ]);
        }
    }
}
