import { Component, input, output } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  Filter,
  FilterSexEnum,
  SpatialEntity,
  SpatialSceneNode,
  TissueBlock,
  TissueBlockTypeEnum,
} from '@hra-api/ng-client';
import { fireEvent, render, screen } from '@testing-library/angular';
import { NodeClickEvent } from 'ccf-body-ui';
import { OrganComponent } from './organ.component';
import { provideDesignSystem } from '@hra-ui/design-system';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hra-body-ui',
  standalone: true,
  template: `<button (click)="handleClick()">Click Node</button>`,
})
class MockBodyUiComponent {
  readonly scene = input<SpatialSceneNode[]>();
  readonly target = input<number[]>();
  readonly rotation = input<number>();
  readonly rotationX = input<number>();
  readonly interactive = input<boolean>();
  readonly camera = input<string>();
  readonly nodeClick = output<NodeClickEvent>();

  private clickCount = 0;
  private nodeIds = ['node1', 'node2'];

  handleClick() {
    const nodeId = this.nodeIds[this.clickCount % this.nodeIds.length];
    this.nodeClick.emit({ node: { '@id': nodeId } as SpatialSceneNode, ctrlClick: false });
    this.clickCount++;
  }

  zoomToBounds() {
    /* noop */
  }
}

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
      '@type': TissueBlockTypeEnum.Sample,
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
      '@type': TissueBlockTypeEnum.Sample,
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

  const providers = [provideHttpClient(), provideHttpClientTesting(), provideDesignSystem()];

  async function renderComponent(
    inputs: Partial<{
      organ: SpatialEntity;
      scene: SpatialSceneNode[];
      blocks: TissueBlock[];
      filter: Filter;
    }> = {},
    nodeClickHandler?: jest.Mock,
  ) {
    return render(OrganComponent, {
      providers,
      componentImports: [MockBodyUiComponent],
      excludeComponentDeclaration: true,
      componentInputs: {
        scene: mockSceneNodes,
        blocks: mockBlocks,
        filter: mockFilter,
        ...inputs,
      },
      on: nodeClickHandler ? { nodeClick: nodeClickHandler } : undefined,
    });
  }

  it('should create and render body ui', async () => {
    await renderComponent();
    expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
  });

  it('should render with organ input provided', async () => {
    await renderComponent({ organ: mockOrgan });
    expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
  });

  it('should render with empty filter', async () => {
    const emptyFilter: Filter = { sex: FilterSexEnum.Female, tmc: [] } as Filter;
    await renderComponent({ filter: emptyFilter });
    expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
  });

  it('should render with blocks that have no donor information', async () => {
    const blocksWithNoDonor: TissueBlock[] = [
      {
        '@id': 'block3',
        '@type': TissueBlockTypeEnum.Sample,
        label: 'Block 3',
        sampleType: 'Tissue Block',
        link: 'http://example.com/block3',
        datasets: [],
      } as TissueBlock,
    ];
    await renderComponent({ blocks: blocksWithNoDonor });
    expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
  });

  describe('nodeClicked', () => {
    it('should emit nodeClick event when body ui node is clicked', async () => {
      const nodeClickSpy = jest.fn();
      await renderComponent({ organ: mockOrgan }, nodeClickSpy);

      fireEvent.click(screen.getByRole('button', { name: /click node/i }));

      expect(nodeClickSpy).toHaveBeenCalled();
    });

    it('should handle multiple clicks on body ui', async () => {
      const nodeClickSpy = jest.fn();
      await renderComponent({ organ: mockOrgan }, nodeClickSpy);

      const button = screen.getByRole('button', { name: /click node/i });
      fireEvent.click(button);
      fireEvent.click(button);

      expect(nodeClickSpy).toHaveBeenCalledTimes(2);
    });

    it('should toggle highlight when clicking same node twice', async () => {
      const nodeClickSpy = jest.fn();
      await renderComponent({ organ: mockOrgan }, nodeClickSpy);

      const button = screen.getByRole('button', { name: /click node/i });
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(nodeClickSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('filteredBlockIds', () => {
    it('should filter blocks by provider name', async () => {
      const filterWithProvider: Filter = { sex: FilterSexEnum.Female, tmc: ['Provider A'] } as Filter;
      await renderComponent({ filter: filterWithProvider, blocks: mockBlocks });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });

    it('should handle multiple matching providers', async () => {
      const filterWithMultipleProviders: Filter = {
        sex: FilterSexEnum.Female,
        tmc: ['Provider A', 'Provider B'],
      } as Filter;
      await renderComponent({ filter: filterWithMultipleProviders, blocks: mockBlocks });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });

    it('should handle undefined blocks gracefully', async () => {
      await renderComponent({ blocks: undefined as unknown as TissueBlock[] });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });

    it('should handle null filter tmc gracefully', async () => {
      const filterWithNullTmc: Filter = { sex: FilterSexEnum.Female, tmc: undefined } as unknown as Filter;
      await renderComponent({ filter: filterWithNullTmc });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });
  });

  describe('highlightedScene', () => {
    it('should compute scene with filter applied', async () => {
      const filterWithProvider: Filter = { sex: FilterSexEnum.Female, tmc: ['Provider A'] } as Filter;
      await renderComponent({ filter: filterWithProvider, blocks: mockBlocks, scene: mockSceneNodes });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });

    it('should handle scene nodes without entityId', async () => {
      const sceneWithoutEntityId: SpatialSceneNode[] = [
        { '@id': 'node1', '@type': 'SpatialSceneNode', color: [255, 255, 255, 255] } as SpatialSceneNode,
      ];
      await renderComponent({ scene: sceneWithoutEntityId });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });
  });

  describe('organTarget and organBounds', () => {
    it('should handle undefined organ', async () => {
      await renderComponent({ organ: undefined });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });

    it('should calculate values from organ dimensions', async () => {
      await renderComponent({ organ: mockOrgan });
      expect(screen.getByRole('button', { name: /click node/i })).toBeInTheDocument();
    });
  });
});
