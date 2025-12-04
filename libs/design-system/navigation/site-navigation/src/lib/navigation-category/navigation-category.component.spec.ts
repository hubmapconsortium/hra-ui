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

  it('should emit expandedChange when onExpandedChange is called', async () => {
    const { fixture } = await render(NavigationCategoryComponent, {
      inputs: {
        navigationCategory: {
          type: 'category',
          label: 'Category',
          icon: 'icon',
          children: [],
        },
      },
    });

    const component = fixture.componentInstance;
    let emittedValue: boolean | undefined;

    component.expandedChange.subscribe((value) => {
      emittedValue = value;
    });

    component.onExpandedChange(true);
    expect(emittedValue).toBe(true);

    component.onExpandedChange(false);
    expect(emittedValue).toBe(false);
  });
});
