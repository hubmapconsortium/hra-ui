import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideAssetHref } from '@hra-ui/common/url';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import saveAs from 'file-saver';
import { provideMarkdown } from 'ngx-markdown';

import { StudyPageComponent } from './study-page.component';

jest.mock('file-saver', () => ({ __esModule: true, default: jest.fn() }));

const mockStudy = {
  slug: 'test-study',
  organName: 'Organ',
  technology: 'Tech',
  thumbnail: 'thumb.png',
  authors: 'Author',
  affiliations: 'Affiliation',
  consortium: 'Consortium',
  euiUrl: 'https://eui.example',
  description: 'Desc',
  publication: ['https://pub.example'],
  citations: ['Citation'],
  cellCount: 100,
  datasets: [
    {
      slug: 'ds-1',
      thumbnail: 't1.png',
      cellCount: 10,
      originalCellTypesCount: 1,
      level3CellTypesCount: 2,
      level2CellTypesCount: 3,
      level1CellTypesCount: 4,
    },
    {
      slug: 'ds-2',
      thumbnail: 't2.png',
      cellCount: 20,
      originalCellTypesCount: 2,
      level3CellTypesCount: 3,
      level2CellTypesCount: 4,
      level1CellTypesCount: 5,
    },
  ],
};

const galleryData = { studies: [mockStudy] };
const providers = [
  provideMarkdown(),
  provideAssetHref('http://localhost/'),
  provideHttpClient(),
  provideHttpClientTesting(),
];

describe('StudyPageComponent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders study and filters datasets', async () => {
    await render(StudyPageComponent, { providers, componentInputs: { galleryData, studyName: 'test-study' } });

    expect(screen.getByText(/Organ,\s*Tech/i)).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('ds-1')).toBeInTheDocument();
    expect(screen.getByText('ds-2')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/search/i), 'ds-1');
    expect(screen.getByText('ds-1')).toBeInTheDocument();
    expect(screen.queryByText('ds-2')).not.toBeInTheDocument();
  });

  it('navigates and downloads CSV', async () => {
    const navigate = jest.fn().mockResolvedValue(true);
    const { fixture } = await render(StudyPageComponent, {
      providers: [...providers, { provide: Router, useValue: { navigate } }],
      componentInputs: { galleryData, studyName: 'test-study' },
    });

    fixture.componentInstance.onExploreDataset('ds-1');
    expect(navigate).toHaveBeenCalledWith(['/gallery', 'test-study', 'ds-1']);

    await userEvent.click(screen.getByText('download'));
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'test-study.csv');
  });

  it('shows fallback for missing study', async () => {
    await render(StudyPageComponent, { providers, componentInputs: { galleryData, studyName: 'missing' } });
    expect(screen.getByText(/No datasets available/i)).toBeInTheDocument();
  });

  it('handles empty dataset navigation gracefully', async () => {
    const navigate = jest.fn();
    const { fixture } = await render(StudyPageComponent, {
      providers: [...providers, { provide: Router, useValue: { navigate } }],
      componentInputs: { galleryData, studyName: 'test-study' },
    });

    fixture.componentInstance.onExploreDataset('');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('handles study without optional fields', async () => {
    const minimalStudy = {
      slug: 'minimal',
      organName: 'Organ',
      technology: 'Tech',
      authors: 'A',
      affiliations: 'B',
      datasets: [{ slug: 'd1' }],
    };
    await render(StudyPageComponent, {
      providers,
      componentInputs: { galleryData: { studies: [minimalStudy] }, studyName: 'minimal' },
    });

    expect(screen.getByText(/Organ,\s*Tech/i)).toBeInTheDocument();
    expect(screen.getByText('1 dataset')).toBeInTheDocument();
  });

  it('skips CSV download when no datasets', async () => {
    const { fixture } = await render(StudyPageComponent, {
      providers,
      componentInputs: { galleryData, studyName: 'missing' },
    });
    fixture.componentInstance.onDownloadCSVButtonClicked();
    expect(saveAs).not.toHaveBeenCalled();
  });
});
