import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { INITIAL_CATEGORY_SETTINGS } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { render, RenderComponentOptions } from '@testing-library/angular';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  function setup(options?: RenderComponentOptions<CategoriesComponent>) {
    return render(CategoriesComponent, {
      ...options,
      inputs: {
        categories: INITIAL_CATEGORY_SETTINGS,
        ...options?.inputs,
      },
    });
  }

  async function findToggleByLabelText(toggles: MatSlideToggleHarness[], text: string) {
    for (const toggle of toggles) {
      const label = await toggle.getAriaLabel();
      if (label && label.toLowerCase().includes(text.toLowerCase())) {
        return toggle;
      }
    }

    return undefined;
  }

  it('should create the component', async () => {
    await expect(setup()).resolves.toBeTruthy();
  });

  it('should update categories when toggleCategory is called', async () => {
    const categoriesChange = jest.fn();
    const { fixture } = await setup({
      on: {
        categories: categoriesChange,
      },
    });

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const toggles = await loader.getAllHarnesses(MatSlideToggleHarness);
    const statsToggle = await findToggleByLabelText(toggles, 'statistics');
    expect(statsToggle).toBeDefined();
    await statsToggle?.check();

    expect(categoriesChange).toHaveBeenCalledWith(
      expect.objectContaining({
        [EventCategory.Statistics]: true,
      }),
    );
  });
});
