import { render, screen } from '@testing-library/angular';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarModule } from './toolbar.module';

describe('ToolbarComponent', () => {
  beforeEach(async () => {
    await render(ToolbarComponent, {
      imports: [ToolbarModule],
    });
  });

  it('should render toolbar', () => {
    expect(screen.getByText('Human Reference Atlas')).toBeDefined();
  });
});
