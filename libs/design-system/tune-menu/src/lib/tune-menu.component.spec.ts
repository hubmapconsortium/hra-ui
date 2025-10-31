import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TuneMenuComponent } from './tune-menu.component';

describe('TuneMenuComponent', () => {
  let component: TuneMenuComponent;
  let fixture: ComponentFixture<TuneMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuneMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TuneMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
