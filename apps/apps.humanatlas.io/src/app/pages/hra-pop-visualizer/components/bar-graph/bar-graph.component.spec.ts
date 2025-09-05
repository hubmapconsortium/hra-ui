import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarGraphComponent } from './bar-graph.component';

// Polyfill for structuredClone in Node.js environment
(globalThis as any).structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));

// Mock vega-embed
jest.mock('vega-embed', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    finalize: jest.fn(),
    view: jest.fn(),
  }),
}));

describe('BarGraphComponent', () => {
  let component: BarGraphComponent;
  let fixture: ComponentFixture<BarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
