import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
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
  CardComponent,
  DialogComponent,
];

@NgModule({
  declarations: [...declaredComponents],
  imports: [SharedModule],
  exports: [...declaredComponents],
})
export class ComponentsModule {}
