import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';
import { of } from 'rxjs/internal/observable/of';
import { Shallow } from 'shallow-render';
import { SpatialSearchUiState } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { SpatialSearchUiBehaviorComponent } from './spatial-search-ui-behavior.component';
import { SpatialSearchUiBehaviorModule } from './spatial-search-ui-behavior.module';

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

describe('SpatialSearchUiBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchUiBehaviorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SpatialSearchUiState], {})],
    });

    shallow = new Shallow(SpatialSearchUiBehaviorComponent, SpatialSearchUiBehaviorModule)
      .mock(MatDialogRef, {
        close(): void {
          /* Empty */
        },
      })
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
});
