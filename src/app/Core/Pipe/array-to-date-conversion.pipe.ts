import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToDateConversion',
  standalone: true
})
export class ArrayToDateConversionPipe implements PipeTransform {

  private datePipe = inject(DatePipe); 

  transform(value: number[] | Date | string, format: string = 'longDate'): string | null {
    if (!value) {
      return null;
    }

    // If the value is an array (e.g., [year, month, day, hour, minute, second])
    if (Array.isArray(value)) {
      const [year, month, day, hour = 0, minute = 0, second = 0] = value;
      // Create a new Date object from the array
      value = new Date(year, month - 1, day, hour, minute, second);
    }

    // If the value is a valid Date object, use DatePipe to format
    if (value instanceof Date && !isNaN(value.getTime())) {
      return this.datePipe.transform(value, format);  // Use Angular's DatePipe to format the date
    }

    // If value is not a valid Date, return null
    return null;
  }

}
