import { render, screen } from '@testing-library/angular';
import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { SourceListComponent, SourceListItem } from './source-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import '@testing-library/jest-dom';

describe('SourceListComponent', () => {
  let shallow: Shallow<SourceListComponent>;
  const testItem = {
    link: 'test',
    authors: ['test'],
    year: 2000,
    title: 'test',
    doi: 'test',
    label: 'test',
  } as SourceListItem;
  const testSources = [testItem] as SourceListItem[];
  beforeEach(() => {
    shallow = new Shallow(SourceListComponent).dontMock(MatTableModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should initialize showTable to be true', async () => {
    const { instance } = await shallow.render();
    expect(instance.showTable).toBe(true);
  });

  it('should toggle showTable on toggleTable() method call', async () => {
    const { instance } = await shallow.render();
    instance.toggleTable();
    expect(instance.showTable).toBe(false);
    instance.toggleTable();
    expect(instance.showTable).toBe(true);
  });

  it('should emit selectionChanged when onSelectionChange is called', async () => {
    const { instance } = await shallow.render({ bind: { sources: testSources } });
    let emittedValue: SourceListItem[] | undefined;

    instance.selectionChanged.subscribe((value: SourceListItem[]) => {
      emittedValue = value;
    });

    instance.sourceTable = {
      selection: {
        selected: testSources,
      },
    } as any;

    instance.onSelectionChange();

    expect(instance.selectedCount).toBe(1);
    expect(emittedValue).toEqual(testSources);
  });

  it('should display table columns correctly', async () => {
    await render(SourceListComponent, {
      componentInputs: {
        sources: testSources,
      },
      imports: [MatTableModule, HttpClientTestingModule],
      providers: [
        {
          provide: GoogleAnalyticsService,
          useValue: {
            event: () => {},
          },
        },
      ],
    });

    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Paper Title')).toBeInTheDocument();
    expect(screen.getByText('Paper DOI')).toBeInTheDocument();
  });
});
