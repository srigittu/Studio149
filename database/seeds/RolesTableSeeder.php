<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::statement('SET FOREIGN_KEY_CHECKS=0');

		DB::table('roles')->truncate();
    	
    	DB::statement('SET FOREIGN_KEY_CHECKS=1');

        Role::create(array(
            'role' => 'Administrator',
            'description' => 'Admin for studio149 fashion application.'
        ));

        Role::create(array(
            'role' => 'Customer',
            'description' => 'Customer for studio149 fashion application.'
        ));
    }
}
