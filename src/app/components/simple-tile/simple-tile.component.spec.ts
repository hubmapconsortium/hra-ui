import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTileComponent } from './simple-tile.component';

describe('SimpleTileComponent', () => {
  let component: SimpleTileComponent;
  let fixture: ComponentFixture<SimpleTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
