import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { RunSpatialSearchComponent } from './run-spatial-search.component';

describe('RunSpatialSearchComponent', () => {
  let shallow: Shallow<RunSpatialSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([], {})],
    });

    shallow = new Shallow(RunSpatialSearchComponent).provide({
      provide: MatDialog,
      useValue: jasmine.createSpyObj<MatDialog>(['open']),
    });
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
