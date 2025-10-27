import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentButtonGridComponent } from './content-button-grid.component';

describe('ContentButtonGridComponent', () => {
  let component: ContentButtonGridComponent;
  let fixture: ComponentFixture<ContentButtonGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentButtonGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentButtonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
