import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Person } from 'src/app/addresses/models/person.model';
import { DISPLAYED_COLUMNS, IDisplayedColumns, USER_MODEL_COLUMNS } from '../../models/user-table.model';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnChanges {

  userModelColumns = USER_MODEL_COLUMNS;

  displayedColumns: IDisplayedColumns[] = DISPLAYED_COLUMNS;

  @Input() users$: Person[] = [];

  constructor() {

  }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
}
