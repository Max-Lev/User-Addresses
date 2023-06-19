import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, QueryList, ViewChildren, OnDestroy,
  AfterViewInit
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAddressComponent } from '../components/user-address/user-address.component';
import { DEPENDENCIES } from './dependencies';
import { AddCityDialogComponent } from '../components/add-city-dialog/add-city-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonsService } from '../providers/persons.service';
import { Country } from '../models/country.model';
import { Address } from '../models/addresses.model';
import { City } from '../models/city.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject, map, mergeMap, of, takeUntil } from 'rxjs';

@Component({
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserAddressComponent
  ]
  // standalone: true,
  // imports: [
  //   ...DEPENDENCIES,
  //   UserAddressComponent
  // ],
})
export class ContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup = new FormGroup({});

  cities$: Observable<City[]>;

  countries$: Observable<Country[]>;

  get getAddressesArray(): FormArray<any> {
    return <FormArray>this.form.get('addresses');
  }

  sub$ = new Subject<boolean>();

  @ViewChildren(UserAddressComponent) userAddressViewChildren: QueryList<UserAddressComponent>;

  constructor(private formBuilder: FormBuilder,
    // @Inject(UserAddressComponent) public userAddressComponent: UserAddressComponent,
    public userAddressComponent: UserAddressComponent,
    private personsService: PersonsService,
    private router: Router, private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.countries$ = of(this.activatedRoute.snapshot.data['getCountries']);
    // const countries = this.activatedRoute.snapshot.data['getCountries'];
    this.initForm();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.sub$.next(false);
    this.sub$.unsubscribe();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl<string>(null, [
        Validators.pattern(/^[a-zA-Z]+ [a-zA-Z]+$/), Validators.required
      ]),
      birthdate: new FormControl<string>(null),
      addresses: this.formBuilder.array([this.userAddressComponent.initForm()])
    });
  }

  addAddress() {
    this.getAddressesArray.push(this.userAddressComponent.initForm())
  }

  removeEmitterHandler(action: { form: FormGroup, index: number }) {
    const address = this.form.get('addresses') as FormArray;
    address.removeAt(action.index);
  }

  counteryChangeHandler(action: { countryId: number, index: number }) {
    const component = this.userAddressViewChildren.get(action.index);
    component.cities$ = this.personsService.getCitiesByCountryId$(action.countryId);
  }

  addCityEmitterHandler(payload: { formValue: Address, index: number }) {

    const component: UserAddressComponent = this.userAddressViewChildren.get(payload.index);

    let cityPayload: City;

    component.cities$ = this.dialog.open(AddCityDialogComponent, {
      autoFocus: false,
      data: {
        countries$: this.countries$,
        countryId: payload.formValue.countrId
      }
    }).afterClosed()
      .pipe(takeUntil(this.sub$))
      .pipe(mergeMap((data: { cityName: string }) => {
        /** 
         * @description in case of ok
        */
        if (data && data.cityName) {
          cityPayload = new City({ id: null, countryId: +payload.formValue.countrId, name: data.cityName });
          return this.personsService.addCity$(cityPayload);
        } else {
          /*** 
          * @description in case of cancel 
          */
          return EMPTY;
        }
      }))
      .pipe(mergeMap(() => {
        return this.personsService.getCitiesByCountryId$(+payload.formValue.countrId);
      }))
      .pipe(map((cities: City[]) => {
        this.cities$ = of(cities);
        this.newCity(cities, component, cityPayload);
        return cities;
      }));

  }

  newCity(cities: City[], component: UserAddressComponent, cityPayload: City) {
    const newCity = cities.find((city: City) => city.name === cityPayload.name);
    const componentForm = component.name as FormGroup;
    componentForm.get('cityId').setValue(newCity.id);
    componentForm.get('cityId').updateValueAndValidity({ emitEvent: true, onlySelf: false });
  }

  save() {
    this.personsService.addPerson$(this.form.value).pipe(takeUntil(this.sub$)).subscribe(_ => {
      this.form.reset();
      (this.form.get('addresses') as FormArray).clear();
      this.addAddress();
    });
  }

  nav() {
    this.router.navigate(['users']);
  }

}


