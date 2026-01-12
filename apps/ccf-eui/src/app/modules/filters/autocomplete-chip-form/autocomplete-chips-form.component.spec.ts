import { FormControl } from '@angular/forms';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { render, screen, waitFor, within } from '@testing-library/angular';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { AutocompleteChipsFormComponent } from './autocomplete-chips-form.component';

const FILTER_OPTIONS = ['Kidney', 'Heart', 'Lung'];

async function renderComponent(initialValue: string[] = []) {
  const selectedOptions = jest.fn();
  const form = new FormControl<string[] | null>(initialValue);

  const result = await render(AutocompleteChipsFormComponent, {
    imports: [MatIconTestingModule],
    inputs: {
      label: 'Organ',
      filterOptions: FILTER_OPTIONS,
      form,
    },
    on: {
      selectedOptions,
    },
  });

  return { ...result, form, selectedOptions };
}

describe('AutocompleteChipsFormComponent', () => {
  it('adds an autocomplete option as a chip and marks the form dirty', async () => {
    const { form, selectedOptions } = await renderComponent();

    const input = screen.getByPlaceholderText('Search');
    await userEvent.click(input);
    await userEvent.type(input, 'Kid');
    const option = await screen.findByRole('option', { name: 'Kidney' });
    await userEvent.click(option);

    await waitFor(() => {
      expect(screen.getByText('Kidney')).toBeInTheDocument();
    });
    expect(form.value).toEqual(['Kidney']);
    expect(form.dirty).toBe(true);
    expect(selectedOptions).toHaveBeenCalledTimes(1);
  });

  it('adds a chip when the checkbox is checked', async () => {
    const { form, selectedOptions } = await renderComponent();

    const input = screen.getByPlaceholderText('Search');
    await userEvent.click(input);
    const option = await screen.findByRole('option', { name: 'Heart' });
    const optionContainer = option.closest('.autocomplete-option') as HTMLElement;
    const checkbox = within(optionContainer).getByRole('checkbox');
    await userEvent.click(checkbox);

    await waitFor(() => {
      expect(screen.getByText('Heart')).toBeInTheDocument();
    });
    expect(form.value).toEqual(['Heart']);
    expect(form.dirty).toBe(true);
    expect(selectedOptions).toHaveBeenCalledTimes(1);
  });

  it('removes a chip via the remove button', async () => {
    const { form } = await renderComponent(['Lung']);

    await userEvent.click(screen.getByLabelText('remove Lung'));

    await waitFor(() => {
      expect(screen.queryByLabelText('remove Lung')).not.toBeInTheDocument();
    });
    expect(form.value).toEqual([]);
    expect(form.dirty).toBe(true);
  });

  it('clears all chips with the clear button', async () => {
    const { form, container } = await renderComponent(['Heart', 'Kidney']);

    const clearButton = container.querySelector('[hrafeature="clear"]') as HTMLButtonElement;
    expect(clearButton).not.toBeNull();
    await userEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryAllByRole('row')).toHaveLength(0);
    });
    expect(form.value).toEqual([]);
    expect(form.dirty).toBe(true);
  });

  it('adds a chip when the input token event fires with a matching option', async () => {
    await renderComponent();

    const input = screen.getByPlaceholderText('Search');
    const chipInput = { clear: jest.fn() };
    const event = new Event('matChipInputTokenEnd', { bubbles: true, cancelable: true });
    Object.assign(event, { value: 'Lung', chipInput });

    fireEvent(input, event);

    await waitFor(() => {
      expect(screen.getByText('Lung')).toBeInTheDocument();
    });
    expect(chipInput.clear).toHaveBeenCalled();
  });

  it('shows an error state when no matches are found and prevents adding chips', async () => {
    const { form } = await renderComponent();

    const input = screen.getByPlaceholderText('Search');
    await userEvent.click(input);
    await userEvent.type(input, 'zzz');
    await fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('No matches found')).toBeInTheDocument();
    });
    expect(screen.queryAllByRole('row')).toHaveLength(0);
    expect(form.value).toEqual([]);
  });

  it('closes the autocomplete panel on Escape', async () => {
    await renderComponent();

    const input = screen.getByPlaceholderText('Search');
    await userEvent.click(input);
    await userEvent.type(input, 'Kid');
    await screen.findByRole('option', { name: 'Kidney' });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
