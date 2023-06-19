import { Observable } from 'rxjs';
import { Country } from '../../models/country.model';
export interface DialogData {
    countries$: Observable<Country[]>,
    countryId: number,
    cityName: string
}