<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // /* ----- ROLE DE L'ADMIN -----*/
        //     // je creer d'abord le role admin grace a la methode de classe Role
        //     $adminRole = Role::create(['name' => 'admin']);
        
        //     // il vaut mieux creer des permissions puis les asigner a un user selon
        //     // les besoins. Pour Créer des permissions pour l'admin, je met d'abord
        //     // toute les permissions a creer dan un tableau
        //     $adminPermissions = [
        //         'manageUsers',
        //         'manageProducts',
        //         'manageOrders',
        //         'manageCategories',
        //         'buy',
        //         'sell'
        //     ];

        //     // Ensuite je les creer en passant chaque item du tableau comme parametre
        //     // de la methode ce classe Permission
        //     foreach ($adminPermissions as $permission) {
        //         Permission::create(['name' => $permission]);
        //     }

        //     // Puis j'assigne les permissions au rôle 'admin' en donnant a la methode
        //     // givePermissionTo comme paremetre, le tableau qui contient les permissions.
        //     $adminRole->givePermissionTo($adminPermissions);
        // /* ----- FIN ROLE DE L'ADMIN -----*/

        // /* ----- ROLE POUR LE VENDEUR -----*/
        //     $sellerRole = Role::create(['name' => 'seller']);

        //     $sellerPermissions = [
        //         'manageHerProducts',
        //         'buy',
        //         'sell'
        //     ];
        
        //     foreach ($sellerPermissions as $permission) {
        //             Permission::create(['name' => $permission]);
        //         }
        
        //     $sellerRole->givePermissionTo($sellerPermissions);
        // /* ----- FIN ROLE POUR LE VENDEUR -----*/
        
        // /* ----- ROLE POUR LE CLIENT -----*/
        //     // $clientRole = Role::create(['name' => 'Client']);

        //     // $clientPermissions = [
        //     //     'manageOrders',
        //     //     'sell'
        //     // ];
        
        //     // foreach ($clientPermissions as $permission) {
        //     //         Permission::create(['name' => $permission]);
        //     //     }
        
        //     // $clientRole->givePermissionTo($clientPermissions);
        // /* ----- FIN ROLE POUR LE CLIENT -----*/

               // Créer des permissions
               $manageUsers = Permission::create(['name' => 'manageUsers']);
               $manageProducts = Permission::create(['name' => 'manageProducts']);
               $manageOrders = Permission::create(['name' => 'manageOrders']);
               $editProducts = Permission::create(['name' => 'edit products']);
       
               // Créer des rôles
               $vendeurRole = Role::create(['name' => 'vendeur']);
               $adminRole = Role::create(['name' => 'admin']);
               $userRole = Role::create(['name' => 'user']);
               $clientRole = Role::create(['name' => 'client']);
       
               // Assigner des permissions aux rôles
               // $adminRole->givePermissionTo(['manageUsers', 'manageProducts', 'manageOrders']);
       
       
       
               // Assignation des permissions aux rôles
               $adminRole->givePermissionTo($editProducts,$manageUsers,$manageProducts,$manageOrders);
    }
}
