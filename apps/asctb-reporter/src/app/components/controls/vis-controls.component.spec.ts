import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Error } from '../../models/response.model';
import { Sheet, SheetConfig } from '../../models/sheet.model';
import { VisControlsComponent } from './vis-controls.component';

describe('VisControlsComponent', () => {
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

  const setup = async (config = mockConfig, sheet = mockSheet) => {
    const updatedConfigSpy = jest.fn();
    const result = await render(VisControlsComponent, {
      inputs: { config, error: mockError, currentSheet: sheet, selectedOrgans: mockOrgans },
      on: { updatedConfig: updatedConfigSpy },
    });
    return { ...result, updatedConfigSpy };
  };

  it('should render with all required inputs', async () => {
    const { updatedConfigSpy } = await setup();
    const widthInput = screen.getByLabelText('Width') as HTMLInputElement;
    const heightInput = screen.getByLabelText('Height') as HTMLInputElement;
    expect(widthInput.value).toBe(String(mockConfig.width));
    expect(heightInput.value).toBe(String(mockConfig.height));
    expect(screen.getByText(/Tree controls/i)).toBeInTheDocument();
    expect(screen.getByText(/Bimodal distance controls/i)).toBeInTheDocument();
    expect(updatedConfigSpy).toBeDefined();
  });

  it('should handle dimension and bimodal controls', async () => {
    const { updatedConfigSpy } = await setup();
    const widthInput = screen.getByLabelText('Width') as HTMLInputElement;
    await userEvent.clear(widthInput);
    await userEvent.type(widthInput, '900');
    widthInput.blur();
    expect(updatedConfigSpy).toHaveBeenCalledWith(
      expect.objectContaining({ property: 'width', config: expect.objectContaining({ width: 900 }) }),
    );

    const heightInput = screen.getByLabelText('Height') as HTMLInputElement;
    await userEvent.clear(heightInput);
    await userEvent.type(heightInput, '1200');
    heightInput.blur();
    expect(updatedConfigSpy).toHaveBeenCalledWith(
      expect.objectContaining({ property: 'height', config: expect.objectContaining({ height: 1200 }) }),
    );

    const xInput = screen.getByLabelText('X') as HTMLInputElement;
    await userEvent.clear(xInput);
    await userEvent.type(xInput, '150');
    xInput.blur();
    expect(updatedConfigSpy).toHaveBeenCalledWith(
      expect.objectContaining({ property: 'bm-x', config: expect.objectContaining({ bimodal_distance_x: 150 }) }),
    );

    const yInput = screen.getByLabelText('Y') as HTMLInputElement;
    await userEvent.clear(yInput);
    await userEvent.type(yInput, '60');
    yInput.blur();
    expect(updatedConfigSpy).toHaveBeenCalledWith(
      expect.objectContaining({ property: 'bm-y', config: expect.objectContaining({ bimodal_distance_y: 60 }) }),
    );
  });

  it('should handle toggle controls and AS edge case', async () => {
    const { updatedConfigSpy } = await setup(mockConfig, { ...mockSheet, name: 'all' });
    const ontologyToggle = screen.getByText('Show ontology IDs');
    const initialOntology = mockConfig.show_ontology;
    await userEvent.click(ontologyToggle);
    expect(updatedConfigSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        property: 'show-ontology',
        config: expect.objectContaining({ show_ontology: !initialOntology }),
      }),
    );

    const showASToggle = screen.getByText('Show all AS');
    await userEvent.click(showASToggle);
    expect(updatedConfigSpy).toHaveBeenCalledWith(expect.objectContaining({ property: 'show-as' }));
  });

  it('should handle AS undefined case', async () => {
    const { updatedConfigSpy } = await setup({ ...mockConfig, show_all_AS: undefined }, { ...mockSheet, name: 'all' });
    const showASToggle = screen.getByText('Show all AS');
    await userEvent.click(showASToggle);
    expect(updatedConfigSpy).toHaveBeenCalled();
  });

  it('should handle discrepancy controls with mutual exclusivity', async () => {
    const { updatedConfigSpy } = await setup();

    const labelToggle = screen.getByText('Label mismatch');
    await userEvent.click(labelToggle);
    expect(updatedConfigSpy).toHaveBeenCalledWith(expect.objectContaining({ property: 'show-discrepency-label' }));

    const idToggle = screen.getByText('ID Missing');
    await userEvent.click(idToggle);
    expect(updatedConfigSpy).toHaveBeenCalledWith(expect.objectContaining({ property: 'show-discrepency-id' }));

    const dupToggle = screen.getByText('ID Duplicates');
    await userEvent.click(dupToggle);
    expect(updatedConfigSpy).toHaveBeenCalledWith(expect.objectContaining({ property: 'show-duplicate-id' }));
  });

  it('should export controls configuration as JSON file', async () => {
    const { fixture } = await setup();
    const mockEvent = { stopPropagation: jest.fn() } as unknown as Event;
    const mockElement = { setAttribute: jest.fn(), click: jest.fn(), style: { display: '' } };
    const createSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockElement as unknown as HTMLElement);
    const appendSpy = jest.spyOn(document.body, 'appendChild').mockImplementation();
    const removeSpy = jest.spyOn(document.body, 'removeChild').mockImplementation();

    fixture.componentInstance.exportControls(mockEvent);
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
