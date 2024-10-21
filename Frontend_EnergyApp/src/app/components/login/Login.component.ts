import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { AuthService } from "../../services/Auth.service";
import {RegisterRequestDTO} from "../../dtos/RegisterRequestDto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstName = '';
  secondName = '';
  email = '';
  password = '';
  isErrorMessage: boolean = false;
  isRegistering: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.isErrorMessage = true;
        console.error('Login failed', error);
      }
    );
  }

  onRegister(): void {
    const registerRequestDTO: RegisterRequestDTO = {
      firstName: this.firstName,
      secondName: this.secondName,
      email: this.email,
      password: this.password
    };

    this.authService.register(registerRequestDTO).subscribe(
      () => {
        this.isErrorMessage = false;
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.isErrorMessage = true;
        console.error('Registration failed', error);
      }
    );
  }

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
    this.firstName = '';
    this.secondName = '';
    this.email = '';
    this.password = '';
    this.isErrorMessage = false;
  }
}
