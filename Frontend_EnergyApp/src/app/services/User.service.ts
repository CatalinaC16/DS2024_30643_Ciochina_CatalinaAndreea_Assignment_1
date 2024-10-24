import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./Auth.service";
import {map, Observable} from "rxjs";
import {UserDto} from "../dtos/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUserByEmail(email: string): Observable<UserDto> {
    const token = this.authService.getToken();
    const headers = {'Authorization': `Bearer ${token}`};
    return this.http.get<UserDto>(`${this.apiUrl}/getByEmail/${email}`,{headers});
  }

  updateUser(userId: string, userDTO: UserDto): Observable<any> {
    const token = this.authService.getToken();
    const headers = {'Authorization': `Bearer ${token}`};
    return this.http.put<any>(`${this.apiUrl}/update/${userId}`, userDTO, { headers })
      .pipe(
        map((response: any) => {
          if (response && response.body) {
            console.log('User updated successfully:', response.body);
          }
          return response;
        })
      );
  }
}
