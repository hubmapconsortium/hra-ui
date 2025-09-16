import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';

import { UIStateModel } from '../../store/ui.state';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent, NgxsModule.forRoot([])],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: 'Initial message' }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;

    // Mock the @Select decorator properly
    Object.defineProperty(component, 'loadingText$', {
      value: of({ loadingText: 'Loading...' } as UIStateModel),
      writable: false,
    });
  });

  it('should create and display loading content', () => {
    expect(component).toBeTruthy();

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.h5').textContent).toBe('Please wait...');
    expect(compiled.querySelector('hra-progress-spinner')).toBeTruthy();
  });
});
