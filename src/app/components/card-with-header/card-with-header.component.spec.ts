import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithHeaderComponent } from './card-with-header.component';

describe('CardWithHeaderComponent', () => {
  let component: CardWithHeaderComponent;
  let fixture: ComponentFixture<CardWithHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardWithHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWithHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
