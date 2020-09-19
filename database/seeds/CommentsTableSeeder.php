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
        $array = array ('Edem Dumenu', 'Mike jones', 'James Bond', 'Chris Jones');

        for($i = 0; $i < 80; $i++){
            Comment::create([
                'comment_author'=> $array[$faker->numberBetween($min = 0, $max = 3)],
                'comment_content'=> $faker->paragraph,
                'user_id'=> $faker->numberBetween($min = 1, $max = 4),
                'report_id'=> $faker->numberBetween($min = 1, $max = 50),
            ]);
        }
    }
}
