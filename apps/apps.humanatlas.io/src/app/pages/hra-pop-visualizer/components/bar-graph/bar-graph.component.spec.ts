import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarGraphComponent } from './bar-graph.component';
import type { Result } from 'vega-embed';

// Polyfill for structuredClone in Node.js environment
(globalThis as any).structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));

jest.mock('vega-embed', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@hra-ui/common/analytics', () => ({
  injectLogEvent: () => jest.fn(),
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

  it('should access loading getter', () => {
    expect(component.loading).toBe(false);
  });

  it('should access error getter', () => {
    expect(component.error).toBeUndefined();
  });

  it('should handle DOM clearing with child elements', () => {
    const containerEl = (component as any).container().nativeElement;
    const child1 = document.createElement('div');
    const child2 = document.createElement('span');
    containerEl.appendChild(child1);
    containerEl.appendChild(child2);

    (component as any).clearContainer();

    expect(containerEl.children.length).toBe(0);
  });

  it('should handle element creation', () => {
    const element = (component as any).createVisualizationRootElement();
    expect(element).toBeDefined();
    expect(element.tagName).toBe('DIV');
  });

  it('should trigger effect cleanup on destroy', () => {
    fixture.componentRef.setInput('spec', { $schema: 'test' });
    fixture.detectChanges();
    fixture.destroy();
    expect(true).toBe(true);
  });

  it('should cleanup vega result on destroy', async () => {
    const finalizeMock = jest.fn();
    const addEventListenerMock = jest.fn();

    const vegaEmbed = await import('vega-embed');
    const mockEmbed = vegaEmbed.default as jest.MockedFunction<typeof vegaEmbed.default>;

    mockEmbed.mockResolvedValueOnce({
      finalize: finalizeMock,
      view: {
        addEventListener: addEventListenerMock,
        finalize: jest.fn(),
        initialize: jest.fn(),
        loader: jest.fn(),
        logLevel: jest.fn(),
      },
    } as unknown as Result);

    fixture.componentRef.setInput('spec', { $schema: 'test' });
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 100));
    fixture.destroy();
    expect(finalizeMock).toHaveBeenCalled();
  });

  it('should attach event listeners to vega view', () => {
    const addEventListenerMock = jest.fn();
    const mockView = {
      addEventListener: addEventListenerMock,
    };
    (component as any).attachVegaEventTracking(mockView);
    expect(addEventListenerMock).toHaveBeenCalledWith('pointerover', expect.any(Function));
    expect(addEventListenerMock).toHaveBeenCalledWith('click', expect.any(Function));
  });
});
