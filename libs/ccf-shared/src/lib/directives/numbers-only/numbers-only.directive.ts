import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Directive for restricting an input element to integer only values.
 */
@Directive({
  selector: 'input[ccfNumbersOnly]',
  standalone: false,
})
export class NumberDirective {
  private readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /**
   * Listens to input changes and updates the text to only include numbers.
   *
   * @param event The input event
   */
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
