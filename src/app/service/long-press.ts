import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[long-press]'
})
export class LongPress {
  pressing: boolean;
  longPressing: boolean;
  timeout: any;
  interval: number;
  touch: TouchInput;

  @Output()
  onLongPress = new EventEmitter();

  @Output()
  onLongPressing = new EventEmitter();

  @HostBinding('class.press')
  get press() {
    return this.pressing;
  }

  @HostBinding('class.longpress')
  get longPress() {
    return this.longPressing;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(event);

    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    if (this.longPressing === true) {
      this.longPressing = false;
      this.pressing = false;
      //TODO Fix this, cause console log error

    }
  }
}
