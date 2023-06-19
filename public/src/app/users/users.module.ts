import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ContainerComponent } from './container/container.component';
import { MatTableModule } from '@angular/material/table';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { HttpClientModule } from '@angular/common/http';
import { BirthdateFormatePipe } from './pipes/table-formate.pipe';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ContainerComponent,
    UsersTableComponent,
    BirthdateFormatePipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
  ]
})
export class UsersModule { }
