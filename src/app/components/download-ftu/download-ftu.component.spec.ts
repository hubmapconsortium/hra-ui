import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFtuComponent } from './download-ftu.component';

describe('DownloadFtuComponent', () => {
  let component: DownloadFtuComponent;
  let fixture: ComponentFixture<DownloadFtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadFtuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadFtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
