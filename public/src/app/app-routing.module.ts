import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'addresses', loadChildren: () => import('./addresses/addresses.module').then(m => m.AddressesModule),
  },
  {
    path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'addresses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
