<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'price'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'product_details';

    /**
     * The attributes that is primary key.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    public $timestamps = false;

    public function product()
	{
	    return $this->belongsTo('App\Product');
	}

	public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function sizes()
    {
        return $this->belongsToMany('App\Size', 'product_sizes');
    }
}
