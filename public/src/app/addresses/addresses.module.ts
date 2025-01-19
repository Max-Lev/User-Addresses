import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressesRoutingModule } from './addresses-routing.module';
import { ContainerComponent } from './container/container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddCityDialogComponent } from './components/add-city-dialog/add-city-dialog.component';
import { PersonsService } from './providers/persons.service';
import { HttpClientModule } from '@angular/common/http';
import { CitiesPipePipe } from '../pipes/cities-pipe.pipe';

@NgModule({
  declarations: [
    ContainerComponent,
    UserAddressComponent,
    AddCityDialogComponent,
    CitiesPipePipe
  ],
  imports: [
    CommonModule,
    AddressesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    // {
    //   provide: MatDialogRef, useValue: {}
    // },
    PersonsService
  ]

})
export class AddressesModule { }
