import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/Shared.module';

const declaredContainers = [HomePageComponent];
@NgModule({
  declarations: [...declaredContainers],
  imports: [SharedModule],
  exports: [...declaredContainers],
})
export class ContainersModule {}
