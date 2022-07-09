import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FormControlErrorsService } from 'src/app/core/Handlers/form-controls-errors.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  hide = true;
  loading = false;
  matcher = new FormControlErrorsService();

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  toggleHidePassword() {
    this.hide = !this.hide;
  }
}
