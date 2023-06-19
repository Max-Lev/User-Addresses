import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/addresses/models/person.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  users$: Person[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.users$ = this.activatedRoute.snapshot.data['getPersons'];
  }

  nav() {
    this.router.navigate(['addresses']);
  }
  
}
