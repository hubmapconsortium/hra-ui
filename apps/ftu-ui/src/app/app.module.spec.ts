import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = TestBed.inject(Injector);
  });

  it('should define custom element for FtuWebComponent', () => {
    const appModule = new AppModule(injector);
    appModule.ngDoBootstrap();

    const element = customElements.get('hra-ftu-ui');
    expect(element).toBeTruthy();
  });
});
