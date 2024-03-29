import { RouterModule, Routes } from '@angular/router';

import { AddNewProductComponent } from '@containers/products/AddNewProduct/add-new-product.component';
import { AuthGuard } from '@containers/login-page/auth.guard';
import { CustomersComponent } from '@containers/customers/customers.component';
import { CustomersResolver } from '@core/services/resolver/customers.resolver';
import { EditProductComponent } from '@containers/products/EditProduct/edit.product.component';
import { LoginPageComponent } from '@containers/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { ProductsComponent } from '@containers/products/products.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    component: CustomersComponent,
    resolve: { customersData: CustomersResolver },
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'add-new-product',
        component: AddNewProductComponent,
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CustomersResolver],
})
export class AppRoutingModule {}
