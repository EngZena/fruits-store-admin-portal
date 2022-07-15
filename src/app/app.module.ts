import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { ContainersModule } from './containers/containers.module';
import { CookieService } from 'ngx-cookie-service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/Shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ContainersModule,
    FlexLayoutModule,
    SharedModule,
    ComponentsModule,
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
