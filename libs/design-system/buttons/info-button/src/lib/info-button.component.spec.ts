import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoButtonComponent } from './info-button.component';

describe('InfoButtonComponent', () => {
  let component: InfoButtonComponent;
  let fixture: ComponentFixture<InfoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
