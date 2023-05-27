import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizeFirst' })
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: any): string {
    return (
      value.toString().charAt(0).toUpperCase() +
      value.substring(1).toLowerCase()
    );
  }
}
