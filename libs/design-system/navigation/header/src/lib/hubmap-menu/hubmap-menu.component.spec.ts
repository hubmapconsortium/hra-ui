import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubmapMenuComponent } from './hubmap-menu.component';

describe('HubmapMenuComponent', () => {
  let component: HubmapMenuComponent;
  let fixture: ComponentFixture<HubmapMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubmapMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HubmapMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
