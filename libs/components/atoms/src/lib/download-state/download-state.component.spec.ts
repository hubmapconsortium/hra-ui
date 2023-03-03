import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadStateComponent } from './download-state.component';

describe('DownloadStateComponent', () => {
  let component: DownloadStateComponent;
  let fixture: ComponentFixture<DownloadStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
