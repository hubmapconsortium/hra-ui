import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonLongComponent } from './card-button-long.component';

describe('CardButtonLongComponent', () => {
  let component: CardButtonLongComponent;
  let fixture: ComponentFixture<CardButtonLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardButtonLongComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardButtonLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
