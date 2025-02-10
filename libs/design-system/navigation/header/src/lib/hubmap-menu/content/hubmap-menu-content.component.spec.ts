import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubmapMenuContentComponent } from './hubmap-menu-content.component';

describe('HubmapMenuContentComponent', () => {
  let component: HubmapMenuContentComponent;
  let fixture: ComponentFixture<HubmapMenuContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubmapMenuContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HubmapMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
