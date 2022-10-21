import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaggleTwoComponent } from './kaggle-two.component';

describe('KaggleTwoComponent', () => {
  let component: KaggleTwoComponent;
  let fixture: ComponentFixture<KaggleTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaggleTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KaggleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
