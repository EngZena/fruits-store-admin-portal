import * as fromApp from '@store/app.reducer';
import * as fromAuthActions from '@containers/login-page/store/auth.actions';

import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { CustomersLocalStorageService } from '@core/services/localStorage/customers.local-storage.service';
import { NetworkService } from '@core/services/Network/Network.service';
import { Store } from '@ngrx/store';
import { ThemeService } from '@core/services/theme/theme.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  isOnline: boolean = true;
  isDarkTheme!: Observable<boolean>;
  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(
    private store: Store<fromApp.AppState>,
    private themeService: ThemeService,
    private networkService: NetworkService,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private customersLocalStorageService: CustomersLocalStorageService
  ) {
    this.router.events
      .pipe(
        filter(
          (routerEvent): routerEvent is NavigationEnd =>
            routerEvent instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (this.isAuthenticated.value) {
          if (event.id === 1 && event.url === event.urlAfterRedirects) {
            this.customersLocalStorageService.resetCustomersData();
          }
        }
      });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.store.dispatch(new fromAuthActions.AutoLogin());
    this.networkService
      .createOnline$()
      .subscribe((isOnline: boolean) => (this.isOnline = isOnline));
    this.themeService.getDarkTheme();
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.store.select('auth').subscribe(data => {
      this.isAuthenticated.next(true);
      if (data.user === null) {
        this.isAuthenticated.next(false);
      }
    });
  }
}
