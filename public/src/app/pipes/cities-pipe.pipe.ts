import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../addresses/models/country.model';
import { City } from '../addresses/models/city.model';

@Pipe({
  name: 'citiesPipe',
  pure:true,
})
export class CitiesPipePipe implements PipeTransform {

  transform(value,countryList:Country[], activeCountry: number): City[] {
    console.log('value ',value,'countryList ',countryList,'activeCountry ',activeCountry)
    
    const cities:City[] = countryList?.find(country=>{
      if(country.id===activeCountry){
        console.log('country ',country.cities);
        return country;
      }else{
        return null;
      }     
    })?.cities;
    console.log(cities);
    return cities as City[];
    // return countryList.find(c=>c.id===country)?.cities;
  }

}
