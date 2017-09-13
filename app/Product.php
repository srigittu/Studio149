<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'code'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that is primary key.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    public function creator()
	{
	    return $this->belongsTo('App\User');
	}

	public function productDetail()
    {
        return $this->hasOne('App\ProductDetail');
    }
}
