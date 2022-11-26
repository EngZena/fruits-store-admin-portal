import { AddNewProductComponent } from './products/AddNewProduct/add-new-product.component';
import { ComponentsModule } from '@components/components.module';
import { CustomersComponent } from './customers/customers.component';
import { EditProductComponent } from './products/EditProduct/edit.product.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { ProductFormComponent } from './products/ProductForm/product-form.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/Shared.module';

const declaredContainers = [
  LoginPageComponent,
  CustomersComponent,
  ProductsComponent,
  ProductFormComponent,
  AddNewProductComponent,
  EditProductComponent,
  ProfileComponent,
];
@NgModule({
  declarations: [...declaredContainers],
  imports: [SharedModule, ComponentsModule],
  exports: [...declaredContainers],
})
export class ContainersModule {}
