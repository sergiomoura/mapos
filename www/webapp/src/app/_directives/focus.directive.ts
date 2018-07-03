import { Directive, ElementRef , OnInit} from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective {

  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}
