import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmapFaqComponent } from './omap-faq.component';

describe('OmapFaqComponent', () => {
  let component: OmapFaqComponent;
  let fixture: ComponentFixture<OmapFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmapFaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmapFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
