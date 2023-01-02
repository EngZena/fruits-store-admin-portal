import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/Core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
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
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatCommonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
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
})
export class SharedModule {}
