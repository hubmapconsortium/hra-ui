import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcfOrganVrGalleryComponent } from './ccf-organ-vr-gallery.component';

describe('CcfOrganVrGalleryComponent', () => {
  let component: CcfOrganVrGalleryComponent;
  let fixture: ComponentFixture<CcfOrganVrGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcfOrganVrGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcfOrganVrGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
