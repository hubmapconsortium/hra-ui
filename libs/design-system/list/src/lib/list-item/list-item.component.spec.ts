import { render } from '@testing-library/angular';
import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  it('should render', async () => {
    const promise = render(ListItemComponent);
    await expect(promise).resolves.toBeDefined();
  });
});
