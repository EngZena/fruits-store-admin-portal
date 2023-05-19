import * as AuthActions from '@containers/login-page/store/auth.actions';
import * as fromApp from '@store/app.reducer';

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isDarkTheme: Observable<boolean> = of(false);
  isLightTheme: any;

  constructor(
    private themeService: ThemeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.isLightTheme = !JSON.parse(this.themeService.getDarkTheme());
    this.themeService.getDarkTheme();
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme() {
    this.isLightTheme = !this.isLightTheme;
    this.themeService.setDarkTheme(!this.isLightTheme);
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
