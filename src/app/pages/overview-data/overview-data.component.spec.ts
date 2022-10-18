import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewDataComponent } from './overview-data.component';

describe('OverviewDataComponent', () => {
  let component: OverviewDataComponent;
  let fixture: ComponentFixture<OverviewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
