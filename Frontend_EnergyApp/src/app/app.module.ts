import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./components/home/Home.component";
import {AuthGuard} from "./guards/AuthGuard.guard";
import {FormsModule} from "@angular/forms";
import {AuthComponent} from "./components/auth/Auth.component";
import {ProfileComponent} from "./components/profile/Profile.component";
import {MyDevicesComponent} from "./components/devices-user/MyDevices.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ProfileComponent,
    MyDevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
