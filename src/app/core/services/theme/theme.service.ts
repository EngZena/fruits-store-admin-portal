import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();
  darkTheme!: any;

  getDarkTheme() {
    if (JSON.stringify(localStorage.getItem('darkTheme')) === 'null') {
      this.setDarkTheme(false);
    } else {
      this.darkTheme = localStorage.getItem('darkTheme');
      this.setDarkTheme(JSON.parse(this.darkTheme));
    }
    return this.darkTheme;
  }

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem('darkTheme', isDarkTheme?.toString());
    this._darkTheme.next(isDarkTheme);
  }
}
