import * as fromApp from '@store/app.reducer';

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  isAuthenticated = false;
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  redirect() {
    if (this.isAuthenticated) {
      this.router.navigate(['/products']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe(data => {
      this.isAuthenticated = true;
      if (data.user === null) {
        this.isAuthenticated = false;
      }
    });
  }
}
