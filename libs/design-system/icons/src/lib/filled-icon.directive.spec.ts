import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { FilledIconDirective } from './filled-icon.directive';

describe('FilledIconDirective', () => {
  it('should apply the provided color', async () => {
    const testColor = '#ff0043';

    await render(`<mat-icon hraFilledIcon="${testColor}">Test Icon</mat-icon>`, {
      imports: [FilledIconDirective],
    });

    const element = screen.getByText('Test Icon');

    expect(element.classList.contains('hra-filled-icon')).toBe(true);

    expect(element.style.getPropertyValue('--hra-filled-icon-color')).toBe(testColor);
  });
});
