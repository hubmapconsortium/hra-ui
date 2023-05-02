import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVersionComponent } from './table-version.component';

describe('TableVersionComponent', () => {
  let component: TableVersionComponent;
  let fixture: ComponentFixture<TableVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
