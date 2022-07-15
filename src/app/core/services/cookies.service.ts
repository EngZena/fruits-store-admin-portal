import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  setCookie(name: string, data: string) {
    this.cookieService.set(name, data);
  }

  deleteCookie(name: string) {
    this.cookieService.delete(name);
  }

  deleteAll() {
    this.cookieService.deleteAll();
  }

  getCookie(name: string) {
    this.cookieService.get(name);
  }
}
