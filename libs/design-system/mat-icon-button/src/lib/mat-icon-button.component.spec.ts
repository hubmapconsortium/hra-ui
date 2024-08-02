import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconButtonComponent } from './mat-icon-button.component';

describe('MatIconButtonComponent', () => {
  let component: MatIconButtonComponent;
  let fixture: ComponentFixture<MatIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
