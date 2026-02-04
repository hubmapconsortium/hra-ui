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
    await setup();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should render version selector', async () => {
    await setup();

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should have mat-select with version options', async () => {
    await setup();

    const formField = screen.getByRole('combobox');
    expect(formField).toBeInTheDocument();
  });
});
