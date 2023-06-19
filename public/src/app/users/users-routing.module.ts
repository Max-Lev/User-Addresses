import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { GetUsersService } from './providers/get-users.service';

const routes: Routes = [
  {
    path: '', component: ContainerComponent,
    resolve: { getPersons: () => inject(GetUsersService).getPersons$() }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GetUsersService]
})
export class UsersRoutingModule { }
