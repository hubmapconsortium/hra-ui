import { SheetConfig } from '../../../models/sheet.model';
import { Signals } from './signals';

describe('Signals', () => {
  const mockConfig: SheetConfig = {
    width: 800,
    height: 600,
    show_ontology: true,
  } as SheetConfig;
  let signals: Signals;

  beforeEach(() => {
    signals = new Signals(mockConfig);
  });

  it('should create instance via static method and constructor with all signals', () => {
    const result = Signals.create(mockConfig);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(14);
    expect(signals.signals).toHaveLength(14);
  });

  it('should handle undefined show_ontology in config', () => {
    const configWithoutOntology = { width: 800, height: 600 } as SheetConfig;
    const signalsInstance = new Signals(configWithoutOntology);
    expect(signalsInstance.signals).toHaveLength(14);
    const ontologySignal = signalsInstance.makeShowOntologyIDSignal(configWithoutOntology.show_ontology ?? false);
    expect(ontologySignal).toEqual({ name: 'show_ontology', value: false });
  });

  it.each([
    ['makeASTreeWidthSignal', 800, 'as_width'],
    ['makeASTreeHeightSignal', 600, 'as_height'],
  ])('%s should return signal with correct value', (method, value, name) => {
    const result = (signals as unknown as Record<string, (val: number) => { name: string; value: number }>)[method](
      value,
    );
    expect(result).toEqual({ name, value });
  });

  it.each([
    ['makeShowOntologyIDSignal', true, 'show_ontology'],
    ['makeShowOntologyIDSignal', false, 'show_ontology'],
  ])('%s should return signal with boolean value %s', (method, value, name) => {
    const result = (signals as unknown as Record<string, (val: boolean) => { name: string; value: boolean }>)[method](
      value,
    );
    expect(result).toEqual({ name, value });
  });

  it.each([
    ['makeSearchSignal', 'search_signal', []],
    ['makeDiscrepencySignal', 'discrepency_signal', []],
  ])('%s should return signal with empty array', (method, name, value) => {
    const result = (signals as unknown as Record<string, () => { name: string; value: unknown[] }>)[method]();
    expect(result).toEqual({ name, value });
  });

  it.each([
    ['makeBimodalNodeHoverStateSignal', 'node__hover', null],
    ['makeBimodalNodeClickStateSignal', 'node__click', null],
  ])('%s should return signal with null value and event handlers', (method, name, value) => {
    const result = (signals as unknown as Record<string, () => { name: string; value: unknown; on: unknown[] }>)[
      method
    ]();
    expect(result.name).toBe(name);
    expect(result.value).toBe(value);
    expect(result.on).toHaveLength(2);
  });

  it.each([
    ['makeBimodalNodeTargetsHoverStateSignal', 'node_targets__hover', []],
    ['makeBimodalNodeSourcesHoverStateSignal', 'node_sources__hover', []],
    ['makeBimodalTargetsClickStateSignal', 'targets__click', []],
    ['makeBimodalSourcesClickStateSignal', 'sources__click', []],
  ])('%s should return signal with empty array value and event handlers', (method, name, value) => {
    const result = (signals as unknown as Record<string, () => { name: string; value: unknown[]; on: unknown[] }>)[
      method
    ]();
    expect(result.name).toBe(name);
    expect(result.value).toEqual(value);
    expect(result.on).toHaveLength(2);
  });

  it('should create text click signal with complex update logic', () => {
    const result = signals.makeBimodalTextClickSignal();
    expect(result).toMatchObject({
      name: 'bimodal_text__click',
      value: null,
      on: [
        {
          events: '@textmark:click, @astextmark:click',
          update: "datum.type === 'AS' && datum.children ? datum : datum.type === 'BM' ? datum : null",
        },
        { events: 'click[!event.item]', update: 'null' },
      ],
    });
  });

  it('should create text hover signal with mouseover events', () => {
    const result = signals.makeBimodalTextHoverSignal();
    expect(result).toMatchObject({
      name: 'bimodal_text__hover',
      value: null,
      on: [
        { events: '@textmark:mouseover, @astextmark:mouseover', update: 'datum' },
        { events: 'mouseover[!event.item]', update: 'null' },
      ],
    });
  });

  it('should create path DOI signal with reference update logic', () => {
    const result = signals.makeBiomodalPathDOISignal();
    expect(result).toMatchObject({
      name: 'path__click',
      value: null,
      on: [
        {
          events: '@bimodal-path:click',
          update: 'datum.target.group === 2 ? datum.target.references : datum.source.references',
        },
        { events: 'click[!event.item]', update: 'null' },
      ],
    });
  });
});
