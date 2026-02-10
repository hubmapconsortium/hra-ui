import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@hra-ui/design-system/icons';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { Studies } from '../../schemas/studies/studies.schema';
import { STUDIES_DATA_KEY } from '../../shared/resolvers/study.resolver';
import { StudiesGridComponent } from './studies-grid.component';

describe('StudiesGridComponent', () => {
  const MOCK_STUDY = {
    slug: 'test-study',
    organName: 'Heart',
    description: 'Test study description',
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
    datasets: [
      {
        slug: 'test-dataset',
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
      },
    ],
  };

  const MOCK_STUDY_NO_EUI = {
    ...MOCK_STUDY,
    slug: 'study-no-eui',
    euiUrl: '',
    tags: [{ icon: 'diversity_3', text: 'HuBMAP' }],
  };

  const MOCK_STUDY_MULTIPLE_DATASETS = {
    ...MOCK_STUDY,
    slug: 'study-multiple-datasets',
    chips: ['3 datasets', '3,000 cells'],
    datasets: [
      MOCK_STUDY.datasets[0],
      { ...MOCK_STUDY.datasets[0], slug: 'test-dataset-2' },
      { ...MOCK_STUDY.datasets[0], slug: 'test-dataset-3' },
    ],
  };

  const MOCK_STUDIES_DATA: Studies = {
    studies: [MOCK_STUDY, MOCK_STUDY_NO_EUI, MOCK_STUDY_MULTIPLE_DATASETS],
  };

  const EMPTY_STUDIES_DATA: Studies = {
    studies: [],
  };

  const SINGLE_STUDY_DATA: Studies = {
    studies: [MOCK_STUDY],
  };

  const NO_EUI_STUDY_DATA: Studies = {
    studies: [MOCK_STUDY_NO_EUI],
  };

  const MULTIPLE_DATASETS_STUDY_DATA: Studies = {
    studies: [MOCK_STUDY_MULTIPLE_DATASETS],
  };

  const CUSTOM_STUDY_DATA: Studies = {
    studies: [MOCK_STUDY],
  };

  async function setup(studiesData: Studies = SINGLE_STUDY_DATA, dataName = STUDIES_DATA_KEY) {
    const renderResult = await render(StudiesGridComponent, {
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideIcons(),
        provideRouter([
          {
            path: '',
            component: StudiesGridComponent,
            data: {
              [dataName]: studiesData,
            },
          },
        ]),
      ],
      inputs: { dataName },
    });

    return {
      ...renderResult,
      user: userEvent.setup(),
    };
  }

  describe('Rendering Studies', () => {
    it('should render all studies from route data', async () => {
      await setup(MOCK_STUDIES_DATA);

      const studyTaglines = screen.getAllByText('Heart, CODEX');
      expect(studyTaglines.length).toBe(3);
      const authors = screen.getAllByText('Test Author');
      expect(authors.length).toBe(3);
    });

    it('should render nothing when studies array is empty', async () => {
      await setup(EMPTY_STUDIES_DATA);
      expect(screen.queryByText('Heart, CODEX')).not.toBeInTheDocument();
    });

    it('should render study chips', async () => {
      await setup();

      expect(screen.getByText('1 dataset')).toBeInTheDocument();
      expect(screen.getByText('1,000 cells')).toBeInTheDocument();
    });

    it('should render study tags', async () => {
      await setup();

      expect(screen.getByText('HuBMAP')).toBeInTheDocument();
      expect(screen.getByText('HRA registered')).toBeInTheDocument();
    });

    it('should render multiple studies', async () => {
      await setup(MOCK_STUDIES_DATA);

      const studyCards = screen.getAllByText('Test Author');
      expect(studyCards.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('View Datasets Button', () => {
    it('should render view dataset button with singular text for single dataset', async () => {
      await setup();

      const button = screen.getByRole('link', { name: /view dataset$/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '/gallery/test-study');
    });

    it('should render view datasets button with plural text for multiple datasets', async () => {
      await setup(MULTIPLE_DATASETS_STUDY_DATA);

      const button = screen.getByRole('link', { name: /view datasets$/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '/gallery/study-multiple-datasets');
    });
  });

  describe('More Options Menu', () => {
    it('should render more options button when study has euiUrl', async () => {
      await setup();
      const moreButton = screen.getByLabelText('More options');
      expect(moreButton).toBeInTheDocument();
    });

    it('should not render more options button when study has no euiUrl', async () => {
      await setup(NO_EUI_STUDY_DATA);
      expect(screen.queryByLabelText('More options')).not.toBeInTheDocument();
    });

    it('should open menu when more button is clicked', async () => {
      const { user } = await setup();
      const moreButton = screen.getByLabelText('More options');
      await user.click(moreButton);

      const menuItem = screen.getByRole('menuitem', {
        name: /view datasets in the exploration user interface/i,
      });
      expect(menuItem).toBeInTheDocument();
    });

    it('should have correct href on EUI menu item', async () => {
      const { user } = await setup();
      const moreButton = screen.getByLabelText('More options');
      await user.click(moreButton);

      const menuItem = screen.getByRole('menuitem', {
        name: /view datasets in the exploration user interface/i,
      });
      expect(menuItem).toHaveAttribute('href', 'https://example.com/eui');
    });
  });

  describe('Source Data Menu', () => {
    it('should render source data menu for each study', async () => {
      await setup();

      const sourceDataButton = screen.getByRole('link', { name: /source data/i });
      expect(sourceDataButton).toBeInTheDocument();
    });
  });

  describe('Custom Data Key', () => {
    it('should use custom dataName input to access route data', async () => {
      const customKey = 'customStudiesKey';
      await setup(CUSTOM_STUDY_DATA, customKey);
      expect(screen.getByText('Heart, CODEX')).toBeInTheDocument();
    });

    it('should handle missing data key gracefully', async () => {
      const renderResult = await setup(undefined, 'nonexistentKey');
      expect(renderResult.fixture.componentInstance).toBeTruthy();
    });
  });

  describe('Grid Container', () => {
    it('should render grid container with correct feature attribute', async () => {
      const { container } = await setup(MOCK_STUDIES_DATA);
      const gridContainer = container.querySelector('[hraFeature="spatial-omics-gallery"]');
      expect(gridContainer).toBeInTheDocument();
    });

    it('should render collection cards with correct feature attribute', async () => {
      const { container } = await setup(MOCK_STUDIES_DATA);
      const cards = container.querySelectorAll('[hraFeature="featured-study"]');
      expect(cards.length).toBeGreaterThan(0);
    });
  });
});
