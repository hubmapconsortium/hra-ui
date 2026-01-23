import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fireEvent, render, screen } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../app-config.service';
import { SheetDetails } from '../../models/sheet.model';
import { OrganTableSelectorComponent } from './organ-table-selector.component';

describe('OrganTableSelectorComponent', () => {
  const createMockSheet = (name: string, position: number): SheetDetails => ({
    name,
    display: name.charAt(0).toUpperCase() + name.slice(1),
    title: `${name} Table`,
    config: { bimodal_distance_x: 0, bimodal_distance_y: 0, width: 0, height: 0 },
    position,
    version: [{ value: `${name}-v1.0`, viewValue: `${name} v1.0`, hraVersion: '1.0' }],
    symbol: `${name}-v1.0`,
  });

  const mockSheetDetails = [createMockSheet('kidney', 0), createMockSheet('liver', 1)];
  const mockOmapSheetDetails = [createMockSheet('omap1', 0)];

  const mockDialogData = {
    getFromCache: true,
    organs: [] as string[],
    omapOrgans: [] as string[],
    isIntilalSelect: false,
  };

  const createConfigServiceMock = () => ({
    sheetConfiguration$: new BehaviorSubject(mockSheetDetails),
    omapsheetConfiguration$: new BehaviorSubject(mockOmapSheetDetails),
  });

  const createDialogRefMock = () => ({ close: jest.fn() });

  async function setup(dialogData = mockDialogData): Promise<{
    dialogRef: ReturnType<typeof createDialogRefMock>;
    configService: ReturnType<typeof createConfigServiceMock>;
  }> {
    const dialogRef = createDialogRefMock();
    const configService = createConfigServiceMock();

    await render(OrganTableSelectorComponent, {
      providers: [
        { provide: ConfigService, useValue: configService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: NgControl, useValue: { valueChanges: new BehaviorSubject(null) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    return { dialogRef, configService };
  }

  afterEach(() => jest.clearAllMocks());

  describe('Dialog rendering', () => {
    it('renders dialog with title and tabs', async () => {
      await setup();
      expect(screen.getByText('Select one or more datasets')).toBeInTheDocument();
      expect(screen.getByText('ASCT+B Tables')).toBeInTheDocument();
      expect(screen.getByText('OMAPs')).toBeInTheDocument();
    });

    it('renders cache toggle', async () => {
      await setup();
      const cacheToggle = screen.getByText('Cache');
      expect(cacheToggle).toBeInTheDocument();
    });

    it('renders visualize button', async () => {
      await setup();
      const visualizeButton = screen.getByRole('button', { name: /visualize data/i });
      expect(visualizeButton).toBeInTheDocument();
    });
  });

  describe('ASCT+B Tables tab', () => {
    it('renders organ rows in the table', async () => {
      await setup();
      expect(screen.getByText('Kidney')).toBeInTheDocument();
      expect(screen.getByText('Liver')).toBeInTheDocument();
    });

    it('renders checkboxes for each organ', async () => {
      await setup();
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('selects organ when checkbox is clicked', async () => {
      await setup();
      const firstCheckbox = screen.getByLabelText('select row 1');
      const visualizeButton = screen.getByRole('button', { name: /visualize data/i });

      expect(visualizeButton).toBeDisabled();
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
      expect(visualizeButton).toBeEnabled();
    });

    it('deselects organ when checkbox is clicked again', async () => {
      await setup();
      const firstCheckbox = screen.getByLabelText('select row 1');
      const visualizeButton = screen.getByRole('button', { name: /visualize data/i });

      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
      expect(visualizeButton).toBeEnabled();

      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).not.toBeChecked();
      expect(visualizeButton).toBeDisabled();
    });

    it('initializes with pre-selected organs', async () => {
      await setup({ getFromCache: true, organs: ['kidney-v1.0'], omapOrgans: [], isIntilalSelect: false });

      const firstCheckbox = await screen.findByRole('checkbox', { name: /select row 1/i });
      const visualizeButton = screen.getByRole('button', { name: /visualize data/i });

      expect(firstCheckbox).toBeChecked();
      expect(visualizeButton).toBeEnabled();
    });
  });

  describe('Master toggle', () => {
    it('selects all checkboxes when master toggle is clicked', async () => {
      await setup();
      const masterToggle = screen.getByLabelText('select all');
      const allCheckboxes = screen
        .getAllByRole('checkbox')
        .filter((cb) => cb.getAttribute('aria-label')?.startsWith('select row'));

      fireEvent.click(masterToggle);

      allCheckboxes.forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });

    it('deselects all checkboxes when master toggle is clicked twice', async () => {
      await setup();
      const masterToggle = screen.getByLabelText('select all');
      const allCheckboxes = screen
        .getAllByRole('checkbox')
        .filter((cb) => cb.getAttribute('aria-label')?.startsWith('select row'));

      fireEvent.click(masterToggle);
      fireEvent.click(masterToggle);

      allCheckboxes.forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe('OMAP tab', () => {
    it('switches to OMAP tab', async () => {
      await setup();
      const omapTab = screen.getByText('OMAPs');

      fireEvent.click(omapTab);

      const omapElements = screen.getAllByText(/omap1/i);
      expect(omapElements.length).toBeGreaterThan(0);
    });

    it('renders OMAP rows with checkboxes', async () => {
      await setup();
      const omapTab = screen.getByText('OMAPs');
      fireEvent.click(omapTab);

      const omapCheckboxes = screen.getAllByRole('checkbox').filter((cb) => {
        const label = cb.getAttribute('aria-label');
        return label && !label.includes('all') && cb.getAttribute('aria-hidden') !== 'true';
      });

      expect(omapCheckboxes.length).toBeGreaterThan(0);
    });

    it('selects OMAP checkbox when clicked', async () => {
      await setup();
      const omapTab = screen.getByText('OMAPs');
      fireEvent.click(omapTab);

      const omapCheckboxes = screen.getAllByRole('checkbox').filter((cb) => {
        const label = cb.getAttribute('aria-label');
        return label && label.startsWith('select row') && cb.getAttribute('aria-hidden') !== 'true';
      });

      const firstOmapCheckbox = omapCheckboxes[0];
      fireEvent.click(firstOmapCheckbox);

      expect(firstOmapCheckbox).toBeChecked();
    });

    it('master toggle exists in OMAP tab', async () => {
      await setup();
      const omapTab = screen.getByText('OMAPs');
      fireEvent.click(omapTab);

      // Verify master toggle checkbox exists
      const masterToggles = screen.getAllByLabelText('select all');
      expect(masterToggles.length).toBeGreaterThan(0);
    });

    it('initializes with pre-selected OMAP organs', async () => {
      await setup({
        getFromCache: true,
        organs: [],
        omapOrgans: ['omap1-v1.0'],
        isIntilalSelect: false,
      });

      const omapTab = screen.getByText('OMAPs');
      fireEvent.click(omapTab);

      const omapCheckboxes = screen.getAllByRole('checkbox').filter((cb) => {
        const label = cb.getAttribute('aria-label');
        return label && label.startsWith('select row') && cb.getAttribute('aria-hidden') !== 'true';
      });

      const omapRowCheckbox = omapCheckboxes.find((cb) => cb.getAttribute('aria-label') === 'select row 1');
      expect(omapRowCheckbox).toBeChecked();
    });
  });

  describe('Dialog actions', () => {
    it('closes dialog with selected organs', async () => {
      const { dialogRef } = await setup();
      const firstCheckbox = screen.getByLabelText('select row 1');
      const visualizeButton = screen.getByRole('button', { name: /visualize data/i });

      fireEvent.click(firstCheckbox);
      fireEvent.click(visualizeButton);

      expect(dialogRef.close).toHaveBeenCalledWith(
        expect.objectContaining({
          organs: ['kidney-v1.0'],
          cache: true,
        }),
      );
    });

    it('closes dialog without selection when back button is clicked', async () => {
      const { dialogRef } = await setup();
      const backButton = screen.getByRole('button', { name: /back/i });

      fireEvent.click(backButton);

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
