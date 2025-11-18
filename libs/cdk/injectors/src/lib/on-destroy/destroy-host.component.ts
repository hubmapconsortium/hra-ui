import { AfterViewInit, Component, ComponentRef, ElementRef, inject, ViewContainerRef } from '@angular/core';

/**
 * Component used when attaching destroy lifecycle observables to a component/directive/pipe
 */
@Component({
  selector: 'hra-destroy-host',
  standalone: true,
  template: '',
  styles: [':host { display: none }'],
})
export class DestroyHostComponent implements AfterViewInit {
  /** Reference to own dom element */
  readonly el: Element = inject(ElementRef).nativeElement;

  /**
   * Creates a new DestroyHostComponent inside the provided container.
   * The element is inserted as the first child (index '0') in the container.
   * @param container View in which to create the element
   * @returns The ComponentRef of the newly inserted element
   */
  static create(container: ViewContainerRef): ComponentRef<DestroyHostComponent> {
    return container.createComponent(DestroyHostComponent, { index: 0 });
  }

  /** Disconnects the component from the dom tree */
  ngAfterViewInit(): void {
    this.el.remove();
  }
}
