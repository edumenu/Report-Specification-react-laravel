<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
    protected $fillable = ['study_name'];

    // Each study has many reports
    public function reports()
     {
         return $this->hasMany(Report::class);
     }
}
