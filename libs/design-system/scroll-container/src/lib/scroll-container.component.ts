import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit } from '@angular/core';

/**
 * Scroll container with gradient feature
 */
@Component({
  selector: 'hra-scroll-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-container.component.html',
  styleUrl: './scroll-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollContainerComponent implements OnInit {
  /**
   * Creates an instance of scroll container component.
   * @param el Scroll container element
   */
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  /**
   * Sets attributes of gradient based on container
   */
  ngOnInit() {
    const element = this.el.nativeElement;
    const { offsetWidth } = element;
    const bottomPos = window.innerHeight - element.getBoundingClientRect().bottom;
    element.style.setProperty('--height', '2rem');
    element.style.setProperty('--width', `${offsetWidth.toString()}px`);
    element.style.setProperty('--bottom', `${bottomPos.toString()}px`);
  }

  /**
   * Check if scrolling has reached end
   */
  @HostListener('scroll')
  onInputChange(): void {
    const { scrollHeight, clientHeight, scrollTop, classList } = this.el.nativeElement;
    if (scrollHeight - clientHeight === scrollTop) {
      classList.add('at-bottom');
    } else {
      classList.remove('at-bottom');
    }
  }
}
