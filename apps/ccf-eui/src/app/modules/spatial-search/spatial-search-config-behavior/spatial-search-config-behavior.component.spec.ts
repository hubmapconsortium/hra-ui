import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterSexEnum } from '@hra-api/ng-client';
import { Store } from '@ngxs/store';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { OrganInfo } from 'ccf-shared';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import { SetOrgan, SetSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { SpatialSearchUiBehaviorComponent } from '../spatial-search-ui-behavior/spatial-search-ui-behavior.component';
import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';

const organs: OrganInfo[] = [
  { id: 'o1', name: 'Organ One', organ: 'organ-one', src: 'organ-one.svg' },
  { id: 'o2', name: 'Organ Two', organ: 'organ-two', src: 'organ-two.svg' },
];

const selectedOrgan = organs[0];

const storeMock = mock<Store>();
const dialogMock = {
  open: jest.fn(),
  openDialogs: [],
} as unknown as MatDialog;
const dialogRefMock = {
  close: jest.fn(),
} as unknown as MatDialogRef<unknown>;

describe('SpatialSearchConfigBehaviorComponent', () => {
  beforeEach(() => {
    storeMock.select.mockImplementation((selector) => {
      if (selector === SpatialSearchUiSelectors.sex) {
        return of(FilterSexEnum.Female);
      }
      if (selector === SpatialSearchUiSelectors.organ) {
        return of(selectedOrgan);
      }
      if (selector === SpatialSearchUiSelectors.organs) {
        return of(organs);
      }
      return of();
    });
    storeMock.dispatch.mockClear();
    jest.mocked(dialogMock.open).mockClear();
    jest.mocked(dialogRefMock.close).mockClear();
  });

  it('dispatches updates for sex and organ', async () => {
    await render(SpatialSearchConfigBehaviorComponent, {
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    const sexSelect = screen.getByRole('combobox', { name: /donor sex/i });
    await userEvent.click(sexSelect);
    await userEvent.click(screen.getByRole('option', { name: /^male$/i }));

    expect(storeMock.dispatch).toHaveBeenCalledWith(expect.any(SetSex));
    expect((storeMock.dispatch.mock.calls[0][0] as SetSex).sex).toBe(FilterSexEnum.Male);

    const organInput = screen.getByRole('combobox', { name: /organ/i });
    await userEvent.clear(organInput);
    await userEvent.type(organInput, 'Organ Two');
    await userEvent.click(screen.getByRole('option', { name: 'Organ Two' }));

    expect(storeMock.dispatch).toHaveBeenCalledWith(expect.any(SetOrgan));
    expect((storeMock.dispatch.mock.calls[1][0] as SetOrgan).organId).toBe('o2');
  });

  it('opens search UI dialog and closes config on continue', async () => {
    const { fixture } = await render(SpatialSearchConfigBehaviorComponent, {
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    const instance = fixture.componentInstance as unknown as {
      spatialSearchDialog: MatDialog;
      dialogRef: MatDialogRef<unknown>;
    };
    instance.spatialSearchDialog = dialogMock;
    instance.dialogRef = dialogRefMock;

    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(dialogMock.open).toHaveBeenCalledWith(
      SpatialSearchUiBehaviorComponent,
      expect.objectContaining({
        panelClass: 'spatial-search-ui',
        maxWidth: expect.stringContaining('100vw'),
      }),
    );
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('closes dialog when close is invoked', async () => {
    const { fixture } = await render(SpatialSearchConfigBehaviorComponent, {
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    fixture.componentInstance.close();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
