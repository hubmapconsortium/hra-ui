import { render, screen } from '@testing-library/angular';
import { TitleCardComponent } from './title-card.component';

describe('TitleCardComponent', () => {
  beforeEach(async () => {
    const testData = {
      title: 'test',
      tooltip: 'tooltip',
    };

    await render(TitleCardComponent, {
      componentInputs: { spec: testData },
    });
  });

  it('should create', async () => {
    const heading = screen.findByText('test');
    expect(await heading).toBeInTheDocument();
  });
});
