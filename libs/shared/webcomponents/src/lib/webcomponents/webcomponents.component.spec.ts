import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebcomponentsComponent } from './webcomponents.component';

describe('WebcomponentsComponent', () => {
  let component: WebcomponentsComponent;
  let fixture: ComponentFixture<WebcomponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebcomponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebcomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
