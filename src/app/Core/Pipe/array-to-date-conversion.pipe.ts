import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToDateConversion',
  standalone: true
})
export class ArrayToDateConversionPipe implements PipeTransform {

  transform(dateArray: number[]): Date | null {
    if (!dateArray || dateArray.length < 6) {
      return null; // Return null if the input is invalid
    }
    
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second);
  }

}
