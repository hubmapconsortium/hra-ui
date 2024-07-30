import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandmarkComponent } from './brandmark.component';

describe('BrandmarkComponent', () => {
  let component: BrandmarkComponent;
  let fixture: ComponentFixture<BrandmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandmarkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
