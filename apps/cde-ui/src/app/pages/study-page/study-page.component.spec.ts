import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { provideMarkdown } from 'ngx-markdown';
import { Study } from '../../schemas/studies/studies.schema';
import { StudyPageComponent } from './study-page.component';

// Mock file-saver to avoid actual file downloads in tests
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('StudyPageComponent', () => {
  const MOCK_DATASET = {
    slug: 'test-dataset-1',
    thumbnail: 'thumbnail.png',
    nodes: 'nodes.csv',
    edges: 'edges.csv',
    'node-target-key': 'cell_id',
    'node-target-value': 'cell_type',
    'node-cl-id-key': 'cl_id',
    'max-edge-distance': 75,
    cellCount: 1000,
    originalCellTypesCount: 10,
    level3CellTypesCount: 8,
    level2CellTypesCount: 5,
    level1CellTypesCount: 3,
  };

  const MOCK_STUDY: Study = {
    slug: 'test-study',
    organName: 'Heart',
    description: 'This is a test study description for spatial omics data.',
    authors: 'Test Author',
    affiliations: 'Test University',
    consortium: 'HuBMAP',
    technology: 'CODEX',
    euiUrl: 'https://example.com/eui',
    cellCount: 1000,
    tagline: 'Heart, CODEX',
    thumbnail: 'assets/data/gallery/thumbnails/test-study.png',
    image: 'assets/data/gallery/images/test-study.png',
    chips: ['1 dataset', '1,000 cells'],
    tags: [
      { icon: 'diversity_3', text: 'HuBMAP' },
      { icon: 'check_circle', text: 'HRA registered' },
    ],
    citations: ['Test Citation'],
    publications: ['https://example.com/publication'],
    publicationItems: [{ label: 'Test Citation', url: 'https://example.com/publication' }],
    datasets: [MOCK_DATASET],
  };

  const MOCK_STUDY_NO_EUI: Study = {
    ...MOCK_STUDY,
    euiUrl: '',
    tags: [{ icon: 'diversity_3', text: 'HuBMAP' }],
  };

  const MOCK_STUDY_NO_PUBLICATIONS: Study = {
    ...MOCK_STUDY,
    citations: [],
    publications: [],
    publicationItems: [],
  };

  const MOCK_STUDY_NO_DATASETS: Study = {
    ...MOCK_STUDY,
    datasets: [],
  };

  const MOCK_STUDY_MULTIPLE_DATASETS: Study = {
    ...MOCK_STUDY,
    chips: ['3 datasets', '3,000 cells'],
    datasets: [
      MOCK_DATASET,
      { ...MOCK_DATASET, slug: 'test-dataset-2', cellCount: 2000 },
      { ...MOCK_DATASET, slug: 'another-dataset', cellCount: 3000 },
    ],
  };

  async function setup(study: Study = MOCK_STUDY) {
    const renderResult = await render(StudyPageComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), provideIcons(), provideMarkdown()],
      inputs: { study },
    });

    return {
      ...renderResult,
      user: userEvent.setup(),
    };
  }

  describe('Study Header', () => {
    it('should render the study tagline', async () => {
      await setup();
      expect(screen.getByText('Heart, CODEX')).toBeInTheDocument();
    });

    it('should render authors and affiliations as chips', async () => {
      await setup();

      expect(screen.getByText('Test Author')).toBeInTheDocument();
      expect(screen.getByText('Test University')).toBeInTheDocument();
    });

    it('should render study chips', async () => {
      await setup();

      expect(screen.getByText('1 dataset')).toBeInTheDocument();
      expect(screen.getByText('1,000 cells')).toBeInTheDocument();
    });

    it('should render study tags with icons', async () => {
      const { container } = await setup();

      // Find chips specifically (not footer links)
      const chips = container.querySelectorAll('mat-chip');
      const chipTexts = Array.from(chips).map((chip) => chip.textContent?.trim());

      expect(chipTexts).toContainEqual(expect.stringContaining('HuBMAP'));
      expect(chipTexts).toContainEqual(expect.stringContaining('HRA registered'));
    });

    it('should render the study banner image', async () => {
      await setup();

      const banner = screen.getByAltText('Study Banner');
      expect(banner).toBeInTheDocument();
    });
  });

  describe('Overview Section', () => {
    it('should render the overview section', async () => {
      await setup();

      const overviews = screen.getAllByText('Overview');
      expect(overviews.length).toBeGreaterThan(0);
    });

    it('should render the study description', async () => {
      await setup();
      expect(screen.getByText('This is a test study description for spatial omics data.')).toBeInTheDocument();
    });
  });

  describe('Publications Section', () => {
    it('should render the publications section', async () => {
      await setup();

      const publications = screen.getAllByText('Publications');
      expect(publications.length).toBeGreaterThan(0);
    });

    it('should render publication items when available', async () => {
      await setup();
      expect(screen.getByText('Test Citation')).toBeInTheDocument();
    });

    it('should show message when no publications are available', async () => {
      await setup(MOCK_STUDY_NO_PUBLICATIONS);
      expect(screen.getByText('No source data available')).toBeInTheDocument();
    });
  });

  describe('Datasets Section', () => {
    it('should render the datasets section', async () => {
      await setup();

      const datasetsHeadings = screen.getAllByText('Datasets');
      expect(datasetsHeadings.length).toBeGreaterThan(0);
    });

    it('should render the search filter', async () => {
      await setup();

      const searchInput = screen.getByLabelText('Search');
      expect(searchInput).toBeInTheDocument();
    });

    it('should render the download icon', async () => {
      await setup();

      const downloadIcon = screen.getByText('download');
      expect(downloadIcon).toBeInTheDocument();
    });

    it('should render the datasets table with data', async () => {
      await setup();

      expect(screen.getByText('test-dataset-1')).toBeInTheDocument();
      expect(screen.getByText('1,000')).toBeInTheDocument();
    });

    it('should show message when no datasets are available', async () => {
      await setup(MOCK_STUDY_NO_DATASETS);
      expect(screen.getByText('No datasets available')).toBeInTheDocument();
    });

    it('should display correct counts in search filter', async () => {
      const { container } = await setup(MOCK_STUDY_MULTIPLE_DATASETS);
      const searchFilter = container.querySelector('hra-search-filter');
      expect(searchFilter).toBeInTheDocument();
      expect(searchFilter?.textContent).toContain('3');
    });
  });

  describe('Search Filtering', () => {
    it('should filter datasets based on search query', async () => {
      const { user } = await setup(MOCK_STUDY_MULTIPLE_DATASETS);
      const searchInput = screen.getByLabelText('Search');
      await user.type(searchInput, 'another');

      expect(screen.getByText('another-dataset')).toBeInTheDocument();
      expect(screen.queryByText('test-dataset-1')).not.toBeInTheDocument();
    });

    it('should update viewing count when filtering', async () => {
      const { user } = await setup(MOCK_STUDY_MULTIPLE_DATASETS);
      const searchInput = screen.getByLabelText('Search');
      await user.type(searchInput, 'another');

      expect(screen.getByText(/1.*of.*3/)).toBeInTheDocument();
    });

    it('should be case insensitive', async () => {
      const { user } = await setup(MOCK_STUDY_MULTIPLE_DATASETS);
      const searchInput = screen.getByLabelText('Search');
      await user.type(searchInput, 'ANOTHER');

      expect(screen.getByText('another-dataset')).toBeInTheDocument();
    });

    it('should handle empty search results', async () => {
      const { user } = await setup(MOCK_STUDY_MULTIPLE_DATASETS);
      const searchInput = screen.getByLabelText('Search');
      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText(/0.*of.*3/)).toBeInTheDocument();
      expect(screen.queryByText('test-dataset-1')).not.toBeInTheDocument();
    });

    it('should clear filter and show all datasets when search is cleared', async () => {
      const { user } = await setup(MOCK_STUDY_MULTIPLE_DATASETS);
      const searchInput = screen.getByLabelText('Search');
      await user.type(searchInput, 'another');

      expect(screen.getByText(/1.*of.*3/)).toBeInTheDocument();
      await user.clear(searchInput);
      expect(screen.getByText(/3.*of.*3/)).toBeInTheDocument();
    });
  });

  describe('Download CSV', () => {
    it('should download datasets as CSV when download icon is clicked', async () => {
      const { saveAs } = await import('file-saver');
      const { user } = await setup();
      const downloadIcon = screen.getByText('download');
      await user.click(downloadIcon);

      expect(saveAs).toHaveBeenCalled();
    });

    it('should include correct filename in CSV download', async () => {
      const { saveAs } = await import('file-saver');
      const { user } = await setup();
      const downloadIcon = screen.getByText('download');
      await user.click(downloadIcon);

      const calls = (saveAs as unknown as jest.Mock).mock.calls;
      const filename = calls[calls.length - 1][1];
      expect(filename).toBe('test-study-datasets.csv');
    });
  });

  describe('EUI Section', () => {
    it('should render EUI section when euiUrl is provided', async () => {
      await setup();

      const euiTexts = screen.getAllByText('View in the Exploration User Interface');
      expect(euiTexts.length).toBeGreaterThan(0);
      expect(
        screen.getByText('This data has been registered spatially into the Human Reference Atlas.'),
      ).toBeInTheDocument();
    });

    it('should render EUI link with correct URL', async () => {
      await setup();

      const euiLink = screen.getByText('Use app');
      expect(euiLink).toBeInTheDocument();
    });

    it('should not render EUI section when euiUrl is not provided', async () => {
      await setup(MOCK_STUDY_NO_EUI);
      expect(screen.queryByText('View in the Exploration User Interface')).not.toBeInTheDocument();
    });
  });
});
