import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/Auth.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userEmail: string = '';

  constructor(private authService: AuthService) {
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
  }
}
