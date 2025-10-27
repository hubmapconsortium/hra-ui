import { render, screen } from '@testing-library/angular';
import { ContentButtonGridComponent } from './content-button-grid.component';

describe('ContentButtonGridComponent', () => {
  it('should render content buttons', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(ContentButtonGridComponent, {
      componentInputs: {
        cardData: [
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-08-26',
            tagline: 'HuBMAP Human Reference Atlas Hackathon',
            tags: ['Event', 'HRA'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-08-13',
            tagline: 'Luddy’s Bueckle wins two grants, co-authors paper',
            category: 'news',
            tags: ['News', 'HRA'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-08-02',
            tagline: 'Constructing and Using Cell Type Populations of the Human Reference Atlas',
            category: 'publications',
            tags: ['Publication', 'HRA'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-07-16',
            tagline: 'Börner wins Stiftung Charité Visiting Fellowship',
            category: 'news',
            tags: ['News', 'HRA'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-06-03',
            tagline: 'Places & Spaces | 20th Iteration',
            category: 'news',
            tags: ['News', 'Places & Spaces'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-05-23',
            tagline:
              'Benchmarking single cell transcriptome matching methods for incremental growth of reference atlases',
            category: 'publications',
            tags: ['Publication', 'HRA'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-05-12',
            tagline: 'Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph',
            category: 'publications',
            tags: ['Publication', 'HRA'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
          {
            imageSrc: 'assets/ui-images/placeholder.png',
            date: '2025-04-14',
            tagline: 'Amatria Birthday brings hope, growth',
            category: 'news',
            tags: ['News', 'Amatria'],
            featured: true,
            link: 'https://google.com',
            external: true,
          },
        ],
      },
    });

    const button = screen.getByText('Amatria Birthday brings hope, growth');
    expect(button).toBeInTheDocument();
    expect(instance.filteredCards().length).toEqual(8);
  });
});
