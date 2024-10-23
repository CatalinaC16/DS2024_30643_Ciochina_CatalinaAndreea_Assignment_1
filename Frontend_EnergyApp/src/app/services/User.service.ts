import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./Auth.service";
import {Observable} from "rxjs";
import {UserDTO} from "../dtos/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUserByEmail(email: string): Observable<UserDTO> {
    const token = this.authService.getToken();
    const headers = {'Authorization': `Bearer ${token}`};
    return this.http.get<UserDTO>(`${this.apiUrl}/getByEmail/${email}`,{headers});
  }

}
