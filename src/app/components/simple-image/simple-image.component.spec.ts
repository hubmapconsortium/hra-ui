import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleImageComponent } from './simple-image.component';

describe('SimpleImageComponent', () => {
  let component: SimpleImageComponent;
  let fixture: ComponentFixture<SimpleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
