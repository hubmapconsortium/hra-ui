import { Component, TemplateRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { RichTooltipModule } from '../rich-tooltip.module';
import { RichTooltipContainerComponent } from './rich-tooltip-content.component';

@Component({
  imports: [RichTooltipModule, MatIconModule, ButtonsModule],
  selector: 'hra-test-custom-content-host',
  template: `
    <button
      mat-icon-button
      hraRichTooltip
      hraRichTooltipTagline="Hello Developer!"
      hraRichTooltipDescription="This is some brand new component!"
    >
      <mat-icon>info</mat-icon>
    </button>
  `,
})
class SimpleContentHostComponent {}

@Component({
  imports: [RichTooltipModule, MatIconModule, ButtonsModule],
  selector: 'hra-test-custom-content-host',
  template: `
    <hra-rich-tooltip-container #content data-testid="tooltip-container">
      <hra-rich-tooltip-tagline> Hello Developer! </hra-rich-tooltip-tagline>
      <hra-rich-tooltip-content> This is some brand new component. </hra-rich-tooltip-content>
      <hra-rich-tooltip-actions>
        <button mat-button hraRichTooltipClose color="accent" data-testid="close-tooltip-button">Close</button>
        <button mat-button color="accent">Do Nothing</button>
      </hra-rich-tooltip-actions>
    </hra-rich-tooltip-container>
    <button mat-icon-button [hraRichTooltip]="content" data-testid="tooltip-button">
      <mat-icon>info</mat-icon>
    </button>
  `,
})
class CustomContentHostComponent {}

describe('RichTooltipContainerComponent - Custom Content', () => {
  let componentFixture: ComponentFixture<CustomContentHostComponent>;

  /**
   * Gets the tooltip component instance from the component fixture.
   * @returns Tooltip component instance
   */
  function getTooltipComponent(): RichTooltipContainerComponent {
    return componentFixture.debugElement.children[0].componentInstance as RichTooltipContainerComponent;
  }

  beforeEach(async () => {
    componentFixture = (await render(CustomContentHostComponent)).fixture;
    componentFixture.detectChanges();
  });

  it('should render the component', async () => {
    const tooltipComponent = getTooltipComponent();
    expect(tooltipComponent).toBeTruthy();
  });

  it('should detect the container template', async () => {
    const tooltipComponent = getTooltipComponent();
    expect(tooltipComponent.template()).toBeInstanceOf(TemplateRef);
  });

  it('should detect close directives', async () => {
    const tooltipComponent = getTooltipComponent();
    expect(tooltipComponent.closeDirectives().length).toBe(1);
  });

  it('should set controller on close directives when tooltip is attached', async () => {
    const tooltipComponent = getTooltipComponent();
    const tooltipButton = screen.getByTestId('tooltip-button');
    await userEvent.click(tooltipButton);
    tooltipComponent.closeDirectives().forEach((dir) => {
      expect(dir.controller).toBeTruthy();
    });
  });

  it('close the tooltip on close button click', async () => {
    const tooltipComponent = getTooltipComponent();
    const tooltipButton = screen.getByTestId('tooltip-button');
    await userEvent.click(tooltipButton);
    tooltipComponent.closeDirectives().forEach((dir) => {
      expect(dir.controller).toBeTruthy();
      if (dir.controller) {
        dir.controller.close = jest.fn();
      }
    });
    const tooltipCloseButton = screen.getByTestId('close-tooltip-button');
    await userEvent.click(tooltipCloseButton);
    tooltipComponent.closeDirectives().forEach((dir) => {
      expect(dir.controller?.close).toHaveBeenCalled();
    });
  });
});

describe('RichTooltipContainerComponent - Simple Content', () => {
  let componentFixture: ComponentFixture<SimpleContentHostComponent>;

  beforeEach(async () => {
    componentFixture = (await render(SimpleContentHostComponent)).fixture;
    componentFixture.detectChanges();
  });

  it('should render the component', () => {
    const iconButton = componentFixture.nativeElement.querySelector('button');
    expect(iconButton).toBeTruthy();
  });
});
