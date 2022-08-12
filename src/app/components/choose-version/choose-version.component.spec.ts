import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVersionComponent } from './choose-version.component';

describe('ChooseVersionComponent', () => {
  let component: ChooseVersionComponent;
  let fixture: ComponentFixture<ChooseVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
