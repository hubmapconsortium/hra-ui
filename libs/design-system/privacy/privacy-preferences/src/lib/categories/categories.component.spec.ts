import { Component, signal } from '@angular/core';
import { render } from '@testing-library/angular';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { CategoriesComponent } from './categories.component';
import { INITIAL_CATEGORY_SETTINGS } from '@hra-ui/common/analytics';

@Component({
  template: '<hra-categories [(categories)]="categories" />',
  imports: [CategoriesComponent],
})
class TestHostComponent {
  readonly categories = signal(INITIAL_CATEGORY_SETTINGS);
}

describe('CategoriesComponent', () => {
  it('should create the component', async () => {
    const result = await render(TestHostComponent, {
      imports: [CategoriesComponent],
    });
    expect(result).toBeTruthy();
  });

  it('should render with custom categories', async () => {
    const customCategories = {
      [EventCategory.Necessary]: true,
      [EventCategory.Statistics]: true,
      [EventCategory.Preferences]: false,
      [EventCategory.Marketing]: false,
    };

    @Component({
      template: '<hra-categories [(categories)]="categories" />',
      imports: [CategoriesComponent],
    })
    class CustomTestHostComponent {
      readonly categories = signal(customCategories);
    }

    const result = await render(CustomTestHostComponent, {
      imports: [CategoriesComponent],
    });
    expect(result).toBeTruthy();
  });

  it('should update categories when toggleCategory is called', async () => {
    const result = await render(TestHostComponent, {
      imports: [CategoriesComponent],
    });

    const component = result.fixture.debugElement.children[0].componentInstance as CategoriesComponent;
    const initialCategories = component.categories();

    // Toggle statistics category
    component.toggleCategory(EventCategory.Statistics, true);

    const updatedCategories = component.categories();
    expect(updatedCategories[EventCategory.Statistics]).toBe(true);
    expect(updatedCategories[EventCategory.Necessary]).toBe(initialCategories[EventCategory.Necessary]);
  });
});
