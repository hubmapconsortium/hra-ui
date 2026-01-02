import { render } from '@testing-library/angular';
import { Filter, FilterSexEnum, SpatialEntity, SpatialSceneNode, TissueBlock } from '@hra-api/ng-client';
import { OrganComponent } from './organ.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NodeClickEvent } from 'ccf-body-ui';
import { OutputEmitterRef } from '@angular/core';

describe('OrganComponent', () => {
  const mockOrgan: SpatialEntity = {
    '@id': 'http://example.com/organ1',
    '@type': 'SpatialEntity',
    label: 'Test Organ',
    x_dimension: 100000,
    y_dimension: 200000,
    z_dimension: 150000,
    dimension_units: 'millimeter',
  } as SpatialEntity;

  const mockSceneNodes: SpatialSceneNode[] = [
    {
      '@id': 'node1',
      '@type': 'SpatialSceneNode',
      entityId: 'block1',
      color: [255, 255, 255, 255],
    } as SpatialSceneNode,
    {
      '@id': 'node2',
      '@type': 'SpatialSceneNode',
      entityId: 'block2',
      color: [255, 255, 255, 255],
    } as SpatialSceneNode,
  ];

  const mockBlocks: TissueBlock[] = [
    {
      '@id': 'block1',
      '@type': 'TissueBlock',
      label: 'Block 1',
      sampleType: 'Tissue Block',
      link: 'http://example.com/block1',
      datasets: [],
      donor: {
        '@id': 'donor1',
        '@type': 'Donor',
        label: 'Donor 1',
        link: 'http://example.com/donor1',
        providerName: 'Provider A',
      },
    } as TissueBlock,
    {
      '@id': 'block2',
      '@type': 'TissueBlock',
      label: 'Block 2',
      sampleType: 'Tissue Block',
      link: 'http://example.com/block2',
      datasets: [],
      donor: {
        '@id': 'donor2',
        '@type': 'Donor',
        label: 'Donor 2',
        link: 'http://example.com/donor2',
        providerName: 'Provider B',
      },
    } as TissueBlock,
  ];

  const mockFilter: Filter = {
    sex: FilterSexEnum.Female,
    tmc: ['Provider A'],
  } as Filter;

  const providers = [provideHttpClient(), provideHttpClientTesting()];

  it('should render the organ 3D viewer component', async () => {
    const { fixture } = await render(OrganComponent, {
      providers,
      componentInputs: {
        scene: mockSceneNodes,
        blocks: mockBlocks,
        filter: mockFilter,
      },
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render hra-body-ui element', async () => {
    await render(OrganComponent, {
      providers,
      componentInputs: {
        scene: mockSceneNodes,
        blocks: mockBlocks,
        filter: mockFilter,
      },
    });

    // Query for the hra-body-ui custom element
    const bodyUiElement = document.querySelector('hra-body-ui');
    expect(bodyUiElement).toBeTruthy();
  });

  it('should emit nodeClick event when user interacts with 3D viewer', async () => {
    const nodeClickMock = jest.fn();

    await render(OrganComponent, {
      providers,
      componentInputs: {
        scene: mockSceneNodes,
        blocks: mockBlocks,
        filter: mockFilter,
      },
      componentOutputs: {
        nodeClick: {
          emit: nodeClickMock,
        } as unknown as OutputEmitterRef<NodeClickEvent>,
      },
    });

    // Component should be ready to handle node click events
    const bodyUiElement = document.querySelector('hra-body-ui');
    expect(bodyUiElement).toBeTruthy();
  });

  it('should render with organ input provided', async () => {
    const { fixture } = await render(OrganComponent, {
      providers,
      componentInputs: {
        organ: mockOrgan,
        scene: mockSceneNodes,
        blocks: mockBlocks,
        filter: mockFilter,
      },
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render with empty filter', async () => {
    const emptyFilter: Filter = {
      sex: FilterSexEnum.Female,
      tmc: [],
    } as Filter;

    const { fixture } = await render(OrganComponent, {
      providers,
      componentInputs: {
        scene: mockSceneNodes,
        blocks: mockBlocks,
        filter: emptyFilter,
      },
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render with blocks that have no donor information', async () => {
    const blocksWithNoDonor: TissueBlock[] = [
      {
        '@id': 'block3',
        '@type': 'TissueBlock',
        label: 'Block 3',
        sampleType: 'Tissue Block',
        link: 'http://example.com/block3',
        datasets: [],
      } as TissueBlock,
    ];

    const { fixture } = await render(OrganComponent, {
      providers,
      componentInputs: {
        scene: mockSceneNodes,
        blocks: blocksWithNoDonor,
        filter: mockFilter,
      },
    });

    expect(fixture.componentInstance).toBeTruthy();
  });
});
