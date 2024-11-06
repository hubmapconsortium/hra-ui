import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViolinMenuComponent } from './violin-menu.component';

describe('ViolinMenuComponent', () => {
  let component: ViolinMenuComponent;
  let fixture: ComponentFixture<ViolinMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViolinMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViolinMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
