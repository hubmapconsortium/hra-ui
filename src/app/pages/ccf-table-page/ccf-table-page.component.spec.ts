import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfTablePageComponent } from './ccf-table-page.component';

describe('CcfTablePageComponent', () => {
  let component: CcfTablePageComponent;
  let fixture: ComponentFixture<CcfTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcfTablePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcfTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
