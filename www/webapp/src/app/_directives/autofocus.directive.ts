import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class AutofocusDirective {

  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

}
