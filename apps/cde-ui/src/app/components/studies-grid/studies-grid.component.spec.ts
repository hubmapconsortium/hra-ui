import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';

import { StudiesGridComponent } from './studies-grid.component';

describe('StudiesGridComponent', () => {
  const mockYamlUrl = 'assets/data/gallery/data.yaml';

  const mockYamlData = `
studies:
  - slug: test-study-1
    organName: Heart
    technology: CODEX
    authors: Smith Lab
    affiliations: University of Test
    consortium: HuBMAP
    thumbnail: thumbnails/test1.png
    cellCount: 1000000
    euiUrl: https://example.com/eui
    publications:
      - https://doi.org/10.1234/test1
    citations:
      - Smith et al. 2020
    datasets:
      - slug: dataset1
      - slug: dataset2
  - slug: test-study-2
    organName: Kidney
    technology: 10x Multiome
    authors: Jones Lab
    affiliations: Test Institute
    thumbnail: thumbnails/test2.png
    cellCount: 500000
    publications:
      - https://doi.org/10.1234/test2-1
      - https://doi.org/10.1234/test2-2
    citations:
      - Jones et al. 2021
      - Jones et al. 2022
    datasets:
      - slug: dataset3
  - slug: test-study-3
    organName: Brain
    technology: MERFISH
    authors: Brown Lab
    affiliations: Research Center
    datasets:
      - slug: dataset4
`;

  async function setup() {
    const renderResult = await render(StudiesGridComponent, {
      componentInputs: { yamlUrl: mockYamlUrl },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const httpTesting = TestBed.inject(HttpTestingController);

    return { renderResult, httpTesting };
  }

  it('should create', async () => {
    const { renderResult } = await setup();
    expect(renderResult.fixture.componentInstance).toBeTruthy();
  });

  it('should fetch and display studies from YAML', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getByText('Heart, CODEX')).toBeInTheDocument();
    });

    expect(screen.getByText('Kidney, 10x Multiome')).toBeInTheDocument();
    expect(screen.getByText('Brain, MERFISH')).toBeInTheDocument();
  });

  it('should display correct dataset and cell counts', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getByText('2 datasets')).toBeInTheDocument();
    });

    expect(screen.getAllByText('1 dataset').length).toBeGreaterThan(0);
    expect(screen.getByText('1,000,000 cells')).toBeInTheDocument();
    expect(screen.getByText('500,000 cells')).toBeInTheDocument();
  });

  it('should display consortium and HRA registered tags', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getByText('HuBMAP')).toBeInTheDocument();
    });

    expect(screen.getByText('HRA registered')).toBeInTheDocument();
  });

  it('should display authors and affiliations', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getByText('Smith Lab')).toBeInTheDocument();
    });

    expect(screen.getByText('University of Test')).toBeInTheDocument();
    expect(screen.getByText('Jones Lab')).toBeInTheDocument();
    expect(screen.getByText('Test Institute')).toBeInTheDocument();
  });

  it('should display single publication as direct link', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getAllByText('Source data').length).toBeGreaterThan(0);
    });

    const sourceDataLinks = screen.getAllByText('Source data');
    const firstLink = sourceDataLinks[0].closest('a') as HTMLAnchorElement;

    expect(firstLink?.href).toContain('doi.org/10.1234/test1');
    expect(firstLink?.target).toBe('_blank');
    // link text remains 'Source data' for single publication but title should contain citation
    expect(firstLink?.textContent).toContain('Source data');
    expect(firstLink?.getAttribute('title')).toContain('Smith et al. 2020');
  });

  it('should display multiple publications as button with menu', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getAllByText('Source data').length).toBe(2);
    });

    const sourceDataElements = screen.getAllByText('Source data');
    const secondButton = sourceDataElements[1].closest('button');

    expect(secondButton).toBeTruthy();
    expect(secondButton?.tagName).toBe('BUTTON');
  });

  it('pairs citations with publications and shows labels in menu', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getAllByText('Source data').length).toBe(2);
    });

    const sourceDataElements = screen.getAllByText('Source data');
    const secondButton = sourceDataElements[1].closest('button') as HTMLButtonElement;
    expect(secondButton).toBeTruthy();

    // Open the menu
    fireEvent.click(secondButton);

    await waitFor(() => {
      expect(screen.getByText('Jones et al. 2021')).toBeInTheDocument();
      expect(screen.getByText('Jones et al. 2022')).toBeInTheDocument();
    });

    // menu labels should have the publication-label class for truncation styling
    const menuLabelElements = Array.from(document.querySelectorAll('.publication-label')) as HTMLElement[];
    expect(menuLabelElements.some((el) => el.textContent?.includes('Jones et al. 2021'))).toBeTruthy();
    expect(menuLabelElements.some((el) => el.textContent?.includes('Jones et al. 2022'))).toBeTruthy();
  });

  it('should only display source data for studies with publications', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      const sourceDataElements = screen.queryAllByText('Source data');
      expect(sourceDataElements.length).toBe(2); // Only 2 out of 3 studies have publications
    });
  });

  it('should display correct view button text based on dataset count', async () => {
    const { httpTesting } = await setup();

    const req = httpTesting.expectOne(mockYamlUrl);
    req.flush(mockYamlData);

    await waitFor(() => {
      expect(screen.getByText('View datasets')).toBeInTheDocument();
    });

    expect(screen.getAllByText('View dataset').length).toBeGreaterThan(0);
  });
});
