import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenContentComponent } from './fullscreen-content.component';

/** A component that wraps any child components of type FullscreenContentComponent and
 * sets their isFullScreen property to true or false based on its own fullscreen input property
 */
@Component({
  selector: 'hra-fullscreen-container',
  standalone: true,
  imports: [CommonModule, FullscreenContentComponent],
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenContainerComponent implements AfterContentInit, OnChanges {
  /** A property that gets a reference to any child components of type FullscreenContentComponent that are projected into the component's content area */
  @ContentChildren(FullscreenContentComponent)
  readonly content?: QueryList<FullscreenContentComponent>;

  /** A boolean input property that controls the fullscreen mode */
  @Input() fullscreen = false;

  /** It calls the updateFullscreenMode method to set the isFullScreen property of the child
   * FullscreenContentComponent instances based on the value of the fullscreen input property
   */
  ngAfterContentInit(): void {
    this.updateFullscreenMode();
  }

  /** It checks if the fullscreen input property has changed, and calls the updateFullscreenMode method if it has */
  ngOnChanges(changes: SimpleChanges): void {
    if ('fullscreen' in changes) {
      this.updateFullscreenMode();
    }
  }

  /** A private method that sets the isFullScreen property of each child FullscreenContentComponent based on the value of the fullscreen  */
  private updateFullscreenMode(): void {
    this.content?.forEach((content) => {
      content.isFullScreen = this.fullscreen;
    });
  }
}
