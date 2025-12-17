import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReleaseNotesVersionSelectorComponent } from './release-notes-version-selector.component';

describe('ReleaseNotesVersionSelectorComponent', () => {
  async function setup() {
    const result = await render(ReleaseNotesVersionSelectorComponent, {
      providers: [provideRouter([])],
    });
    const user = userEvent.setup();
    return { ...result, user };
  }

  it('should create', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should render version selector', async () => {
    const { container } = await setup();

    const select = container.querySelector('mat-select');
    expect(select).toBeInTheDocument();
  });

  it('should have mat-select with version options', async () => {
    const { container } = await setup();

    const formField = container.querySelector('mat-form-field');
    expect(formField).toBeInTheDocument();
  });
});
