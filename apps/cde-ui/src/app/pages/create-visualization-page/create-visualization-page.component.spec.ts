import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OutputEmitterRef } from '@angular/core';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { VisualizationSettings } from '../../models/create-visualization-page-types';
import { CellTypeTableData, CreateVisualizationPageComponent } from './create-visualization-page.component';

describe('CreateVisualizationPageComponent', () => {
  const globalProviders = [provideIcons(), provideHttpClient(), provideHttpClientTesting()];

  it('should process and update data correctly in setData', async () => {
    const { fixture } = await render(CreateVisualizationPageComponent, {
      providers: globalProviders,
    });

    const component = fixture.componentInstance;
    const testInputData = [
      { x: 1, y: 1, cellType: 'TypeA' },
      { x: 2, y: 2, cellType: 'TypeB' },
      { x: 3, y: 3, cellType: 'TypeA' },
    ];

    component.setData(testInputData);

    expect(component.data).toEqual(testInputData);
    expect(component.anchorCellTypes).toEqual([
      { value: 'TypeA', viewValue: 'TypeA' },
      { value: 'TypeB', viewValue: 'TypeB' },
    ]);
  });

  it('can toggle color map selection', async () => {
    const { fixture } = await render(CreateVisualizationPageComponent, {
      providers: globalProviders,
    });
    fixture.componentInstance.toggleDefaultColorMap();
    expect(fixture.componentInstance.useDefaultColorMap).toBe(false);
  });

  describe('onSubmit()', () => {
    it('should use provided colormap when default is false', async () => {
      const submitFn = jest.fn();
      await render(CreateVisualizationPageComponent, {
        componentOutputs: {
          visualize: { emit: submitFn } as unknown as OutputEmitterRef<VisualizationSettings>,
        },
        componentProperties: {
          data: [
            {
              x: 10,
              y: 10,
              cellType: 'ct',
            },
          ] as CellTypeTableData[],
          useDefaultColorMap: false,
        },
        providers: globalProviders,
      });
      await userEvent.click(screen.getByText('Visualize'));
      expect(submitFn).toHaveBeenCalled();
    });

    it('should use default colormap when default is true', async () => {
      const submitFn = jest.fn();
      await render(CreateVisualizationPageComponent, {
        componentOutputs: {
          visualize: { emit: submitFn } as unknown as OutputEmitterRef<VisualizationSettings>,
        },
        componentProperties: {
          data: [
            {
              x: 10,
              y: 10,
              cellType: 'ct',
            },
          ] as CellTypeTableData[],
          useDefaultColorMap: true,
        },
        providers: globalProviders,
      });
      await userEvent.click(screen.getByText('Visualize'));
      expect(submitFn).toHaveBeenCalled();
    });
  });
});
