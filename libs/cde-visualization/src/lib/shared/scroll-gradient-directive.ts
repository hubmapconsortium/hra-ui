import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[cdeScrollGradient]',
  standalone: true,
})
export class ScrollGradientDirective implements OnInit {
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const element = this.el.nativeElement;
    element.style.setProperty('--height', '2rem');
    element.style.setProperty('--width', element.offsetWidth.toString() + 'px');
    element.style.setProperty('--bottom', '0.75rem');
  }

  @HostListener('scroll', ['$event'])
  onInputChange(event: Event): void {
    const element = event.target as HTMLElement;
    const { scrollHeight, clientHeight, scrollTop, classList } = element;
    if (scrollHeight - clientHeight === scrollTop) {
      classList.add('at-bottom');
    } else {
      classList.remove('at-bottom');
    }
  }
}
