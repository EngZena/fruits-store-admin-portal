import { CommonModule } from '@angular/common';
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

const materialComponents = [
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

@NgModule({
  declarations: [],
  imports: [
    ...materialComponents,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...materialComponents,
  ],
})
export class SharedModule {}
