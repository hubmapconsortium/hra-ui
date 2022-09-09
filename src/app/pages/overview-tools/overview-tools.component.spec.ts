import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewToolsComponent } from './overview-tools.component';

describe('OverviewToolsComponent', () => {
  let component: OverviewToolsComponent;
  let fixture: ComponentFixture<OverviewToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
