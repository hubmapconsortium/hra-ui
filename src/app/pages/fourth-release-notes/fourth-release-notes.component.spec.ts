import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthReleaseNotesComponent } from './fourth-release-notes.component';

describe('FourthReleaseNotesComponent', () => {
  let component: FourthReleaseNotesComponent;
  let fixture: ComponentFixture<FourthReleaseNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthReleaseNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthReleaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
