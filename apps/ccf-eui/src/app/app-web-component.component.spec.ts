import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { AppWebComponent } from './app-web-component.component';

jest.mock('../environments/environment', () => ({
  environment: {
    dbOptions: { api: 'db' },
    customization: { theme: 'blue' },
  },
}));

jest.mock('ccf-shared/web-components', () => {
  const json = (value: unknown) => JSON.parse(value as string);
  const boolean = (value: unknown) => value === true || value === 'true';

  class BaseWebComponent {
    initialized = true;
    constructor(config: unknown) {
      Object.assign(this, { config });
    }
  }

  return { BaseWebComponent, BUILTIN_PARSERS: { json, boolean } };
});

const selectionFilter = {
  sex: 'Male',
  ageRange: [10, 20],
  bmiRange: [18, 25],
  consortiums: ['C1'],
  tmc: ['T1'],
  technologies: ['Tech'],
  ontologyTerms: ['AS1'],
  cellTypeTerms: ['CT1'],
  biomarkerTerms: ['B1'],
  spatialSearches: ['S1'],
};

describe('AppWebComponent', () => {
  const createComponent = () => TestBed.runInInjectionContext(() => new AppWebComponent());

  afterEach(() => {
    delete (globalThis as any).dbOptions;
  });

  it('merges environment and global dbOptions into initial config', () => {
    (globalThis as any).dbOptions = { api: 'override', extra: true };

    const component = createComponent();
    const config = (component as any).config;

    expect(config.initialConfig).toEqual({ api: 'override', extra: true, theme: 'blue' });
  });

  it('parses filter strings and validates filter objects', () => {
    const component = createComponent();
    const parse = (component as any).config.parse;

    const parsed = parse.filter(JSON.stringify(selectionFilter));
    expect(parsed).toEqual(selectionFilter);

    const direct = parse.filter(selectionFilter);
    expect(direct).toEqual(selectionFilter);
  });

  it('parses data sources from JSON strings', () => {
    const component = createComponent();
    const parse = (component as any).config.parse;

    expect(parse.dataSources('["a","b"]')).toEqual(['a', 'b']);
    expect(() => parse.dataSources('"not-an-array"')).toThrow('Invalid type for string array');
  });

  it('shows the root element when initialized', async () => {
    const { fixture, container } = await render(AppWebComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    expect(fixture.componentInstance.initialized).toBe(true);
    expect(container.querySelector('ccf-root')).not.toBeNull();
  });
});
