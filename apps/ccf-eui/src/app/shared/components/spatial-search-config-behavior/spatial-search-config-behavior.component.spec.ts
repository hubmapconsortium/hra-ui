import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';
import { of } from 'rxjs/internal/observable/of';
import { Shallow } from 'shallow-render';
import { SceneState } from '../../../core/store/scene/scene.state';
import { SpatialSearchUiState } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { SpatialSearchConfigBehaviorComponent } from './spatial-search-config-behavior.component';
import { SpatialSearchConfigBehaviorModule } from './spatial-search-config-behavior.module';
import { mock } from 'jest-mock-extended';

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

describe('SpatialSearchConfigBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchConfigBehaviorComponent>;
  const http = mock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SpatialSearchUiState])],
    });

    shallow = new Shallow(SpatialSearchConfigBehaviorComponent, SpatialSearchConfigBehaviorModule)
      .mock(MatDialogRef, {
        close(): void {
          /* Empty */
        },
      })
      .mock(SceneState, { referenceOrgans$: of([]) })
      .mock(HttpClient, http)
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
