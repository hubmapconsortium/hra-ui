import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraEditorialBoardComponent } from './hra-editorial-board.component';

describe('HraEditorialBoardComponent', () => {
  let component: HraEditorialBoardComponent;
  let fixture: ComponentFixture<HraEditorialBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HraEditorialBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HraEditorialBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
