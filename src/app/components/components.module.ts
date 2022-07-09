import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/Shared.module';

const declaredComponents = [PageNotFoundComponent];

@NgModule({
  declarations: [...declaredComponents],
  imports: [SharedModule],
  exports: [...declaredComponents],
})
export class ComponentsModule {}
