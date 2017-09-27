<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RazorPayOrder extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'order_id'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'razor_pay_orders';

    /**
     * The attributes that is primary key.
     *
     * @var string
     */
    protected $primaryKey = 'id';

	public function orderedProduct()
    {
        return $this->hasOne('App\Product');
    }
}
