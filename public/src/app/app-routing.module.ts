import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './properties/can-activate.guard';

const routes: Routes = [
  {
    path: 'addresses', loadChildren: () => import('./addresses/addresses.module').then(m => m.AddressesModule),
  },
  {
    path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'properties', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule),
    // canActivate: [
    //   () => inject(CanActivateGuard).canActivate()
    // ]
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'addresses'
  },
  {
    path: '**', redirectTo: 'addresses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(){
    console.log()
  }
}
