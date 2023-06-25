import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';
import { Observable, of, shareReplay } from 'rxjs';
import { City } from '../models/city.model';
import { Person } from '../models/person.model';

@Injectable()
export class PersonsService {

  constructor(private http: HttpClient) { };

  addPerson$(person: Person): Observable<any> {
    return this.http.post<Person>(`${environment.api}/person`, { ...person })
  };

  getCountries$(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.api}/countries`);
  }

  addCity$(payload: City): Observable<City> {
    return this.http.post<City>(`${environment.api}/city`, { ...payload });
  }

  getCitiesByCountryId$(countryId: number): Observable<City[]> {
    if (countryId !== null) {
      return this.http.get<City[]>(`${environment.api}/cities/${countryId}`);
    } else {
      return of([]);
    }
  }

}
