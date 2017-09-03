<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'number'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * The attributes that is primary key.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    public $timestamps = false;

    public function orderProducts()
    {
        return $this->hasMany('App\Product', 'order_products');
    }

    public function orderPayment()
    {
        return $this->hasOne('App\OrderPayment');
    }
}
