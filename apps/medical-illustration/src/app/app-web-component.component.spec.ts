import { TestBed } from '@angular/core/testing';
import { AppWebComponent } from './app-web-component.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [AppWebComponent] }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppWebComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
