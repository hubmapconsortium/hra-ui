import { render } from '@testing-library/angular';
import { ContentPageComponent } from './content-page.component';

describe('ContentPageComponent', () => {
  it('should create', () => {
    const result = render(ContentPageComponent);
    expect(result).toBeTruthy();
  });
});
