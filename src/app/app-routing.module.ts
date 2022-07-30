import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@containers/login-page/auth.guard';
import { CustomersComponent } from '@containers/customers/customers.component';
import { LoginPageComponent } from '@containers/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { ProductsComponent } from '@containers/products/products.component';
import { ProfileComponent } from '@containers/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    component: CustomersComponent,
  },
  { path: 'products', canActivate: [AuthGuard], component: ProductsComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
