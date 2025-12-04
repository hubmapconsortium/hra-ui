import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { View } from 'vega';
import {
  DiscrepencyId,
  DiscrepencyLabel,
  DoSearch,
  DuplicateId,
  UpdateBimodal,
  UpdateBimodalConfig,
  UpdateBottomSheetData,
  UpdateLinksData,
  UpdateOmapConfig,
  UpdateVegaSpec,
  UpdateVegaView,
} from '../actions/tree.actions';
import { BMNode, Link } from '../models/bimodal.model';
import { TreeState, TreeStateModel } from './tree.state';

describe('TreeState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TreeState])],
    });

    store = TestBed.inject(Store);
    store.reset({
      treeState: {
        spec: {},
        treeData: [],
        view: {} as View,
        width: 0,
        height: 800,
        bimodal: {
          nodes: [],
          links: [],
          config: {
            BM: { sort: 'Alphabetically', size: 'None', type: 'All' },
            CT: { sort: 'Alphabetically', size: 'None' },
          },
        },
        search: [],
        lastSearch: { id: 0, name: '', groupName: '', x: 0, y: 0 },
        bottomSheetData: {},
        links: {
          AS_CT: 0,
          CT_B: 0,
          AS_AS: 0,
          AS_CT_organWise: {},
          CT_B_organWise: {},
          AS_AS_organWise: {},
        },
        discrepencyLabel: [],
        discrepencyId: [],
        duplicateId: [],
        omapConfig: { organsOnly: false, proteinsOnly: false },
      },
    });
  });

  it('should handle UpdateBimodal, UpdateVegaView, UpdateVegaSpec, UpdateBimodalConfig actions', () => {
    // UpdateBimodal
    const nodes = [{ id: 1, name: 'Node1' }] as unknown as BMNode[];
    const links = [{ source: 1, target: 2 }] as unknown as Link[];
    store.dispatch(new UpdateBimodal(nodes, links));
    const state = store.selectSnapshot(TreeState.getBimodal);
    expect(state.nodes).toEqual(nodes);
    expect(state.links).toEqual(links);

    // UpdateVegaView
    const view = { data: jest.fn().mockReturnValue([{ id: 1 }]), _viewWidth: 1000 } as unknown as View;
    store.dispatch(new UpdateVegaView(view));
    const fullState = store.selectSnapshot((s: { treeState: TreeStateModel }) => s.treeState);
    expect(fullState.view).toEqual(view);
    expect(fullState.treeData).toEqual([{ id: 1 }]);
    expect(fullState.width).toBe(1000);
    expect(store.selectSnapshot(TreeState.getTreeData)).toEqual([{ id: 1 }]);
    expect(store.selectSnapshot(TreeState.getVegaView)).toEqual(view);

    // UpdateVegaSpec
    const spec = { mark: 'circle' };
    store.dispatch(new UpdateVegaSpec(spec));
    expect(store.selectSnapshot(TreeState.getVegaSpec)).toEqual(spec);

    // UpdateBimodalConfig
    const config = { BM: { sort: 'Size', size: 'Degree', type: 'Gene' }, CT: { sort: 'Size', size: 'Degree' } };
    store.dispatch(new UpdateBimodalConfig(config));
    expect(store.selectSnapshot(TreeState.getBimodalConfig)).toEqual(config);
    expect(store.selectSnapshot(TreeState.getBiomarkerType)).toBe('Gene');
  });

  it('should handle UpdateOmapConfig, DoSearch, DiscrepencyLabel, DiscrepencyId, DuplicateId, UpdateBottomSheetData actions', () => {
    // UpdateOmapConfig
    store.dispatch(new UpdateOmapConfig({ organsOnly: true, proteinsOnly: true }));
    expect(store.selectSnapshot(TreeState.getOmapConfig)).toEqual({ organsOnly: true, proteinsOnly: true });

    // DoSearch
    const searchStructures = [{ id: 1, name: 'S1', groupName: 'G1', x: 10, y: 20 }];
    const lastSearch = { id: 1, name: 'S1', groupName: 'G1', x: 10, y: 20 };
    store.dispatch(new DoSearch(searchStructures, lastSearch));
    expect(store.selectSnapshot(TreeState.getLatestSearchStructure)).toEqual(lastSearch);

    // DiscrepencyLabel
    const discrepencies = [{ id: 1, name: 'D1', groupName: 'G1', x: 10, y: 20, ontologyId: 'O1' }];
    store.dispatch(new DiscrepencyLabel(discrepencies));
    let state = store.selectSnapshot((s: { treeState: TreeStateModel }) => s.treeState);
    expect(state.discrepencyLabel).toEqual(discrepencies);

    // DiscrepencyId
    store.dispatch(new DiscrepencyId(discrepencies));
    state = store.selectSnapshot((s: { treeState: TreeStateModel }) => s.treeState);
    expect(state.discrepencyId).toEqual(discrepencies);

    // DuplicateId
    store.dispatch(new DuplicateId(discrepencies));
    state = store.selectSnapshot((s: { treeState: TreeStateModel }) => s.treeState);
    expect(state.duplicateId).toEqual(discrepencies);

    // UpdateBottomSheetData
    const data = { info: 'test' };
    store.dispatch(new UpdateBottomSheetData(data));
    expect(store.selectSnapshot(TreeState.getBottomSheetData)).toEqual(data);
  });

  it('should handle UpdateLinksData with AS_AS branch', () => {
    store.dispatch(new UpdateLinksData(0, 0, {}, {}, 10));
    const links = store.selectSnapshot(TreeState.getLinksData);
    expect(links.AS_AS).toBe(10);
  });

  it('should handle UpdateLinksData with AS_AS_organWise branch', () => {
    store.dispatch(new UpdateLinksData(0, 0, {}, {}, undefined, { heart: 5 }));
    const links = store.selectSnapshot(TreeState.getLinksData);
    expect(links.AS_AS_organWise).toEqual({ heart: 5 });
  });

  it('should handle UpdateLinksData with default branch and allOrgans flag', () => {
    // First set some initial values
    store.dispatch(new UpdateLinksData(100, 200, { kidney: 10 }, { kidney: 20 }));
    let links = store.selectSnapshot(TreeState.getLinksData);
    expect(links.AS_CT).toBe(100);
    expect(links.CT_B).toBe(200);
    expect(links.AS_CT_organWise).toEqual({ kidney: 10 });
    expect(links.CT_B_organWise).toEqual({ kidney: 20 });

    // Test with allOrgans=true (should preserve AS_CT and CT_B)
    store.dispatch(new UpdateLinksData(0, 0, { heart: 15 }, { heart: 25 }, undefined, undefined, true));
    links = store.selectSnapshot(TreeState.getLinksData);
    expect(links.AS_CT).toBe(100); // preserved
    expect(links.CT_B).toBe(200); // preserved
    expect(links.AS_CT_organWise).toEqual({ kidney: 10, heart: 15 });
    expect(links.CT_B_organWise).toEqual({ kidney: 20, heart: 25 });
  });
});
