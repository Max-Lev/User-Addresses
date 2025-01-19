import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/addresses/models/person.model';
import { environment } from 'src/environments/environment';


export const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

@Injectable()
export class GetUsersService {

  constructor(private http: HttpClient) { };

  getPersons$(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.api}/persons`,{ headers });
  }

}
