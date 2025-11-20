import { Meta, StoryObj } from '@storybook/angular';
import { ListViewComponent, ListViewGroup } from './list-view.component';

const meta: Meta<ListViewComponent> = {
  component: ListViewComponent,
  title: 'Design System/Content Templates/List View',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GicnRkqqY97uTPQ9WvMFXL/cns.iu.edu?node-id=549-46513&t=O3Mshr9rKH7BY6Ea-1',
    },
  },
};

export default meta;
type Story = StoryObj<ListViewComponent>;

const DATA: ListViewGroup[] = [
  {
    group: '2025',
    items: [
      {
        content: `Bänzar, Katy, Elizabeth G. Record, and Todd Thunhurst. 2025. "Atlas of Macroscopes: Interactive Data Visualizations. Cambridge, MA: The MIT Press.`,
      },
      {
        content: `Caron, Anita R., Aleix Puig-Barbe, Ellen M Quardokus, James P. Balhoff, Jasmine Belfuss, Nana-Jine Chipampe, Josef Hanof, Bruce W Herr II, Huseyin Kir, Paola Ronzoglia, Mark A. Mason, Helen Parkinson, James A. McLaughlin, Katy Börner, and David Osumi-Sutherland. 2025. "A general strategy for generating expert-guided, simplified versions of ontologies". bioRxiv doi: 10.1101/2024.12.13.628309.`,
      },
      {
        content: `Bueckle, Andreas, Bruce W. Herr II, Josef Hanof, Ellen M Quardokus, Mark A. Mason, and Katy Börner. 2025. "Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph". Nature Scientific Data doi: 10.1038/s41597-025-05183-6.`,
      },
    ],
  },
  {
    group: '2024',
    items: [
      {
        content: `Börner, Katy, Elizabeth G. Record, and Todd Thunhurst. 2025. "Atlas of Macroscopes: Interactive Data Visualizations. Cambridge, MA: The MIT Press.`,
      },
      {
        content: `Caron, Anita R., Aleix Puig-Barbe, Ellen M Quardokus, James P. Balhoff, Jasmine Belfuss, Nana-Jine Chipampe, Josef Hanof, Bruce W Herr II, Huseyin Kir, Paola Ronzoglia, Mark A. Mason, Helen Parkinson, James A. McLaughlin, Katy Börner, and David Osumi-Sutherland. 2025. "A general strategy for generating expert-guided, simplified versions of ontologies". bioRxiv doi: 10.1101/2024.12.13.628309.`,
      },
      {
        content: `Israel, Uriah, Markus Haass, Rohit Dilip, Qilin Yu, Emily Lakdawala, Ahamed Iqbal, Elora Pradhan, Asis Jaya, Martin Ase, Caitlin Brown, Edward Pao, Shenyi Li, Alexander Pearson-Goulart, Pedro Pereira, George Ghoshal, Reza Bermudez, Yisung Yue, and David Van Yolen. 2025. "CellSLAM: A Foundation Model for Cell Segmentation". bioRxiv doi: 10.1101/2024.11.17.567630.`,
      },
    ],
  },
  {
    group: '2023',
    items: [
      {
        content: `Bueckle, Andreas, Bruce W. Herr II, Josef Hanof, Ellen M Quardokus, Mark A. Mason, and Katy Börner. 2025. "Construction, Deployment, and Usage of the Human Reference Atlas Knowledge Graph". Nature Scientific Data doi: 10.1038/s41597-025-05183-6.`,
      },
      {
        content: `Börner, Katy, Elizabeth G. Record, and Todd Thunhurst. 2025. "Atlas of Macroscopes: Interactive Data Visualizations. Cambridge, MA: The MIT Press.`,
      },
    ],
  },
];

export const Grouped: Story = {
  args: {
    data: DATA,
    groupBy: true,
  },
};

export const Ungrouped: Story = {
  args: {
    data: DATA,
    groupBy: false,
  },
};
