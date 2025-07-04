import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { RenderComponentOptions, render, screen } from '@testing-library/angular';
import { CellTypeEntry } from '../../models/cell-type';
import { CellTypesComponent } from './cell-types.component';

describe('CellTypesComponent', () => {
  const cellTypes: CellTypeEntry[] = [
    { name: 'Cell Type 1', count: 100, color: [0, 1, 2], outgoingEdgeCount: 0 },
    { name: 'Cell Type 2', count: 200, color: [3, 4, 5], outgoingEdgeCount: 0 },
    { name: 'Cell Type 3', count: 300, color: [6, 7, 8], outgoingEdgeCount: 0 },
  ];
  const cellTypesSelection = [cellTypes[0].name, cellTypes[1].name];

  async function setup(options?: RenderComponentOptions<CellTypesComponent>) {
    return render(CellTypesComponent, {
      ...options,
      providers: [provideDesignSystemCommon(), ...(options?.providers ?? [])],
    });
  }

  it('should update nodes when downloadNodes is called', async () => {
    const emitFn = jest.fn();
    const { fixture } = await setup({
      inputs: { cellTypes, cellTypesSelection },
      on: {
        downloadNodes: emitFn,
      },
    });
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);

    await menu.clickItem({ text: /Download/ }, { text: /Cells CSV/ });
    expect(emitFn).toHaveBeenCalled();
  });

  it('should update edges when downloadEdges is called', async () => {
    const emitFn = jest.fn();
    const { fixture } = await setup({
      inputs: { cellTypes, cellTypesSelection },
      on: {
        downloadEdges: emitFn,
      },
    });

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);

    await menu.clickItem({ text: /Download/ }, { text: /Cell Links CSV/ });
    expect(emitFn).toHaveBeenCalled();
  });

  it('should update color map when downloadColorMap is called', async () => {
    const emitFn = jest.fn();
    const { fixture } = await setup({
      inputs: { cellTypes, cellTypesSelection },
      on: {
        downloadColorMap: emitFn,
      },
    });

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);

    await menu.clickItem({ text: /Download/ }, { text: /Cell Color Map CSV/ });
    expect(emitFn).toHaveBeenCalled();
  });

  it('should render the component', async () => {
    await setup({
      componentInputs: { cellTypes, cellTypesSelection },
    });

    expect(screen.getByText('Cell Types')).toBeInTheDocument();
    expect(screen.getByText('Total Cell Types')).toBeInTheDocument();
    expect(screen.getByText('Total Cells')).toBeInTheDocument();
  });

  it('should toggle row selection', async () => {
    const { fixture } = await setup({
      componentInputs: { cellTypes, cellTypesSelection },
    });

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const checkboxHarness = await loader.getAllHarnesses(MatCheckboxHarness);
    const checkboxes = screen.getAllByRole('checkbox');
    const firstCheckbox = checkboxes[1];

    expect(firstCheckbox).not.toBeChecked();

    await checkboxHarness[1].check();
    fixture.autoDetectChanges();
    expect(firstCheckbox).toBeChecked();

    await checkboxHarness[1].uncheck();
    fixture.autoDetectChanges();
    expect(firstCheckbox).not.toBeChecked();
  });

  it('toggles row', async () => {
    const component = await setup({
      componentInputs: { cellTypes: cellTypes, cellTypesSelection },
    });

    component.fixture.componentInstance.toggleRow(cellTypes[0]);
    component.fixture.componentInstance.toggleRow(cellTypes[1]);
    expect(component.fixture.componentInstance.cellTypesSelection()).toEqual([]);
  });

  it('updates row color', async () => {
    const component = await setup({
      componentInputs: { cellTypes: cellTypes, cellTypesSelection },
    });

    component.fixture.componentInstance.updateColor(cellTypes[0], [0, 0, 0]);
    expect(component.fixture.componentInstance.cellTypes()[0].color).toEqual([0, 0, 0]);
  });

  it('resets sort', async () => {
    const component = await setup({
      componentInputs: { cellTypes: cellTypes, cellTypesSelection },
    });

    component.fixture.componentInstance.resetSort();
  });

  it('returns partial selection state', async () => {
    const fullSelection = cellTypes.map(({ name }) => name);
    const component = await setup({
      componentInputs: { cellTypes: cellTypes, cellTypesSelection: fullSelection },
    });

    component.fixture.componentInstance.toggleRow(cellTypes[1]);
    component.fixture.componentInstance.toggleRow(cellTypes[2]);
    component.fixture.componentInstance.toggleAllRows();
    expect(component.fixture.componentInstance.cellTypesSelection()).toEqual(fullSelection);
  });

  it('should return total cell count', async () => {
    const { fixture } = await setup({
      componentInputs: { cellTypes, cellTypesSelection: ['Cell Type 1'] },
    });
    fixture.autoDetectChanges();

    expect(screen.getByTestId('total-cell-count')).toHaveTextContent('100');
  });
});
