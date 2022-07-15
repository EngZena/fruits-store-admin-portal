import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const materialComponents = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatProgressBarModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [...materialComponents, HttpClientModule],
  exports: [CommonModule, ...materialComponents, ReactiveFormsModule],
})
export class SharedModule {}
