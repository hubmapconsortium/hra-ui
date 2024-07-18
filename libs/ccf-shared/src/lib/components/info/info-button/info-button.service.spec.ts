import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InfoButtonService } from './info-button.service';

describe('InfoButtonService', () => {
  let service: InfoButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoButtonService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    }).compileComponents();

    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(of('# About'));
    service = TestBed.inject(InfoButtonService);
  });

  it('should test parse markdown function', () => {
    const testData = '# About';
    expect(service.parseMarkdown(testData)).toEqual([{ title: 'About', content: '' }]);
  });

  it('updateData function should call parseMarkdown function', async () => {
    const spy = spyOn(service, 'parseMarkdown');
    service.updateData('url', 'id', 'title');
    expect(spy).toHaveBeenCalled();
  });

  it('updateData function should emit data to the panelContent behavior subject', async () => {
    const spy = spyOn(service.panelContent, 'next');
    service.updateData('url', 'id', 'title');
    expect(spy).toHaveBeenCalled();
  });
});
