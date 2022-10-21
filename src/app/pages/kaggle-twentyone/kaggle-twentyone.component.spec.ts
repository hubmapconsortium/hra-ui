import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaggleTwentyoneComponent } from './kaggle-twentyone.component';

describe('KaggleTwentyoneComponent', () => {
  let component: KaggleTwentyoneComponent;
  let fixture: ComponentFixture<KaggleTwentyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaggleTwentyoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KaggleTwentyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
