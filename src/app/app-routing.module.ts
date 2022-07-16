import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './containers/home-page/auth.guard';
import { CustomersComponent } from './containers/customers/customers.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    component: CustomersComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
