import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/addresses/models/addresses.model';


@Pipe({
  name: 'tableFormate'
})
export class BirthdateFormatePipe implements PipeTransform {

  transform(value: string | Address[], args: { key: string, header: string }): string | number {

    if (args.header === 'Birthdate') {
      if (value === 'NA') {
        return 'NA'
      }
      return value = new Date(value as string).toLocaleDateString('en-us', {
        year: "numeric", month: "short", day: "numeric"
      });
    } else if (args.key === 'addresses') {
      return value.length;
    }
    else {
      return value as any;
    }

  }

}
