import {Component, OnInit} from '@angular/core';
import {DeviceDto} from "../../dtos/DeviceDto";
import {DeviceService} from "../../services/Device.service";
import {AuthService} from "../../services/Auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-devices',
  templateUrl: './AdminDevices.component.html',
  styleUrls: ['./AdminDevices.component.css']
})
export class AdminDevicesComponent implements OnInit {
  devices: DeviceDto[] = [];
  selectedDevice: DeviceDto | null = null;
  createMode = false;
  editMode = false;

  constructor(private deviceService: DeviceService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getAllDevices().subscribe(
      (devices) => this.devices = devices,
      (error) => console.error('Error loading devices:', error)
    );
  }

  onCreateDevice(): void {
    this.selectedDevice = {} as DeviceDto;
    this.createMode = true;
  }

  createDevice(): void {
    if (this.selectedDevice) {
      this.deviceService.createDevice(this.selectedDevice).subscribe(
        (newDevice) => {
          this.loadDevices();
          this.createMode = false;
          this.selectedDevice = null;
        },
        (error) => console.error('Error creating device:', error)
      );
    }
  }

  onEditDevice(device: DeviceDto): void {
    this.selectedDevice = {...device};
    this.editMode = true;
  }

  updateDevice(): void {
    if (this.selectedDevice) {
      this.deviceService.updateDevice(this.selectedDevice.id, this.selectedDevice).subscribe(
        (updatedDevice) => {
          this.loadDevices();
          this.editMode = false;
          this.selectedDevice = null;
        },
        (error) => console.error('Error updating device:', error)
      );
    }
  }

  deleteDevice(deviceId: string): void {
    this.deviceService.deleteDevice(deviceId).subscribe(
      () => {
        this.loadDevices();
      },
      (error) => console.error('Error deleting device:', error)
    );
  }

  cancelEditMode(): void {
    this.editMode = false;
    this.createMode = false;
    this.selectedDevice = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]).then();
  }

  viewUserDetails() {
    this.router.navigate(["/myProfile"]).then();
  }

  goToHomePage() {
    this.router.navigate(["/home"]).then();
  }

  goToAllDevices() {
    this.router.navigate(["/admin/all-devices"]).then();
  }

  goToAllUsers() {
    this.router.navigate(["/admin/all-users"]).then();
  }
}
