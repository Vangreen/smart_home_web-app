export class DeviceConfiguration {
  serial: number;
  deviceName: string;
  hue: number;
  saturation: number;
  brightness: number;
  deviceStatus: string;
  deviceConnectionStatus: string;
  room: string;
  deviceType: string;
  constructor(body) {
    this.serial = body.serial;
    this.deviceName = body.deviceName;
    this.hue = body.hue;
    this.saturation = body.saturation;
    this.brightness = body.brightness;
    this.deviceStatus = body.deviceStatus;
    this.deviceConnectionStatus = body.deviceConnectionStatus;
    this.room = body.room;
    this.deviceType = body.deviceType;
  }
}
