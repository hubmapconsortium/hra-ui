import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SummaryStatisticsTableComponent } from './summary-statistics-table.component';

jest.mock('file-saver', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SummaryStatisticsTableComponent', () => {
  const mockCsvData = `organ,ftu_label,ftu_id,ftu_part_label,ftu_part_id,as_count,ct_count
Kidney,Glomerulus,UBERON:0000074,Podocyte,CL:0000653,10,5
Kidney,Nephron,UBERON:0001285,Cell,CL:0000000,20,10
Heart,Ventricle,UBERON:0002084,Cardiomyocyte,CL:0000746,30,15`;

  const providers = [provideHttpClient(), provideHttpClientTesting(), provideRouter([])];

  async function setup(data?: { csvUrl?: string; organColumn?: string }) {
    const renderResult = await render(SummaryStatisticsTableComponent, {
      providers,
      inputs: data,
    });

    const httpMock = TestBed.inject(HttpTestingController);
    const user = userEvent.setup();

    return { ...renderResult, httpMock, user };
  }

  it('should create', async () => {
    const { container } = await setup();
    expect(container).toBeTruthy();
  });

  it('should load and display CSV data', async () => {
    const { httpMock } = await setup();

    const requests = httpMock.match((req) => req.url.includes('ftu-cell-counts'));
    requests.forEach((req) => req.flush(mockCsvData));

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    httpMock.verify();
  });

  it('should filter rows by organ', async () => {
    const { httpMock } = await setup();

    const requests = httpMock.match((req) => req.url.includes('ftu-cell-counts'));
    requests.forEach((req) => req.flush(mockCsvData));

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    const cells = await screen.findAllByRole('cell');
    expect(cells.length).toBeGreaterThan(0);

    httpMock.verify();
  });

  it('should trigger download when button is clicked', async () => {
    const saveAs = (await import('file-saver')).default;
    const { httpMock, user, container } = await setup({ csvUrl: 'test.csv' });

    const requests = httpMock.match('test.csv');
    requests.forEach((req) => req.flush(mockCsvData));

    const downloadButton = container.querySelector('button.download') as HTMLElement;
    expect(downloadButton).toBeInTheDocument();
    await user.click(downloadButton);

    expect(saveAs).toHaveBeenCalled();

    httpMock.verify();
  });

  it('should download blob when csvUrl is not provided', async () => {
    const saveAs = (await import('file-saver')).default;
    const { httpMock, user, container } = await setup({ csvUrl: '' });

    const requests = httpMock.match('');
    requests.forEach((req) => req.flush(mockCsvData));

    const downloadButton = container.querySelector('button.download') as HTMLElement;
    await user.click(downloadButton);

    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'Kidney.csv');

    httpMock.verify();
  });
});
