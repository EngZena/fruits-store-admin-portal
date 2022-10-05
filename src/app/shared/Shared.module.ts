import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/Core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
];

const angularModules = [
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
