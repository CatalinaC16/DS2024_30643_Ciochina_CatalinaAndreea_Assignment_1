import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/Auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userEmail = payload.sub;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]).then();
  }

  viewUserDetails() {

  }

}
