import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableOfContentsLayoutComponent } from './table-of-contents-layout.component';

describe('TableOfContentsLayoutComponent', () => {
  let component: TableOfContentsLayoutComponent;
  let fixture: ComponentFixture<TableOfContentsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOfContentsLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableOfContentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
