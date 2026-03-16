import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveRedirectComponent } from './archive-redirect.component';

describe('ArchiveRedirectComponent', () => {
  let component: ArchiveRedirectComponent;
  let fixture: ComponentFixture<ArchiveRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveRedirectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveRedirectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
