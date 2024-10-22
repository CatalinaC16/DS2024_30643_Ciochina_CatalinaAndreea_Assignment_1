import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/AuthGuard.guard";
import {HomeComponent} from "./components/home/Home.component";
import {AuthComponent} from "./components/auth/Auth.component";

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
