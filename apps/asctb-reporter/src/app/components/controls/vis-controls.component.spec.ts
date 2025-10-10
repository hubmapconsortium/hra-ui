import { render } from '@testing-library/angular';
import { Error } from '../../models/response.model';
import { Sheet, SheetConfig } from '../../models/sheet.model';
import { VisControlsComponent } from './vis-controls.component';

describe('VisControlsComponent', () => {
  let component: VisControlsComponent;
  let updatedConfigSpy: jest.SpyInstance;

  const mockConfig: SheetConfig = {
    width: 800,
    height: 600,
    show_ontology: true,
    discrepencyLabel: false,
    discrepencyId: false,
    duplicateId: false,
    bimodal_distance_x: 100,
    bimodal_distance_y: 50,
    show_all_AS: true,
  };
  const mockSheet: Sheet = {
    name: 'Test',
    display: 'Test',
    sheetId: 'id',
    gid: '123',
    csvUrl: 'https://test.com/sheet.csv',
    title: 'Title',
    config: mockConfig,
  };
  const mockError: Error = { hasError: false, msg: '' };
  const mockOrgans = ['kidney', 'liver'];

  const setup = async (config = mockConfig) => {
    const { fixture } = await render(VisControlsComponent, {
      componentInputs: { config, error: mockError, currentSheet: mockSheet, selectedOrgans: mockOrgans },
    });
    component = fixture.componentInstance;

    updatedConfigSpy = jest.spyOn(component.updatedConfig, 'emit');
  };

  it('should render with all required inputs', async () => {
    await setup();
    expect(component.config).toEqual(mockConfig);
    expect(component.error).toEqual(mockError);
    expect(component.currentSheet).toEqual(mockSheet);
    expect(component.selectedOrgans).toEqual(mockOrgans);
  });

  it('should handle dimension and bimodal controls', async () => {
    await setup();
    component.changeWidth();
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'width', config: mockConfig });

    component.changeHeight();
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'height', config: mockConfig });

    component.changeBimodalDistanceX();
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'bm-x', config: mockConfig });

    component.changeBimodalDistanceY();
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'bm-y', config: mockConfig });
  });

  it('should handle toggle controls and AS edge case', async () => {
    await setup();
    const initialOntology = component.config.show_ontology;

    component.changeShowOntology();
    expect(component.config.show_ontology).toBe(!initialOntology);
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'show-ontology', config: component.config });

    component.changeShowAS();
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'show-as', config: mockConfig });
  });

  it('should handle AS undefined case', async () => {
    await setup({ ...mockConfig, show_all_AS: undefined });
    component.changeShowAS();
  });

  it('should handle discrepancy controls with mutual exclusivity', async () => {
    await setup();
    component.config.discrepencyId = true;
    component.config.duplicateId = true;
    component.showDiscrepencyLabel();
    expect(component.config.discrepencyLabel).toBe(true);
    expect(component.config.discrepencyId).toBe(false);
    expect(component.config.duplicateId).toBe(false);
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'show-discrepency-label', config: component.config });

    component.config.discrepencyLabel = true;
    component.config.duplicateId = true;
    component.showDiscrepencyId();
    expect(component.config.discrepencyId).toBe(true);
    expect(component.config.discrepencyLabel).toBe(false);
    expect(component.config.duplicateId).toBe(false);
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'show-discrepency-id', config: component.config });

    component.config.discrepencyLabel = true;
    component.config.discrepencyId = true;
    component.showDuplicateId();
    expect(component.config.duplicateId).toBe(true);
    expect(component.config.discrepencyLabel).toBe(false);
    expect(component.config.discrepencyId).toBe(false);
    expect(updatedConfigSpy).toHaveBeenCalledWith({ property: 'show-duplicate-id', config: component.config });
  });

  it('should export controls configuration as JSON file', async () => {
    await setup();
    const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;
    const mockElement = { setAttribute: jest.fn(), click: jest.fn(), style: { display: '' } };
    const createSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockElement as unknown as HTMLElement);
    const appendSpy = jest.spyOn(document.body, 'appendChild').mockImplementation();
    const removeSpy = jest.spyOn(document.body, 'removeChild').mockImplementation();

    component.exportControls(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith('a');
    expect(mockElement.setAttribute).toHaveBeenCalledWith(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(JSON.stringify(mockConfig)),
    );
    expect(mockElement.setAttribute).toHaveBeenCalledWith('download', 'asct-b-graph-config.json');
    expect(mockElement.click).toHaveBeenCalled();
    [createSpy, appendSpy, removeSpy].forEach((spy) => spy.mockRestore());
  });
});
