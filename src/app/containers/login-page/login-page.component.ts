import * as fromActions from '../login-page/store/auth.actions';
import * as fromApp from '../../store/app.reducer';

import { FormControl, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { FormControlErrorsService } from 'src/app/core/Handlers/form-controls-errors.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide = true;
  loading = false;
  matcher = new FormControlErrorsService();

  constructor(private store: Store<fromApp.AppState>) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  toggleHidePassword() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (!(this.emailFormControl.valid && this.passwordFormControl.valid))
      return;
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    this.store.dispatch(
      new fromActions.LoginStart({
        email: email,
        password: password,
      })
    );
    this.emailFormControl.reset();
    this.passwordFormControl.reset();
  }

  onHandleError() {
    this.store.dispatch(new fromActions.ClearError());
  }
}
