import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';

import { StartSpatialSearchFlow } from '../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchConfigBehaviorComponent } from '../../modules/spatial-search/spatial-search-config-behavior/spatial-search-config-behavior.component';
import { SpatialSearchFlowService } from './spatial-search-flow.service';

describe('SpatialSearchFlowService', () => {
  const dispatch = jest.fn().mockReturnValue(of(undefined));
  const open = jest.fn();

  @Component({ selector: 'ccf-host', template: '' })
  class HostComponent {
    readonly svc = inject(SpatialSearchFlowService);
    call(executeSearch: boolean) {
      this.svc.startSpatialSearchFlow(executeSearch);
    }
  }

  async function setup() {
    return render(HostComponent, {
      providers: [
        SpatialSearchFlowService,
        { provide: Store, useValue: { dispatch } },
        { provide: MatDialog, useValue: { open } },
      ],
    });
  }

  beforeEach(() => {
    dispatch.mockClear();
    open.mockClear();
  });

  it('dispatches start flow and opens the config dialog', async () => {
    const { fixture } = await setup();

    fixture.componentInstance.call(true);

    expect(dispatch).toHaveBeenCalledWith(new StartSpatialSearchFlow(true));
    expect(open).toHaveBeenCalledWith(SpatialSearchConfigBehaviorComponent, {
      panelClass: 'spatial-search-config',
    });
  });
});
