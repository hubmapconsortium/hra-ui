import { FilterSexEnum } from '@hra-api/ng-client';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { OrganInfo } from 'ccf-shared';
import { SpatialSearchConfigComponent } from './spatial-search-config.component';

describe('SpatialSearchConfigComponent', () => {
  const organs = [
    { id: 'o1', name: 'Organ One', organ: 'organ-one', src: 'organ-one.svg' },
    { id: 'o2', name: 'Organ Two', organ: 'organ-two', src: 'organ-two.svg' },
  ] satisfies OrganInfo[];

  const inputs = {
    organs,
    sex: FilterSexEnum.Female,
    selectedOrgan: organs[0],
  } as const;

  it('renders title, help link, and passes inputs to child', async () => {
    await render(SpatialSearchConfigComponent, {
      inputs,
    });

    expect(screen.getByText('Configure Spatial Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('emits events for close, continue, and updates', async () => {
    const closeDialog = jest.fn();
    const buttonClicked = jest.fn();
    const updateSex = jest.fn();
    const updateOrgan = jest.fn();

    await render(SpatialSearchConfigComponent, {
      inputs,
      on: { closeDialog, buttonClicked, updateSex, updateOrgan },
    });

    await userEvent.click(screen.getByRole('button', { name: '' }));
    expect(closeDialog).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(buttonClicked).toHaveBeenCalledTimes(1);

    const sexSelect = screen.getByRole('combobox', { name: /donor sex/i });
    await userEvent.click(sexSelect);
    await userEvent.click(screen.getByRole('option', { name: /^male$/i }));
    expect(updateSex).toHaveBeenCalled();

    const organInput = screen.getByRole('combobox', { name: /organ/i });
    await userEvent.clear(organInput);
    await userEvent.type(organInput, 'Organ Two');
    await userEvent.click(screen.getByRole('option', { name: 'Organ Two' }));
    expect(updateOrgan).toHaveBeenCalled();
  });
});
