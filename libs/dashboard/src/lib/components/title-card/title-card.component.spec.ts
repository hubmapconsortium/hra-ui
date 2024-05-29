import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleCardComponent } from './title-card.component';

describe('TitleCardComponent', () => {
  let component: TitleCardComponent;
  let fixture: ComponentFixture<TitleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
