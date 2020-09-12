<?php

use App\Comment;
use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comment::truncate();

        $faker = \Faker\Factory::create();

        for($i = 0; $i < 20; $i++){
            Comment::create([
                'comment_author'=> $faker->name,
                'comment_content'=> $faker->paragraph,
                'user_id'=> $faker->randomDigit,
                'report_id'=> $faker->randomDigit,
            ]);
        }
    }
}
