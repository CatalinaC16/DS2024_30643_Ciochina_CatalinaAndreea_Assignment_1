import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {email, password})
      .pipe(
        map((response: any) => {
          if (response && response.token) {
            localStorage.setItem('jwtToken', response.token);
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
