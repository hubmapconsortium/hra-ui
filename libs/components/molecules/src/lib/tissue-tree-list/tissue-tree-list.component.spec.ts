import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueTreeListComponent } from './tissue-tree-list.component';

describe('TissueTreeListComponent', () => {
  let component: TissueTreeListComponent;
  let fixture: ComponentFixture<TissueTreeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TissueTreeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TissueTreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
