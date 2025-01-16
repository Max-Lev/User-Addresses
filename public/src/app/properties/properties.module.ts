import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesContainerComponent } from './properties-container/properties-container.component';


@NgModule({
  declarations: [
    PropertiesContainerComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { 
  constructor(){
    console.log('PropertiesModule')
  }
}
