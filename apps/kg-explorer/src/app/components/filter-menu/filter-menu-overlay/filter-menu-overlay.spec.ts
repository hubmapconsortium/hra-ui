import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatChipSetHarness } from '@angular/material/chips/testing';
import { MatActionListHarness } from '@angular/material/list/testing';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { FilterOption } from '../../../utils/utils';
import { FilterMenuOverlayComponent } from './filter-menu-overlay.component';

describe('FilterMenuOverlayComponent', () => {
  async function setup(config: RenderComponentOptions<FilterMenuOverlayComponent> = {}) {
    return render(FilterMenuOverlayComponent, {
      inputs: {
        currentFilters: ['filter1', 'filter2'],
        filterOptionCategory: {
          label: 'test-category',
          options: [
            { id: 'option1', label: 'Option 1', count: 10 },
            { id: 'option2', label: 'Option 2', count: 4 },
          ],
        },
        form: new FormControl<FilterOption[] | null>(null),
        ...config.inputs,
      },
      on: {
        ...config.on,
      },
    });
  }

  async function getOptionButtons(fixture: ComponentFixture<FilterMenuOverlayComponent>) {
    const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    const menuButton = screen.getByText('test-category');
    await userEvent.click(menuButton);

    const list = await loader.getHarness(MatActionListHarness);
    return await list.getItems({ selector: '.option' });
  }

  it('should select an option', async () => {
    const filterChanged = jest.fn();
    const { fixture } = await setup({ on: { filterChanged } });
    const component = fixture.componentInstance;
    const buttons = await getOptionButtons(fixture);

    await buttons[0].click();
    expect(filterChanged).toHaveBeenCalled();
    expect(component.selectedOptions()).toEqual([{ id: 'option1', label: 'Option 1', count: 10 }]);
  });

  it('should remove an option', async () => {
    const filterChanged = jest.fn();
    const { fixture } = await setup({ on: { filterChanged } });
    const component = fixture.componentInstance;
    const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    const buttons = await getOptionButtons(fixture);
    await buttons[0].click();
    filterChanged.mockReset();

    const set = await loader.getHarness(MatChipSetHarness);
    const chips = await set.getChips();
    expect(chips.length).toBeGreaterThanOrEqual(1);
    await chips[0].remove();

    expect(filterChanged).toHaveBeenCalled();
    expect(component.selectedOptions()).toEqual([]);
  });

  it('should remove a clicked option if already selected', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const buttons = await getOptionButtons(fixture);
    await buttons[0].click();
    await buttons[0].click();
    expect(component.selectedOptions()).toEqual([]);
  });

  it('navigates to a link', async () => {
    const { fixture } = await setup();

    const component = fixture.componentInstance;
    const spy = jest.spyOn(window, 'open').mockImplementation();
    component.navigateToLink('link');
    expect(spy).toHaveBeenCalledWith('link', '_blank');
  });

  it('filters options after typing in the search bar', async () => {
    const { fixture } = await setup();

    const component = fixture.componentInstance;
    component.searchControl.setValue('1');
    expect(component.filteredOptions()).toEqual([{ id: 'option1', label: 'Option 1', count: 10 }]);
  });
});
