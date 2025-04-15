import { Component, TemplateRef } from '@angular/core';
import { RichTooltipModule } from '../rich-tooltip.module';
import { render } from '@testing-library/angular';
import { RichTooltipContainerComponent } from './rich-tooltip-content.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture } from '@angular/core/testing';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

@Component({
  imports: [RichTooltipModule, MatIconModule, ButtonsModule],
  selector: 'hra-test-host',
  template: `
    <hra-rich-tooltip-container #content data-testid="tooltip-container">
      <hra-rich-tooltip-tagline> Hello Developer! </hra-rich-tooltip-tagline>
      <hra-rich-tooltip-content> This is some brand new component. </hra-rich-tooltip-content>
      <hra-rich-tooltip-actions>
        <button mat-button hraRichTooltipClose color="accent">Close</button>
        <button mat-button color="accent">Do Nothing</button>
      </hra-rich-tooltip-actions>
    </hra-rich-tooltip-container>
    <button mat-icon-button [hraRichTooltip]="content" data-testid="tooltip-button">
      <mat-icon>info</mat-icon>
    </button>
  `,
})
class HostComponent {}

describe('RichTooltipContainerComponent', () => {
  let componentFixture: ComponentFixture<HostComponent>;

  /**
   * Gets the tooltip component instance from the component fixture.
   * @returns Tooltip component instance
   */
  function getTooltipComponent(): RichTooltipContainerComponent {
    return componentFixture.debugElement.children[0].componentInstance as RichTooltipContainerComponent;
  }

  beforeEach(async () => {
    componentFixture = (await render(HostComponent)).fixture;
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
});
