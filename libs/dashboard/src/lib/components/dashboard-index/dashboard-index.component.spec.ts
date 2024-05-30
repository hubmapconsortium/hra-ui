import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardIndexComponent } from './dashboard-index.component';

describe('DashboardIndexComponent', () => {
  let component: DashboardIndexComponent;
  let fixture: ComponentFixture<DashboardIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
