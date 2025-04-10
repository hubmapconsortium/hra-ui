import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichTooltipSimpleContentComponent } from './rich-tooltip-simple-content.component';
import { render } from '@testing-library/angular';

describe('RichTooltipSimpleContentComponent', () => {
  it('should render', async () => {
    const promise = render(RichTooltipSimpleContentComponent, {
      inputs: { title: 'Title', description: 'Description', actionText: 'Action' },
    });

    await expect(promise).resolves.toBeDefined();
  });
});
