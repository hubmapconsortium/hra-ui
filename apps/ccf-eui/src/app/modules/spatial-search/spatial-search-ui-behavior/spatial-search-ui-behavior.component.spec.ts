import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';
import { of } from 'rxjs/internal/observable/of';
import { Shallow } from 'shallow-render';
import { GenerateSpatialSearch } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiState } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { SpatialSearchConfigBehaviorComponent } from '../spatial-search-config-behavior/spatial-search-config-behavior.component';
import { SpatialSearchUiBehaviorComponent } from './spatial-search-ui-behavior.component';

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

describe('SpatialSearchUiBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchUiBehaviorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SpatialSearchUiState], {}), NgxsDispatchPluginModule.forRoot()],
    });

    shallow = new Shallow(SpatialSearchUiBehaviorComponent)
      .mock(MatDialogRef, {
        close: jest.fn(),
      })
      .mock(MatDialog, { open: jest.fn() })
      .mock(Store, { dispatch: jest.fn(), select: jest.fn().mockReturnValue(of()) })
      .mock(GlobalConfigState, { getOption: () => of(undefined) })
      .mock(SpatialSearchUiState, {});
  });

  it('should close the dialog when the close() method is called', async () => {
    const { instance, inject } = await shallow.render();
    const ref = inject(MatDialogRef);
    instance.close();
    await wait(250);
    expect(ref.close).toHaveBeenCalled();
  });

  it('should close and return action when addSpatialSearch() is called', async () => {
    const { instance, inject } = await shallow.render();
    const ref = inject(MatDialogRef);

    const action = instance.addSpatialSearch();

    expect(ref.close).toHaveBeenCalled();
    expect(action).toBeInstanceOf(GenerateSpatialSearch);
  });

  it('should close and open config when openSpatialSearchConfig() is called', async () => {
    const { instance, inject } = await shallow.render();
    const ref = inject(MatDialogRef);
    const dialog = inject(MatDialog);

    instance.openSpatialSearchConfig();

    expect(ref.close).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledWith(SpatialSearchConfigBehaviorComponent);
  });
});
