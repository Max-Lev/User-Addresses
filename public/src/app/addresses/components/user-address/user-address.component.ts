import {
  AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input,
  OnChanges, OnInit, Output, PipeTransform, SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Country } from '../../models/country.model';
import { City } from '../../models/city.model';
import { Address } from '../../models/addresses.model';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // standalone: true,
  // imports: [DEPENDENCIES]
})
export class UserAddressComponent implements OnInit, OnChanges, AfterViewInit, PipeTransform {

  @Input() index: number = -1;

  @Output() removeEmitter: EventEmitter<{ form: FormGroup, index: number }> = new EventEmitter();

  @Output() counteryChangeEmitter: EventEmitter<{ countryId: number, index: number }> = new EventEmitter();

  @Output() addCityEmitter: EventEmitter<{ formValue: Address, index: number }> = new EventEmitter();

  @Input() countries: Country[] = [];
  // @Input() countries$: Observable<Country[]>;

  // @Input() cities$: Observable<City[]>;
  @Input() cities: City[] = [];

  sub$ = new Subject<boolean>();

  @Input() name: any;

  constructor(private formBuilder: FormBuilder) {

  }
  transform(value,countryList:Country[], activeCountry: number): City[] {
    
    const cities:City[] = countryList?.find(country=>{
      if(country.id===activeCountry){
        return country;
      }else{
        return null;
      }     
    })?.cities;
    return cities as City[];
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.transform(this.cities,this.countries,this.name.get('countrId').value)
  }

  ngOnDestroy(): void {
    this.sub$.next(false);
    this.sub$.unsubscribe();
  }


  ngAfterViewInit(): void {

    this.name.get('countrId').valueChanges.pipe(takeUntil(this.sub$)).subscribe((countryId: number) => {
      this.counteryChangeEmitter.emit({ countryId: countryId, index: this.index });
    });

  }

  initForm(): FormGroup {
    return this.name = this.formBuilder.group({
      name: new FormControl<string>(null, [Validators.required, Validators.minLength(2)]),
      countrId: new FormControl<number>(null),
      cityId: new FormControl<number>(null),
      street: new FormControl<string>(null, [Validators.required, Validators.minLength(2)]),
    });
  }

  removeForm(form: FormGroup, index: number) {
    this.removeEmitter.emit({ form: form, index: index });
  }

  addCity() {
    const formValue = this.name.value;
    this.addCityEmitter.emit({ formValue: formValue, index: this.index });
  }

}
