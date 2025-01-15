import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebComponentCardComponent } from './web-component-card.component';

describe('WebComponentCardComponent', () => {
  let component: WebComponentCardComponent;
  let fixture: ComponentFixture<WebComponentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebComponentCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebComponentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
