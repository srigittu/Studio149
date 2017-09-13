<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'user_id'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_details';

    /**
     * The attributes that is primary key.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    public function user()
	{
	    return $this->belongsTo('App\User');
	}

	public function address()
    {
        return $this->hasOne('App\Address');
    }
}
