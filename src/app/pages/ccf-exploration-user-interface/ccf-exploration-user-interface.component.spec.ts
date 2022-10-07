import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfExplorationUserInterfaceComponent } from './ccf-exploration-user-interface.component';

describe('CcfExplorationUserInterfaceComponent', () => {
  let component: CcfExplorationUserInterfaceComponent;
  let fixture: ComponentFixture<CcfExplorationUserInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcfExplorationUserInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcfExplorationUserInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
