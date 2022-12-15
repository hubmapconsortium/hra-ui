import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementCardComponent } from './announcement-card.component';

describe('AnnouncementCardComponent', () => {
  let component: AnnouncementCardComponent;
  let fixture: ComponentFixture<AnnouncementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
