import { SourceReference } from '@hra-ui/services';
import { render, screen } from '@testing-library/angular';
import {
  FtuFullScreenService,
  FullscreenTab,
} from '../../../../behavioral/src/lib/ftu-fullscreen-service/ftu-fullscreen.service';
import { SourceListComponent } from './source-list.component';

describe('SourceListComponent', () => {
  const testItem = {
    title: 'test',
    doi: 'test',
    year: 2000,
    datasetTitle: 'test',
    datasetId: 'test',
    cellType: 'test',
    healthStatus: 'test',
    sex: 'test',
    age: 'test',
    bmi: 'test',
    ethnicity: 'test',
  } as SourceReference;
  const testSources = [testItem] as SourceReference[];

  it('should create', async () => {
    const { fixture } = await render(SourceListComponent, {
      inputs: {
        sources: testSources,
      },
    });

    expect(fixture.componentInstance).toBeDefined();
  });

  it('should initialize showTable to be true', async () => {
    const { fixture } = await render(SourceListComponent, {
      inputs: {
        sources: testSources,
      },
    });

    expect(fixture.componentInstance.showTable()).toBe(true);
  });

  it('should openFullscreen', async () => {
    const fullscreenMock = {
      fullscreentabIndex: { set: jest.fn() },
      isFullscreen: { set: jest.fn() },
    } as unknown as FtuFullScreenService;

    const { fixture } = await render(SourceListComponent, {
      inputs: {
        sources: testSources,
      },
      providers: [{ provide: FtuFullScreenService, useValue: fullscreenMock }],
    });

    fixture.componentInstance.openSourceListFullscreen();

    expect(fullscreenMock.fullscreentabIndex.set).toHaveBeenCalledWith(FullscreenTab.SourceList);
    expect(fullscreenMock.isFullscreen.set).toHaveBeenCalledWith(true);
  });

  it('should toggle showTable on toggleTable() method call', async () => {
    const { fixture } = await render(SourceListComponent, {
      inputs: {
        sources: testSources,
      },
    });

    const instance = fixture.componentInstance;
    expect(instance.showTable()).toBe(true);

    instance.toggleTable();
    expect(instance.showTable()).toBe(false);

    instance.toggleTable();
    expect(instance.showTable()).toBe(true);
  });

  it('should emit selectionChanged when onSelectionChange is called', async () => {
    const { fixture } = await render(SourceListComponent, {
      inputs: {
        sources: testSources,
      },
    });

    const instance = fixture.componentInstance;
    let emittedValue: SourceReference[] | undefined;

    instance.selectionChanged.subscribe((value: SourceReference[]) => {
      emittedValue = value;
    });

    instance.selection.clear();
    instance.selection.select(...testSources);

    instance.onSelectionChange();

    expect(instance.selectedCount()).toBe(1);
    expect(emittedValue).toEqual(testSources);
  });

  it('should toggle all rows with toggleAllRows()', async () => {
    const secondItem = {
      ...testItem,
      title: 'test-2',
      doi: 'test-2',
      datasetTitle: 'test-2',
      datasetId: 'test-2',
    } as SourceReference;
    const sources = [testItem, secondItem];

    const { fixture } = await render(SourceListComponent, {
      inputs: {
        sources,
      },
    });

    const instance = fixture.componentInstance;
    let emittedValue: SourceReference[] | undefined;
    instance.selectionChanged.subscribe((value: SourceReference[]) => {
      emittedValue = value;
    });

    expect(instance.isAllSelected()).toBe(true);

    instance.toggleAllRows();
    expect(instance.isAllSelected()).toBe(false);
    expect(instance.selectedCount()).toBe(0);
    expect(emittedValue).toEqual([]);

    instance.toggleAllRows();
    expect(instance.isAllSelected()).toBe(true);
    expect(instance.selectedCount()).toBe(2);
    expect(emittedValue).toEqual(sources);
  });

  it('should toggle a single row with toggleRow()', async () => {
    const { fixture } = await render(SourceListComponent, {
      inputs: {
        sources: testSources,
      },
    });

    const instance = fixture.componentInstance;
    let emittedValue: SourceReference[] | undefined;
    instance.selectionChanged.subscribe((value: SourceReference[]) => {
      emittedValue = value;
    });

    instance.toggleRow(testItem);
    expect(instance.selection.isSelected(testItem)).toBe(false);
    expect(instance.selectedCount()).toBe(0);
    expect(emittedValue).toEqual([]);

    instance.toggleRow(testItem);
    expect(instance.selection.isSelected(testItem)).toBe(true);
    expect(instance.selectedCount()).toBe(1);
    expect(emittedValue).toEqual([testItem]);
  });

  it('should display table columns correctly', async () => {
    await render(SourceListComponent, {
      inputs: {
        sources: testSources,
      },
    });

    expect(screen.getAllByText('Title').length).toBeGreaterThan(0);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('DOI')).toBeInTheDocument();
    expect(screen.getByText('Publications')).toBeInTheDocument();
  });

  it('should display SourceListItem data correctly in the table', async () => {
    const testSourceItem: SourceReference = {
      title: 'Test Research Paper',
      doi: '10.1000/test.doi',
      year: 2023,
      datasetTitle: 'Test Dataset',
      datasetId: '10.1000/testdataset.doi',
      cellType: 'test',
      healthStatus: 'test',
      sex: 'Male',
      age: '30',
      bmi: '100',
      ethnicity: 'test',
    };

    await render(SourceListComponent, {
      inputs: {
        sources: [testSourceItem],
      },
    });

    expect(
      screen.getByText((content) => {
        return content.includes('Test Research Paper');
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) => {
        return content.includes('10.1000/test.doi');
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('2023')).toBeInTheDocument();
  });
});
