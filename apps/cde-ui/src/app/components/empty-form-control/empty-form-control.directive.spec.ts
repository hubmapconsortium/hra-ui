import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MarkEmptyFormControlDirective } from './empty-form-control.directive';

describe('EmptyFormControlDirective', () => {
  it('initial state should have class "empty" when the control is empty', async () => {
    await render(
      `<input type="text" [class.empty]="isEmpty" cdeMarkEmptyFormControl [formControl]="control" data-testid="input" />`,
      {
        imports: [MarkEmptyFormControlDirective, ReactiveFormsModule],
        componentProperties: {
          control: new FormControl(),
        },
      },
    );

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('empty');
  });

  it('should remove "empty" class when the control is not empty', async () => {
    const user = userEvent.setup();
    await render(
      `<input type="text" [class.empty]="isEmpty" cdeMarkEmptyFormControl [formControl]="control" data-testid="input" />`,
      {
        imports: [MarkEmptyFormControlDirective, ReactiveFormsModule],
        componentProperties: {
          control: new FormControl(),
          isEmpty: false,
        },
      },
    );

    const input = screen.getByTestId('input');
    await user.type(input, 'Hello');

    expect(input).not.toHaveClass('empty');
  });
});
