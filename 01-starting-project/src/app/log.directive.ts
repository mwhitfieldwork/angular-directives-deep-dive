import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog($event)'
  }
})
export class LogDirective {
  private element = inject(ElementRef);
  constructor() { }
  onLog(){
    console.log('clicked');
    console.log(this.element.nativeElement);
  }

}
