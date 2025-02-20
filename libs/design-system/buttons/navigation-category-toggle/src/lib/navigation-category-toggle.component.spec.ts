import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { NavigationCategoryToggleComponent } from './navigation-category-toggle.component';

describe('NavigationCategoryToggleComponent', () => {
  it('can toggle on and off', async () => {
    const onToggled = jest.fn();
    await render(NavigationCategoryToggleComponent, {
      on: { toggled: onToggled },
    });

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onToggled).toHaveBeenCalledWith(true);
  });
});
