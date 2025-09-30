import { Component, signal } from '@angular/core';
import { render } from '@testing-library/angular';
import { CategoriesComponent } from './categories.component';
import { INITIAL_CATEGORY_SETTINGS } from '@hra-ui/common/analytics';

@Component({
  template: '<hra-categories [(categories)]="categories" />',
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
});
