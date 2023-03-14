import { ComponentFixture, TestBed } from '@angular/core/testing';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';

import { HeaderBehaviorComponent } from './header-behavior.component';

jest.mock('@hra-ui/cdk/injectors');

describe('HeaderBehaviorComponent', () => {
  let component: HeaderBehaviorComponent;
  let fixture: ComponentFixture<HeaderBehaviorComponent>;

  jest.mocked(selectQuerySnapshot).mockReturnValue(jest.fn());
  jest.mocked(dispatch).mockReturnValue(jest.fn());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBehaviorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
