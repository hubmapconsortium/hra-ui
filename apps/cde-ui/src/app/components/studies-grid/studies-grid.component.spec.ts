import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import * as YAML from 'js-yaml';
import { StudiesGridComponent } from './studies-grid.component';

const mockYamlUrl = 'assets/data/gallery/data.yaml';
const mockData = {
  studies: [
    {
      slug: 's1',
      organName: 'Heart',
      technology: 'CODEX',
      authors: 'A',
      affiliations: 'X',
      consortium: 'HuBMAP',
      cellCount: 1000000,
      euiUrl: 'https://example.com/eui',
      publications: ['https://doi.org/1'],
      citations: ['A 2020'],
      datasets: [{ slug: 'd1' }, { slug: 'd2' }],
    },
    {
      slug: 's2',
      organName: 'Kidney',
      technology: '10x',
      authors: 'B',
      affiliations: 'Y',
      cellCount: 500000,
      publications: ['https://doi.org/2', 'https://doi.org/3'],
      citations: ['B 2021', 'B 2022'],
      datasets: [{ slug: 'd3' }],
    },
    {
      slug: 's3',
      organName: 'Brain',
      technology: 'MERFISH',
      authors: 'C',
      affiliations: 'Z',
      datasets: [{ slug: 'd4' }],
    },
  ],
};

async function setup() {
  const r = await render(StudiesGridComponent, {
    componentInputs: { yamlUrl: mockYamlUrl },
    providers: [provideHttpClient(), provideHttpClientTesting()],
  });
  return { renderResult: r, httpTesting: TestBed.inject(HttpTestingController) };
}

test('renders and shows publications', async () => {
  const { httpTesting } = await setup();
  const req = httpTesting.expectOne(mockYamlUrl);
  req.flush(YAML.dump(mockData));
  await waitFor(() => expect(screen.getByText('Heart, CODEX')).toBeInTheDocument());
  expect(screen.getAllByText('Source data').length).toBe(2);
  const first = screen.getAllByText('Source data')[0].closest('a') as HTMLAnchorElement;
  expect(first.href).toContain('doi.org/1');
  expect(first.getAttribute('title')).toContain('A 2020');
  fireEvent.click(screen.getAllByText('Source data')[1]);
  await waitFor(() => expect(screen.getByText('B 2021')).toBeInTheDocument());
});

test('EUI menu only for registered study', async () => {
  const { httpTesting } = await setup();
  const req = httpTesting.expectOne(mockYamlUrl);
  req.flush(YAML.dump(mockData));
  await waitFor(() => expect(screen.getByText('Heart, CODEX')).toBeInTheDocument());
  const more = screen.getAllByLabelText('More options');
  expect(more.length).toBeGreaterThan(0);
  const brain = screen.getByText('Brain, MERFISH').closest('hra-collection-card');
  expect(brain?.querySelector('[aria-label="More options"]')).toBeNull();
  fireEvent.click(more[0]);
  await waitFor(() =>
    expect(screen.getByText('View datasets in the Exploration User Interface').closest('a')?.href).toContain(
      'https://example.com/eui',
    ),
  );
});
