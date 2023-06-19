import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { PersonsService } from './providers/persons.service';

const routes: Routes = [{
  path: '', component: ContainerComponent,
  resolve: { getCountries: () => inject(PersonsService).getCountries$() }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule { }
