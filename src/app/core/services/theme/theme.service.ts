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
    if (localStorage.getItem('darkTheme') !== 'undefined') {
      this.darkTheme = localStorage.getItem('darkTheme');
    } else {
      this.darkTheme = false;
    }
    this.setDarkTheme(JSON.parse(this.darkTheme));
  }

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem('darkTheme', isDarkTheme?.toString());
    this._darkTheme.next(isDarkTheme);
  }
}
