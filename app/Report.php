<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = ['report_name','report_study', 'comment_id', 'study_id', 'report_status'];

    //
    public function study()
    {
        return $this->belongsTo(Study::class);
    }
}
