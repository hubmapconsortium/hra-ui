import { TestBed } from '@angular/core/testing';

import { AppModule } from './app-web-component.module';

describe('AppModule', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });
});
