<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'token', 'logged_on'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_login_logs';

    /**
     * The attributes that is primary key.
     *
     * @var string
     */
    protected $primaryKey = 'user_id';

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
