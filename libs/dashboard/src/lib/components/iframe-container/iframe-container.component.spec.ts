import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IframeContainerComponent } from './iframe-container.component';

describe('IframeContainerComponent', () => {
  let component: IframeContainerComponent;
  let fixture: ComponentFixture<IframeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IframeContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IframeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
