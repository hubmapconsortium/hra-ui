import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubmapNavComponent } from './hubmap-nav.component';

describe('HubmapNavComponent', () => {
  let component: HubmapNavComponent;
  let fixture: ComponentFixture<HubmapNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubmapNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HubmapNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
