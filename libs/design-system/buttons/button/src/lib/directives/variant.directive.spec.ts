import { MatButtonModule } from '@angular/material/button';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import {
  ButtonVariantDirective,
  PrimaryButtonVariantDirective,
  SecondaryButtonVariantDirective,
} from './variant.directive';

describe('ButtonVariantDirective', () => {
  const PRIMARY_VARIANT_TEMPLATE = `<button mat-button hraPrimaryButton></button>`;
  const SECONDARY_VARIANT_TEMPLATE = `<button mat-button hraSecondaryButton></button>`;
  const DYNAMIC_VARIANT_TEMPLATE = `<button mat-button [hraButtonVariant]="variant"></button>`;
  const IMPORTS = [
    MatButtonModule,
    ButtonVariantDirective,
    PrimaryButtonVariantDirective,
    SecondaryButtonVariantDirective,
  ];

  it('applies primary classes when using hraPrimaryButton', async () => {
    await render(PRIMARY_VARIANT_TEMPLATE, { imports: IMPORTS });
    const button = screen.getByRole('button');
    expect(button.classList.contains('hra-button-variant-primary')).toBeTruthy();
  });

  it('applies secondary classes when using hraSecondaryButton', async () => {
    await render(SECONDARY_VARIANT_TEMPLATE, { imports: IMPORTS });
    const button = screen.getByRole('button');
    expect(button.classList.contains('hra-button-variant-secondary')).toBeTruthy();
  });

  it('updates the classes dynamically when using hraButtonVariant', async () => {
    const { rerender } = await render(DYNAMIC_VARIANT_TEMPLATE, {
      imports: IMPORTS,
      componentProperties: {
        variant: 'primary',
      },
    });

    const button = screen.getByRole('button');
    expect(button.classList.contains('hra-button-variant-primary')).toBeTruthy();

    rerender({ componentProperties: { variant: 'secondary' } });
    expect(button.classList.contains('hra-button-variant-secondary')).toBeTruthy();
  });
});
