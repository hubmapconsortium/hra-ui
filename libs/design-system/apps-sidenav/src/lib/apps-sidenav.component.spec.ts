import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppsSidenavComponent } from './apps-sidenav.component';

describe('AppsSidenavComponent', () => {
  let component: AppsSidenavComponent;
  let fixture: ComponentFixture<AppsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
