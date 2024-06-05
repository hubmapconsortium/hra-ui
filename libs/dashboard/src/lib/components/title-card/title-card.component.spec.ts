import { TitleCardComponent } from './title-card.component';
import { render, screen } from '@testing-library/angular';

describe('TitleCardComponent', () => {
  const testData = {
    title: 'test',
    tooltip: 'tooltip',
  };
  beforeEach(async () => {
    await render(TitleCardComponent, {
      componentInputs: { spec: testData },
    });
  });

  it('should create', async () => {
    const heading = screen.findByText('test');
    expect(await heading).toBeInTheDocument();
  });
});
