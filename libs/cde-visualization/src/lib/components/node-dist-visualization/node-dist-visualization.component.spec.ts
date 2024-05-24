import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeDistVisualizationComponent } from './node-dist-visualization.component';

describe('VisualizationComponent', () => {
  let component: NodeDistVisualizationComponent;
  let fixture: ComponentFixture<NodeDistVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeDistVisualizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeDistVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
