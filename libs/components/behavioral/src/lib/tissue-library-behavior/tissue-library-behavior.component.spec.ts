import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TissueLibraryBehaviorComponent } from './tissue-library-behavior.component';

describe('TissueLibraryBehaviorComponent', () => {
  let component: TissueLibraryBehaviorComponent;
  let fixture: ComponentFixture<TissueLibraryBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TissueLibraryBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TissueLibraryBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
