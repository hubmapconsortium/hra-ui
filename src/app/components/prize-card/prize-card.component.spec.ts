import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeCardComponent } from './prize-card.component';

describe('PrizeCardComponent', () => {
  let component: PrizeCardComponent;
  let fixture: ComponentFixture<PrizeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
