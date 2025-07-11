import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StateContext } from '@ngxs/store';
import { mock, MockProxy } from 'jest-mock-extended';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { of } from 'rxjs';
import { DocumentationContent, InfoButtonService } from '../../components/info/info-button/info-button.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CallToActionModel, CallToActionState } from './call-to-action.state';
import { TestBed } from '@angular/core/testing';

describe('CallToActionState', () => {
  const defaultState: CallToActionModel = {
    title: '',
    message: '',
    callToAction: '',
    imageUrl: '',
    expirationDate: 'December 22, 2000',
    popupShown: false,
  };

  let dialog: MockProxy<MatDialog>;
  let ga: MockProxy<GoogleAnalyticsService>;
  let storage: MockProxy<LocalStorageService>;
  let ctx: MockProxy<StateContext<CallToActionModel>>;
  let infoService: MockProxy<InfoButtonService>;
  let http: MockProxy<HttpClient>;
  let state: CallToActionState;

  beforeEach(() => {
    dialog = mock();
    ga = mock();
    storage = mock();
    ctx = mock();
    http = mock();
    infoService = mock();

    TestBed.configureTestingModule({
      providers: [
        CallToActionState,
        { provide: MatDialog, useValue: dialog },
        { provide: GoogleAnalyticsService, useValue: ga },
        { provide: LocalStorageService, useValue: storage },
        { provide: InfoButtonService, useValue: infoService },
        { provide: HttpClient, useValue: http },
      ],
    });

    state = TestBed.inject(CallToActionState);
  });

  beforeEach(() => {
    storage.getItem.mockReturnValue('');
    ctx.getState.mockReturnValue({ ...defaultState, expirationDate: 'December 22,3024' });
    http.get.mockReturnValue(of(''));
  });

  describe('ngxsOnInit(ctx)', () => {
    it('checks for ExpirationDate and succeeds', () => {
      const datePassed = CallToActionState.ctaDatePassed(ctx.getState().expirationDate);
      expect(datePassed).toBeFalsy();
    });
  });

  it('opens info dialog box', () => {
    state.learnMore().subscribe();
    expect(ga.event).toHaveBeenCalledWith('open_learn_more', 'call_to_action');
  });

  it('opens CTA dialog box', () => {
    state.open(ctx);
    expect(ga.event).toHaveBeenCalledWith('open', 'call_to_action');
  });

  it('closes dialog box', () => {
    state.close();
    expect(ga.event).toHaveBeenCalledWith('close', 'call_to_action');
  });

  it('checks for ExpirationDate and fails', () => {
    const datePassed = CallToActionState.ctaDatePassed(defaultState.expirationDate);
    expect(datePassed).toBeTruthy();
  });

  it('opens dialog box', () => {
    const markdownContent: DocumentationContent[] = [];
    state.launchLearnMore(markdownContent);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('shows popup on init', () => {
    state.ngxsOnInit(ctx);
    expect(ctx.dispatch).toHaveBeenCalled();
  });
});
