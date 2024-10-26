import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./Auth.service";
import {DeviceDto} from "../dtos/DeviceDto";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private urlAPI = 'http://localhost:8081/api/device';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getDevicesByUserId(userId: string): Observable<DeviceDto[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<DeviceDto[]>(`${this.urlAPI}/getAllByUserId/${userId}`, {headers});
  }
}
