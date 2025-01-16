import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { PropertiesContainerComponent } from './properties-container/properties-container.component';
import { CanActivateGuard } from './can-activate.guard';
import { state } from '@angular/animations';

const routes: Routes = [
  {
    path: '', component: PropertiesContainerComponent,
    canActivate: [
      () => inject(CanActivateGuard).canActivate()
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
