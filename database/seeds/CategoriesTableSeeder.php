<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::statement('SET FOREIGN_KEY_CHECKS=0');

		DB::table('categories')->truncate();
    	
    	DB::statement('SET FOREIGN_KEY_CHECKS=1');

        Category::create(array(
            'code' => 'PR',
            'name' => 'Pret'
        ));

        Category::create(array(
            'code' => 'FU',
            'name' => 'Fusion'
        ));

        Category::create(array(
            'code' => 'BR',
            'name' => 'Bridal'
        ));

        Category::create(array(
            'code' => 'SP',
            'name' => 'Swathi\'s Special'
        ));
    }
}
