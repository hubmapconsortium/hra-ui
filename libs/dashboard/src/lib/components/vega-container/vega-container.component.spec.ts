import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VegaContainerComponent } from './vega-container.component';

describe('VegaContainerComponent', () => {
  let component: VegaContainerComponent;
  let fixture: ComponentFixture<VegaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VegaContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VegaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
