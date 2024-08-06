import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortHeaderComponent } from './mat-sort-header.component';

describe('MatSortHeaderComponent', () => {
  let component: MatSortHeaderComponent;
  let fixture: ComponentFixture<MatSortHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSortHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatSortHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
