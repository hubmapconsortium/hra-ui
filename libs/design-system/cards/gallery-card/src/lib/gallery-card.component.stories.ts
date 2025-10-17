import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { GalleryCardComponent } from './gallery-card.component';
import { GridContainerComponent } from '../../../../content-templates/grid-container/src/lib/grid-container.component';

const meta: Meta<GalleryCardComponent> = {
  title: 'Design System/Cards/Gallery Card',
  component: GalleryCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1309-2257',
    },
  },
  args: {
    tagline: 'Exploring the Human Reference Atlas: A Comprehensive Guide',
    image: 'assets/ui-images/placeholder.png',
    imageAlt: 'HRA Gallery Thumbnail',
    date: 'March 15, 2024',
    taglineUrl: 'https://humanatlas.io',
    taglineExternal: true,
    categoryTag: 'Research',
    projectTag: 'HRA',
  },
  decorators: [
    moduleMetadata({
      imports: [GridContainerComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<GalleryCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <div style="max-width: 400px;">
      <hra-gallery-card
        [tagline]="tagline"
        [image]="image"
        [imageAlt]="imageAlt"
        [date]="date"
        [taglineUrl]="taglineUrl"
        [taglineExternal]="taglineExternal"
        [categoryTag]="categoryTag"
        [projectTag]="projectTag"
      >
      </hra-gallery-card>
    </div>
    `,
  }),
};

export const Grid: Story = {
  render: () => ({
    template: `
    <hra-grid-container>
      <hra-gallery-card
        tagline="Understanding Tissue Mapping in the Human Body"
        image="assets/ui-images/placeholder.png"
        imageAlt="Tissue Mapping"
        date="January 10, 2024"
        taglineUrl="https://humanatlas.io/tissue-mapping"
        [taglineExternal]="true"
        categoryTag="Research"
        projectTag="HRA"
      >
      </hra-gallery-card>

      <hra-gallery-card
        tagline="Advanced Visualization Techniques for Anatomical Data"
        image="assets/ui-images/placeholder.png"
        imageAlt="Visualization Techniques"
        date="February 5, 2024"
        taglineUrl="https://humanatlas.io/visualization"
        [taglineExternal]="true"
        categoryTag="Tutorial"
        projectTag="HRA"
      >
      </hra-gallery-card>

      <hra-gallery-card
        tagline="Cell Type Analysis and Classification Methods"
        image="assets/ui-images/placeholder.png"
        imageAlt="Cell Type Analysis"
        date="March 20, 2024"
        taglineUrl="https://humanatlas.io/cell-types"
        [taglineExternal]="true"
        categoryTag="Analysis"
        projectTag="HRA"
      >
      </hra-gallery-card>

      <hra-gallery-card
        tagline="Spatial Transcriptomics and Gene Expression Patterns"
        image="assets/ui-images/placeholder.png"
        imageAlt="Spatial Transcriptomics"
        date="April 12, 2024"
        taglineUrl="https://humanatlas.io/transcriptomics"
        [taglineExternal]="true"
        categoryTag="Research"
        projectTag="HRA"
      >
      </hra-gallery-card>

      <hra-gallery-card
        tagline="3D Organ Reconstruction and Modeling Techniques"
        image="assets/ui-images/placeholder.png"
        imageAlt="3D Organ Reconstruction"
        date="May 8, 2024"
        taglineUrl="https://humanatlas.io/3d-reconstruction"
        [taglineExternal]="true"
        categoryTag="Tutorial"
        projectTag="HRA"
      >
      </hra-gallery-card>

      <hra-gallery-card
        tagline="Biomarker Discovery in Human Tissue Samples"
        image="assets/ui-images/placeholder.png"
        imageAlt="Biomarker Discovery"
        date="June 22, 2024"
        taglineUrl="https://humanatlas.io/biomarkers"
        [taglineExternal]="true"
        categoryTag="Analysis"
        projectTag="HRA"
      >
      </hra-gallery-card>
    </hra-grid-container>
    `,
  }),
};
