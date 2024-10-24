import { AnimationEvent } from '@angular/animations';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import {
  ANIMATION_MODULE_TYPE,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Renderer2,
  viewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { BODY_EXPANSION } from './expansion-panel-animations';

/** Counter to keep track of distinct panels */
let idCounter = 0;

/** Expansion panel actions component */
@Component({
  selector: 'hra-expansion-panel-actions',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelActionsComponent {}

/** Expansion panel header content component */
@Component({
  selector: 'hra-expansion-panel-header-content',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelHeaderContentComponent {}

/** Expansion panel component */
@Component({
  selector: 'hra-expansion-panel',
  standalone: true,
  imports: [CommonModule, CdkAccordionModule, IconButtonSizeDirective, MatIconButton, MatIconModule],
  animations: [BODY_EXPANSION],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelComponent {
  /** Title of the expansion panel */
  readonly title = input.required<string>();

  /** Flag to check if the body is expanded */
  readonly expanded = input(true, { transform: booleanAttribute });

  /** Flag to denote panel as disabled */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Increments the counter on every declaration */
  protected readonly id = idCounter++;

  /** Id attribute for title based on current id counter */
  protected readonly titleId = `expansion-panel-title-${this.id}`;

  /** Id attribute for body based on current id counter */
  protected readonly bodyId = `expansion-panel-body-${this.id}`;

  /** Instance of renderer */
  private readonly renderer = inject(Renderer2);

  /** Instance of body element */
  private readonly bodyElementRef = viewChild.required<ElementRef<HTMLElement>>('body');

  /** Actual body element */
  private readonly body = computed(() => this.bodyElementRef().nativeElement);

  /** Disable animations based on module type */
  private readonly animationsDisabled = inject(ANIMATION_MODULE_TYPE) === 'NoopAnimations';

  /** Sets attribute based on event state */
  protected animationStart(event: AnimationEvent): void {
    if (event.fromState !== 'void' && !this.animationsDisabled) {
      this.renderer.setAttribute(this.body(), 'inert', '');
    }
  }

  /** Removes attribute based on event state */
  protected animationDone(event: AnimationEvent): void {
    if (event.fromState !== 'void' && !this.animationsDisabled) {
      this.renderer.removeAttribute(this.body(), 'inert');
    }
  }
}
