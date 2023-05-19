import { Injectable } from '@angular/core';
import { NativeDatetimeAdapter } from '@mat-datetimepicker/core';

@Injectable({
  providedIn: 'root',
})
export class CustomDateTimeAdapter extends NativeDatetimeAdapter {
  allowReturnDate = false;
  parse(value: string | number): Date | any {
    if (typeof value === 'number') {
      return new Date(value);
    }
    let newDate: any = value;
    const length = value.replace(' ', '').length;
    if (length === 16) {
      const day = value.slice(0, 2);
      const month = value.slice(3, 5);
      const year = value.slice(6, 10);
      const time = value.split(',')[1];
      newDate = new Date(`${month}/${day}/${year} ${time}`);
      this.allowReturnDate = true;
    }
    return this.allowReturnDate ? new Date(Date.parse(newDate)) : null;
  }
}
