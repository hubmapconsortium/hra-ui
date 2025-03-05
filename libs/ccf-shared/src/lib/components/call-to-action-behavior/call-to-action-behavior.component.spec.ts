import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { Shallow } from 'shallow-render';
import { CloseDialog, LearnMore } from '../../states/call-to-action/call-to-action.actions';
import { CallToActionState } from '../../states/call-to-action/call-to-action.state';
import { CallToActionBehaviorComponent } from './call-to-action-behavior.component';
import { CallToActionBehaviorModule } from './call-to-action-behavior.module';

describe('CallToActionBehaviorComponent', () => {
  let shallow: Shallow<CallToActionBehaviorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CallToActionState])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    shallow = new Shallow(CallToActionBehaviorComponent, CallToActionBehaviorModule).mock(MatDialog, {
      closeAll: () => undefined,
    });
  });

  it('should emit on call to action click', async () => {
    const { instance } = await shallow.render();
    expect(instance.learnMore()).toEqual(expect.any(LearnMore));
  });

  it('should emit on close click', async () => {
    const { instance } = await shallow.render();
    expect(instance.close()).toEqual(expect.any(CloseDialog));
  });
});
