import {
  DatetimeAdapter,
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatCommonModule } from '@angular/material/core';

import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/Core.module';
import { CustomDateTimeAdapter } from '@core/adapter/custom-datatime-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatCommonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
  MatDatepickerModule,
];

const angularModules = [
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  CommonModule,
  RouterModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...materialModules,
    ...angularModules,
    FlexLayoutModule,
    CoreModule,
  ],
  exports: [
    ...materialModules,
    ...angularModules,
    FlexLayoutModule,
    CoreModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DatetimeAdapter, useClass: CustomDateTimeAdapter },
  ],
})
export class SharedModule {}
