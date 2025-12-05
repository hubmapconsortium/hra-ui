import { NgControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { render } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../app-config.service';
import { SheetDetails } from '../../models/sheet.model';
import { OrganTableSelectorComponent } from './organ-table-selector.component';

describe('OrganTableSelectorComponent', () => {
  const createMockSheet = (name: string, position: number, hraVersion = '1.0'): SheetDetails => ({
    name,
    display: name.charAt(0).toUpperCase() + name.slice(1),
    title: `${name} Table`,
    config: { bimodal_distance_x: 0, bimodal_distance_y: 0, width: 0, height: 0 },
    position,
    version: [{ value: `${name}-v${hraVersion}`, viewValue: `${name} v${hraVersion}`, hraVersion }],
    symbol: `${name}-v${hraVersion}`,
  });

  const createAllRow = (hraVersion = '1.0'): SheetDetails => ({
    name: 'all',
    display: 'All',
    title: 'All',
    config: { bimodal_distance_x: 0, bimodal_distance_y: 0, width: 0, height: 0 },
    position: -1,
    version: [{ value: `all-${hraVersion}`, viewValue: `All ${hraVersion}`, hraVersion }],
    symbol: `all-${hraVersion}`,
  });

  const mockSheetDetails = [createMockSheet('kidney', 0), createMockSheet('liver', 1)];
  const mockOmapSheetDetails = [createMockSheet('omap1', 0)];
  const mockDialogRef = { close: jest.fn() };
  const mockConfigService = {
    sheetConfiguration$: new BehaviorSubject(mockSheetDetails),
    omapsheetConfiguration$: new BehaviorSubject(mockOmapSheetDetails),
  };

  async function setup(dialogData?: {
    getFromCache?: boolean;
    organs?: string[];
    omapOrgans?: string[];
    isIntilalSelect?: boolean;
  }) {
    const defaultData = { getFromCache: true, organs: [], omapOrgans: [], isIntilalSelect: false };
    const result = await render(OrganTableSelectorComponent, {
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { ...defaultData, ...dialogData } },
        { provide: NgControl, useValue: { valueChanges: new BehaviorSubject(null) } },
      ],
    });
    return result.fixture.componentInstance;
  }

  beforeEach(() => jest.clearAllMocks());

  it('should create and initialize with configurations and dialog data', async () => {
    const component = await setup({
      getFromCache: true,
      organs: ['kidney-v1.0'],
      omapOrgans: ['omap1-v1.0'],
    });

    expect(component).toBeTruthy();
    expect(component.configService).toBeDefined();
    expect(component.dialogRef).toBeDefined();
    expect(component.data).toBeDefined();
    expect(component.sheetOptions).toEqual(mockSheetDetails);
    expect(component.omapSheetOptions).toEqual(mockOmapSheetDetails);
    expect(component.organs).toEqual(['kidney-v1.0']);
    expect(component.omapOrgans).toEqual(['omap1-v1.0']);
  });

  it('should toggle selection for ASCT+B and OMAP tabs', async () => {
    const component = await setup();

    expect(component.isAllSelected()).toBe(false);
    component.masterToggle();
    expect(component.selection.selected.length).toBe(mockSheetDetails.length);
    expect(component.isAllSelected()).toBe(true);

    component.masterToggle();
    expect(component.selection.selected.length).toBe(0);

    component.componentActive = 1;
    component.masterToggle();
    expect(component.omapselection.selected.length).toBe(mockOmapSheetDetails.length);
  });

  it('should select rows and update hasSomeOrgans for both tabs', async () => {
    const component = await setup();

    expect(component.hasSomeOrgans).toBe(false);
    component.selectRow(mockSheetDetails[0]);
    expect(component.selection.isSelected(mockSheetDetails[0])).toBe(true);
    expect(component.hasSomeOrgans).toBe(true);

    component.selectRow(mockSheetDetails[0]);
    expect(component.selection.isSelected(mockSheetDetails[0])).toBe(false);

    component.componentActive = 1;
    component.selectRow(mockOmapSheetDetails[0]);
    expect(component.omapselection.isSelected(mockOmapSheetDetails[0])).toBe(true);
  });

  it('should handle "all" row selection and version changes', async () => {
    const component = await setup();
    const allRow = createAllRow('1.0');

    component.selectRow(allRow);
    expect(component.selection.selected.length).toBe(2);

    component.selection.select(allRow);
    component.selectRow(allRow);
    expect(component.selection.selected.length).toBe(0);

    component.selection.select(mockSheetDetails[0]);
    component.selectByHraVersion(createAllRow('99.0'));
    expect(component.selection.selected.length).toBe(0);

    component.changeVersion('all-1.0', allRow);
    expect(allRow.symbol).toBe('all-1.0');

    const rowWithoutSymbol: SheetDetails = {
      name: 'all',
      display: 'All',
      title: 'All',
      config: { bimodal_distance_x: 0, bimodal_distance_y: 0, width: 0, height: 0 },
      position: -1,
      version: [{ value: 'all-1.0', viewValue: 'All 1.0', hraVersion: '1.0' }],
    };
    component.selectByHraVersion(rowWithoutSymbol);
    expect(component.selection.selected.length).toBe(2);
  });

  it('should close dialog with selected organs and skip invalid items', async () => {
    const component = await setup();

    component.selection.select(mockSheetDetails[0]);
    component.omapselection.select(mockOmapSheetDetails[0]);
    component.addSheets();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      organs: ['kidney-v1.0'],
      cache: true,
      omapOrgans: ['omap1-v1.0'],
    });

    jest.clearAllMocks();
    component.selection.clear();
    component.omapselection.clear();
    component.selection.select(createAllRow('1.0'));
    component.selection.select({ ...mockSheetDetails[0], symbol: undefined });
    component.addSheets();
    expect(mockDialogRef.close).toHaveBeenCalledWith({ organs: [], cache: true, omapOrgans: [] });
  });

  it('should generate checkbox labels, change version and tab', async () => {
    const component = await setup();
    const row = mockSheetDetails[0];

    expect(component.checkboxLabel()).toBe('select all');
    expect(component.checkboxLabel(row)).toContain('select row 1');

    component.selection.select(row);
    expect(component.checkboxLabel(row)).toContain('deselect row 1');

    component.changeVersion('kidney-v2.0', row);
    expect(row.symbol).toBe('kidney-v2.0');

    component.changeTab(1);
    expect(component.componentActive).toBe(1);
  });
});
