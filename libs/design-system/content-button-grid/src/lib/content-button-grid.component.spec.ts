import { render, screen } from '@testing-library/angular';
import { ContentButtonGridComponent } from './content-button-grid.component';

const SAMPLE_DATA = [
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: '2025-08-26',
    tagline: 'HuBMAP Human Reference Atlas Hackathon',
    tags: ['Event', 'HRA'],
    categories: ['event', 'hra', 'featured'],
    link: 'https://google.com',
    external: true,
  },
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: '2025-08-13',
    tagline: 'Luddy’s Bueckle wins two grants, co-authors paper',
    tags: ['News', 'HRA'],
    categories: ['news', 'featured'],
    link: 'https://google.com',
    external: true,
  },
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: '2025-08-02',
    tagline: 'Constructing and Using Cell Type Populations of the Human Reference Atlas',
    tags: ['Publication', 'HRA'],
    categories: ['publications', 'featured'],
    link: 'https://google.com',
    external: true,
  },
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: '2025-07-16',
    tagline: 'Börner wins Stiftung Charité Visiting Fellowship',
    tags: ['News', 'HRA'],
    categories: ['news', 'featured'],
    link: 'https://google.com',
    external: true,
  },
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: '2025-06-03',
    tagline: 'Places & Spaces | 20th Iteration',
    tags: ['News', 'Places & Spaces'],
    categories: ['news', 'featured'],
    link: 'https://google.com',
    external: true,
  },
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: 1747958400000, //'2025-05-23'
    tagline: 'Benchmarking single cell transcriptome matching methods for incremental growth of reference atlases',
    tags: ['Publication', 'HRA'],
    categories: ['publications', 'featured'],
    link: 'https://google.com',
    external: true,
  },
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: '2025-05-12',
    tagline: 'Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph',
    tags: ['Publication', 'HRA'],
    categories: ['publications', 'hra', 'featured'],
    link: 'https://google.com',
    external: true,
  },
  {
    imageSrc: 'assets/ui-images/placeholder.png',
    date: '2025-04-14',
    tagline: 'Amatria Birthday brings hope, growth',
    tags: ['News', 'Amatria'],
    categories: ['news'],
    link: 'https://google.com',
    external: true,
  },
];

describe('ContentButtonGridComponent', () => {
  it('should filter buttons by category', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ContentButtonGridComponent, {
      componentInputs: {
        category: 'news',
        buttonCategories: ['publications', 'news', 'featured'],
        cardData: SAMPLE_DATA,
      },
    });

    const button = screen.getByText('Amatria Birthday brings hope, growth');
    expect(button).toBeInTheDocument();
    expect(instance.filteredCards().length).toEqual(4);
  });

  it('should show featured items', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ContentButtonGridComponent, {
      componentInputs: {
        category: 'featured',
        buttonCategories: ['publications', 'news', 'featured'],
        cardData: SAMPLE_DATA,
      },
    });

    expect(instance.filteredCards().length).toEqual(7);
  });

  it('should sort cards by oldest', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ContentButtonGridComponent, {
      componentInputs: {
        category: 'publications',
        buttonCategories: ['publications', 'news', 'featured'],
        cardData: SAMPLE_DATA,
        sortBy: 'oldest',
      },
    });

    expect(instance.filteredCards()[0].tagline).toEqual(
      'Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph',
    );
  });

  it('should sort cards by name ascending', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ContentButtonGridComponent, {
      componentInputs: {
        category: 'publications',
        buttonCategories: ['publications', 'news', 'featured'],
        cardData: SAMPLE_DATA,
        sortBy: 'nameAsc',
      },
    });

    expect(instance.filteredCards()[0].tagline).toEqual(
      'Benchmarking single cell transcriptome matching methods for incremental growth of reference atlases',
    );
  });

  it('should sort cards by name descending', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ContentButtonGridComponent, {
      componentInputs: {
        category: 'publications',
        buttonCategories: ['publications', 'news', 'featured'],
        cardData: SAMPLE_DATA,
        sortBy: 'nameDes',
      },
    });

    expect(instance.filteredCards()[0].tagline).toEqual(
      'Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph',
    );
  });
});
