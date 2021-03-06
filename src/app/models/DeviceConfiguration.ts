export class DeviceConfiguration {
  serial: number;
  deviceName: string;
  hue: number;
  saturation: number;
  brightness: number;
  deviceStatus: string;
  floatingStatus: string;
  floatingSpeed: number;
  deviceConnectionStatus: string;
  roomID: string;
  deviceType: string;

  constructor(body) {
    this.serial = body.serial;
    this.deviceName = body.deviceName;
    this.hue = body.hue;
    this.saturation = body.saturation;
    this.brightness = body.brightness;
    this.deviceStatus = body.deviceStatus;
    this.floatingStatus = body.floatingStatus;
    this.floatingSpeed = body.floatingSpeed;
    this.deviceConnectionStatus = body.deviceConnectionStatus;
    this.roomID = body.roomID;
    this.deviceType = body.deviceType;
  }
}
