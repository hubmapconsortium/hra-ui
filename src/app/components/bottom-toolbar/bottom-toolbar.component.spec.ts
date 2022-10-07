import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomToolbarComponent } from './bottom-toolbar.component';

describe('BottomToolbarComponent', () => {
  let component: BottomToolbarComponent;
  let fixture: ComponentFixture<BottomToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomToolbarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BottomToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
