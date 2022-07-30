import * as fromApp from './store/app.reducer';
import * as fromAuthActions from './containers/login-page/store/auth.actions';

import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { NetworkService } from './core/services/Network/Network.service';
import { Store } from '@ngrx/store';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOnline: boolean = true;
  isDarkTheme!: Observable<boolean>;
  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(
    private store: Store<fromApp.AppState>,
    private themeService: ThemeService,
    private networkService: NetworkService
  ) {}
  ngOnInit(): void {
    this.store.dispatch(new fromAuthActions.AutoLogin());
    this.networkService
      .createOnline$()
      .subscribe((isOnline: boolean) => (this.isOnline = isOnline));
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.store.select('auth').subscribe(data => {
      this.isAuthenticated.next(true);
      if (data.user === null) {
        this.isAuthenticated.next(false);
      }
    });
  }
}
