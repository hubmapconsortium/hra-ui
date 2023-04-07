import { TestBed } from '@angular/core/testing';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { SendMessage } from '../contact/contact.actions';
import { StateAnalyticsPluginService } from './state-analytics-plugin.service';
import { NgxsNextPluginFn } from '@ngxs/store';

describe('StateAnalyticsPluginService', () => {
  let service: StateAnalyticsPluginService;
  let gaSpy: GoogleAnalyticsService;
  let nextSpy: NgxsNextPluginFn;
  const state = { property: 'value' };
  const action = { type: 'TestAction', payload: 'TestPayload' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateAnalyticsPluginService);
    gaSpy = TestBed.inject(GoogleAnalyticsService);
    nextSpy = jest.fn().mockReturnValue({ state, action });
    jest.spyOn(gaSpy, 'event').mockReturnValue();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call logaction on handle trigger', () => {
    const contactMsg = { email: 'test@test.com', subject: 'test', message: 'test' };
    const action = new SendMessage(contactMsg);
    service.handle({}, action, nextSpy);
    expect(gaSpy.event).toHaveBeenCalledWith(SendMessage.type, 'action_log', '{}');
  });

  it('should call logaction on handle trigger with primative action type', () => {
    const primativeAction = new Object({ primativeKey: 'primativeAction', type: SendMessage.type });
    service.handle({}, primativeAction, nextSpy);
    expect(gaSpy.event).toHaveBeenCalledWith(SendMessage.type, 'action_log', '{"primativeKey":"primativeAction"}');
  });

  it('should call logaction on handle trigger with primative array action type', () => {
    const arrayAction = new Object({ arrayKey: ['arrayAction'], type: SendMessage.type });
    service.handle({}, arrayAction, nextSpy);
    expect(gaSpy.event).toHaveBeenCalledWith(SendMessage.type, 'action_log', '{"arrayKey":["arrayAction"]}');
  });

  it('should call logaction on handle trigger with not primative action type', () => {
    const notPrimativeAction = new Object({ arrayKey: new Object(), type: SendMessage.type });
    service.handle({}, notPrimativeAction, nextSpy);
    expect(gaSpy.event).toHaveBeenCalledWith(SendMessage.type, 'action_log', '{}');
  });

  it('should call logaction on handle trigger with undefined type', () => {
    const noTypeAction = new Object();
    service.handle({}, noTypeAction, nextSpy);
  });

  it('should call logaction on handle trigger with undefined category', () => {
    const testTypeAction = new Object({ type: 'TEST ACTION' });
    service.handle({}, testTypeAction, nextSpy);
  });
});
