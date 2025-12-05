import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryViewComponent } from './gallery-view.component';

describe('GalleryViewComponent', () => {
  let component: GalleryViewComponent;
  let fixture: ComponentFixture<GalleryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
