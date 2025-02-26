import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayIframeComponent } from './overlay-iframe.component';

describe('OverlayIframeComponent', () => {
  let component: OverlayIframeComponent;
  let fixture: ComponentFixture<OverlayIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverlayIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
