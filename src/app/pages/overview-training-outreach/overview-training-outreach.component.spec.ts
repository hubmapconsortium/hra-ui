import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTrainingOutreachComponent } from './overview-training-outreach.component';

describe('OverviewTrainingOutreachComponent', () => {
  let component: OverviewTrainingOutreachComponent;
  let fixture: ComponentFixture<OverviewTrainingOutreachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewTrainingOutreachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewTrainingOutreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
