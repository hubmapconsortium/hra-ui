import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigSelectorComponent } from './config-selector.component';

describe('ConfigSelectorComponent', () => {
  let component: ConfigSelectorComponent;
  let fixture: ComponentFixture<ConfigSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
