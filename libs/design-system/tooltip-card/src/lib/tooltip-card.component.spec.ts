import { screen } from '@testing-library/dom';
import { TooltipCardComponent } from './tooltip-card.component';
import { render } from '@testing-library/angular';

describe('TooltipCardComponent', () => {
  beforeEach(async () => {
    await render(TooltipCardComponent, {
      componentInputs: {
        info: [
          {
            title: 'Test Title',
            description: 'Test Description',
          },
        ],
      },
    });
  });

  it('should render title and description', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
