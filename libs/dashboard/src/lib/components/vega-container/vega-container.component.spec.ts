import { CommonModule } from '@angular/common';
import { VegaContainerComponent } from './vega-container.component';
import { render, screen } from '@testing-library/angular';
import { TitleCardComponent } from '../title-card/title-card.component';

describe('VegaContainerComponent', () => {
  it('should render the title card and visualization container', async () => {
    const spec = {
      type: 'VegaContainer',
      specUrl: 'https://example.com/vega-spec.json',
      aspectRatio: '16/9',
    };

    await render(VegaContainerComponent, {
      imports: [CommonModule, TitleCardComponent],
      componentInputs: {
        spec: spec,
      },
    });

    const visualizationContainer = screen.getByRole('region', { name: /visualization/i });
    expect(visualizationContainer).toBeInTheDocument();
    expect(visualizationContainer).toHaveStyle({ 'aspect-ratio': '16/9' });
  });
});
