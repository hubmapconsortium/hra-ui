import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopLinksComponent } from './sop-links.component';

describe('SopLinksComponent', () => {
  let component: SopLinksComponent;
  let fixture: ComponentFixture<SopLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SopLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SopLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
