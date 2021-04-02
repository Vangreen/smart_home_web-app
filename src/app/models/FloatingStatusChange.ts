export default class FloatingStatusChange {
  floatingStatus: string;
  floatingSpeed: number;

  constructor(body) {
    this.floatingSpeed = body.floatingSpeed;
    this.floatingStatus = body.floatingStatus;
  }
}
