import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryViewPageComponent } from './gallery-view-page.component';

describe('GalleryViewPageComponent', () => {
  let component: GalleryViewPageComponent;
  let fixture: ComponentFixture<GalleryViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryViewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
