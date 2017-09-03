<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        Eloquent::unguard();
        $this->call(RolesTableSeeder::class);
        $this->command->info('Roles table seeded Successfully.');

        $this->call(CategoriesTableSeeder::class);
        $this->command->info('Categories table seeded Successfully.');

        $this->call(SizesTableSeeder::class);
        $this->command->info('Sizes table seeded Successfully.');
    }
}
