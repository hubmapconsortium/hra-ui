import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRendererComponent } from './page-renderer.component';

describe('PageRendererComponent', () => {
  let component: PageRendererComponent;
  let fixture: ComponentFixture<PageRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
