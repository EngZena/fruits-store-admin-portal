import { CustomersComponent } from './customers/customers.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/Shared.module';

const declaredContainers = [
  HomePageComponent,
  CustomersComponent,
  ProductsComponent,
  ProfileComponent,
];
@NgModule({
  declarations: [...declaredContainers],
  imports: [SharedModule],
  exports: [...declaredContainers],
})
export class ContainersModule {}
