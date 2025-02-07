import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmbeddedRuiComponent } from './embedded-rui.component';

describe('EmbeddedRuiComponent', () => {
  let component: EmbeddedRuiComponent;
  let fixture: ComponentFixture<EmbeddedRuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbeddedRuiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmbeddedRuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
