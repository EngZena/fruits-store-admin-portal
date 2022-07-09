import { Component, OnInit } from '@angular/core';

import { NetworkService } from './core/services/Network/Network.service';
import { Observable } from 'rxjs';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOnline: boolean = true;
  isDarkTheme!: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private networkService: NetworkService
  ) {}
  ngOnInit(): void {
    this.networkService
      .createOnline$()
      .subscribe((isOnline: boolean) => (this.isOnline = isOnline));
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
