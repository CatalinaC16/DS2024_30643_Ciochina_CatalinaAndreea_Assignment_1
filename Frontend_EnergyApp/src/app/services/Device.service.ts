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
    const headers = this.getHeaders();
    return this.http.get<DeviceDto[]>(`${this.urlAPI}/getAllByUserId/${userId}`, {headers});
  }

  getAllDevices(): Observable<DeviceDto[]> {
    const headers = this.getHeaders();
    return this.http.get<DeviceDto[]>(`${this.urlAPI}/getAll`,{headers});
  }


  createDevice(deviceDto: DeviceDto): Observable<DeviceDto> {
    const headers = this.getHeaders();
    return this.http.post<DeviceDto>(`${this.urlAPI}/create`, deviceDto,{headers});
  }

  updateDevice(deviceId: string, deviceDto: DeviceDto): Observable<DeviceDto> {
    const headers = this.getHeaders();
    return this.http.put<DeviceDto>(`${this.urlAPI}/update/${deviceId}`, deviceDto,{headers});
  }

  deleteDevice(deviceId: string): Observable<string> {
    console.log(`${this.urlAPI}/delete/${deviceId}`)
    const headers = this.getHeaders();
    return this.http.delete<string>(`${this.urlAPI}/delete/${deviceId}`, {
      headers: headers,
      responseType: 'text' as 'json'
    });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({'Authorization': `Bearer ${token}`});
  }
}
