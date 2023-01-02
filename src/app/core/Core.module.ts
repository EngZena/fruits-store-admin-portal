import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/interceptor/HttpInterceptor.service';
import { NgModule } from '@angular/core';

const createdClasses = [];

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
];
@NgModule({
  declarations: [],
  imports: [],
  providers: [httpInterceptorProviders],
  exports: [],
})
export class CoreModule {}
