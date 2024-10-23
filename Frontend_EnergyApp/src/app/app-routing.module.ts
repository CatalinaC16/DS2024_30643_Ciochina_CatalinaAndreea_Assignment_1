import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/AuthGuard.guard";
import {HomeComponent} from "./components/home/Home.component";
import {AuthComponent} from "./components/auth/Auth.component";
import {ProfileComponent} from "./components/profile/Profile.component";

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'myProfile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
