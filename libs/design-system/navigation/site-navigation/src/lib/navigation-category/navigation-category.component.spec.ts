import { render } from '@testing-library/angular';
import { NavigationCategoryComponent } from './navigation-category.component';

describe('NavigationCategoryComponent', () => {
  it('should render', async () => {
    const promise = render(NavigationCategoryComponent, {
      inputs: {
        navigationCategory: {
          type: 'category',
          label: 'Category',
          icon: 'icon',
          children: [],
        },
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
