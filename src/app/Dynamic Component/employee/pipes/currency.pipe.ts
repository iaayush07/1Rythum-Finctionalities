import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, DollarValue: number): unknown {
    let Rupeesvalue;
    if (DollarValue === 82) {
      Rupeesvalue = "₹" + 82 * value
    }
    return Rupeesvalue
  }

}

