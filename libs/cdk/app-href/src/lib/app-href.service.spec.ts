import { TestBed } from '@angular/core/testing';
import { AppHrefService } from './app-href.service';
import { getCurrentScriptBasePath } from './current-script';

jest.mock('./current-script.ts');

describe('AppHrefService', () => {
  const initialAppHref = 'https://example.com/';
  let service: AppHrefService;

  beforeEach(() => {
    jest.mocked(getCurrentScriptBasePath).mockReturnValue(initialAppHref);
    service = TestBed.inject(AppHrefService);
  });

  it('returns the initial appHref', () => {
    expect(service.appHref()).toEqual(initialAppHref);
  });

  it('can update the appHref', () => {
    const newAppHref = 'https://test.com/';
    service.setAppHref(newAppHref);
    expect(service.appHref()).toEqual(newAppHref);
    service.resetAppHref();
    expect(service.appHref()).toEqual(initialAppHref);
  });
});
