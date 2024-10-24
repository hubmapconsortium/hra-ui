import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FullscreenPortalComponent } from './fullscreen-portal.component';

describe('FullscreenComponent', () => {
  let component: FullscreenPortalComponent;
  let fixture: ComponentFixture<FullscreenPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullscreenPortalComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FullscreenPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
