export class DeviceConfiguration {
  serial: number;
  ip: string;
  deviceName: string;
  hue: number;
  sat: number;
  bright: number;
  deviceStatus: string;
  deviceConnectionStatus: string;
  room: string;
  deviceType: string;
  constructor(body) {
    this.serial = body.serial;
    this.ip = body.ip;
    this.deviceName = body.deviceName;
    this.hue = body.hue;
    this.sat = body.sat;
    this.bright = body.bright;
    this.deviceStatus = body.deviceStatus;
    this.deviceConnectionStatus = body.deviceConnectionStatus;
    this.room = body.room;
    this.deviceType = body.deviceType;
  }
}
