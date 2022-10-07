import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueInfoTableComponent } from './tissue-info-table.component';

describe('TissueInfoComponent', () => {
  let component: TissueInfoTableComponent;
  let fixture: ComponentFixture<TissueInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TissueInfoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TissueInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
