
import {Router} from "@angular/router";
import {Component} from "@angular/core";
import {AuthService} from "../../services/Auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
        (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
}
