export class UnassignedDevice{
  serial: number;
  deviceType: string;
  constructor(body) {
    this.serial = body.serial;
    this.deviceType = body.deviceType;
  }
}
