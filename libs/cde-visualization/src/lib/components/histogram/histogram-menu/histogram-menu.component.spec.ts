import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistogramMenuComponent } from './histogram-menu.component';

describe('HistogramMenuComponent', () => {
  let component: HistogramMenuComponent;
  let fixture: ComponentFixture<HistogramMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistogramMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistogramMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
