<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['comment_author','comment_content','user_id', 'report_id'];

    //Fetching a user ID
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
