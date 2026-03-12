import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveRedirectPageComponent } from './archive-redirect-page.component';

describe('ArchiveRedirectPageComponent', () => {
  let component: ArchiveRedirectPageComponent;
  let fixture: ComponentFixture<ArchiveRedirectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveRedirectPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveRedirectPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
