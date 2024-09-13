import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeDistVisComponent } from './node-dist-vis.component';

describe('NodeDistVisComponent', () => {
  let component: NodeDistVisComponent;
  let fixture: ComponentFixture<NodeDistVisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeDistVisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeDistVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
