import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganSelectComponent } from './organ-select.component';

describe('OrganSelectComponent', () => {
  let component: OrganSelectComponent;
  let fixture: ComponentFixture<OrganSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
