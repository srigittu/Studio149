<?php

use Illuminate\Database\Seeder;
use App\Size;

class SizesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::statement('SET FOREIGN_KEY_CHECKS=0');

		DB::table('sizes')->truncate();
    	
    	DB::statement('SET FOREIGN_KEY_CHECKS=1');

        Size::create(array(
            'size' => 'XS'
        ));

        Size::create(array(
            'size' => 'S'
        ));

        Size::create(array(
            'size' => 'M'
        ));

        Size::create(array(
            'size' => 'L'
        ));

        Size::create(array(
            'size' => 'XL'
        ));

        Size::create(array(
            'size' => 'XXL'
        ));
    }
}
