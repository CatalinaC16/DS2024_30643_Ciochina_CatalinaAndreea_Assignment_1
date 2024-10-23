import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../../dtos/UserDto";
import {UserService} from "../../services/User.service";
import {AuthService} from "../../services/Auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserDTO | null = null;
  errorMessage: string = '';
  password = '';
  firstname = '';
  secondname = '';
  email = '';
  id = '';

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const token = this.authService.getToken();
    let userEmail: string;
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userEmail = payload.sub;
      this.userService.getUserByEmail(userEmail).subscribe(
        (response: UserDTO) => {
          console.log(response)
          this.user = response;
          this.id = response.id;
          this.firstname = response.firstName;
          this.secondname = response.secondName;
          this.email = response.email;
        },
        (error) => {
          this.errorMessage = 'Failed to load user';
          console.error(error);
        }
      );
    }
  }

  onSave() {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]).then();
  }

  viewUserDetails() {
    this.router.navigate(["/myProfile"]).then();
  }
}
