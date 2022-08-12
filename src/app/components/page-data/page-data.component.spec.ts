import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDataComponent } from './page-data.component';

describe('PageDataComponent', () => {
  let component: PageDataComponent;
  let fixture: ComponentFixture<PageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
