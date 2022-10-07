import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueInfoPageComponent } from './tissue-info-page.component';

describe('TissueInfoPageComponent', () => {
  let component: TissueInfoPageComponent;
  let fixture: ComponentFixture<TissueInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TissueInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TissueInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
