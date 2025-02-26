import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmbedSidenavContentComponent } from './embed-sidenav-content.component';

describe('EmbedSidenavContentComponent', () => {
  let component: EmbedSidenavContentComponent;
  let fixture: ComponentFixture<EmbedSidenavContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbedSidenavContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmbedSidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
