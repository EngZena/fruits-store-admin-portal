import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';

const declaredContainers = [HomePageComponent];
@NgModule({
  declarations: [...declaredContainers],
  imports: [CommonModule],
  exports: [...declaredContainers],
})
export class ContainersModule {}
