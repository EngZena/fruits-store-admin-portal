import { LayoutComponent } from './layout/layout.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/Shared.module';

const declaredComponents = [
  PageNotFoundComponent,
  NoInternetComponent,
  LayoutComponent,
  LoadingComponent,
];

@NgModule({
  declarations: [...declaredComponents],
  imports: [SharedModule],
  exports: [...declaredComponents],
})
export class ComponentsModule {}
