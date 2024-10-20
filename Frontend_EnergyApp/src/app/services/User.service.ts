import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./Auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createUser(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = {'Authorization': `Bearer ${token}`};
    const body = {id: userId};

    return this.http.post<any>(`${this.apiUrl}/create`, body, {headers});
  }

  deleteUser(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = {'Authorization': `Bearer ${token}`};

    return this.http.delete(`${this.apiUrl}/delete/${userId}`, {headers});
  }
}
