import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthReleaseNotesComponent } from './fifth-release-notes.component';

describe('FifthReleaseNotesComponent', () => {
  let component: FifthReleaseNotesComponent;
  let fixture: ComponentFixture<FifthReleaseNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifthReleaseNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthReleaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
