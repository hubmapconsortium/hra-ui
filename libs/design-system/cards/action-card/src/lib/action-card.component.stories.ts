import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ActionCardActionComponent, ActionCardComponent } from './action-card.component';
import { ActionCardVariant } from './action-card.schema';
import { MatIconModule } from '@angular/material/icon';
import { GridContainerComponent } from '../../../../content-templates/grid-container/src/lib/grid-container.component';

interface WithContent {
  content?: string;
}

const meta: Meta<ActionCardComponent & WithContent> = {
  title: 'Design System/Cards/Action Card',
  component: ActionCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1309-2257',
    },
  },
  args: {
    image: 'assets/ui-images/placeholder.png',
    tagline: 'Label',
    subtagline: 'Small label',
    content: 'This is a placeholder one sentence short description and ideally it contains less than 125 characters.',
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, MatIconModule, ActionCardActionComponent, GridContainerComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ActionCardComponent & WithContent>;

function render(variant: ActionCardVariant, actions: string): Story['render'] {
  return (args) => ({
    props: args,
    template: `<hra-action-card variant="${variant}" [tagline]="tagline" [subtagline]="subtagline" [image]="image" [icons]="icons">
      ${args.content}
      ${actions}
    </hra-action-card>`,
    styles: [
      `
        a {
          font-family: Metropolis;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0px;
        }
      `,
    ],
  });
}

export const Elevated: Story = {
  render: render(
    'elevated',
    `<hra-action-card-action>
      <button mat-button>
        Action 1
      </button>
    </hra-action-card-action>
    <hra-action-card-action alignment="right">
      <button mat-flat-button>
        Action 2
      </button>
    </hra-action-card-action>`,
  ),
};

export const Flat: Story = {
  render: render(
    'flat',
    `<hra-action-card-action>
      <button mat-button hraCtaButton>
        Action 1
        <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>
      </button>
    </hra-action-card-action>
    <hra-action-card-action alignment="right">
      <button mat-button hraCtaButton hraSecondaryButton>
        Action 2
        <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>
      </button>
    </hra-action-card-action>`,
  ),
};

export const Outlined: Story = {
  render: render(
    'outlined',
    `<hra-action-card-action>
      <a hraHyperlink href="https://google.com">
        Action
      </a>
    </hra-action-card-action>`,
  ),
};

export const OutlinedWithIcons: Story = {
  args: {
    icons: ['misc:data'],
  },
  render: render(
    'outlined-with-icons',
    `<hra-action-card-action>
      <a hraHyperlink href="https://google.com">
        Action 1
      </a>
    </hra-action-card-action>
    <hra-action-card-action alignment="right">
      <a hraHyperlink href="https://google.com">
        Action 2
      </a>
    </hra-action-card-action>`,
  ),
};

export const ResponsiveCardGroup: Story = {
  args: {
    icons: ['misc:data'],
  },
  render: (args) => ({
    props: args,
    template: `
    <hra-grid-container>
      @for (i of [1,2,3,4,5,6,7,8,9]; track i) {
        <hra-action-card variant="outlined-with-icons" [tagline]="tagline" [subtagline]="subtagline" [image]="image" [icons]="icons">
          ${args.content}
          <hra-action-card-action>
            <a hraHyperlink href="https://google.com">
              Action 1
            </a>
          </hra-action-card-action>
          <hra-action-card-action alignment="right">
            <a hraHyperlink href="https://google.com">
              Action 2
            </a>
          </hra-action-card-action>
        </hra-action-card>
      }
    </hra-grid-container>
    `,
  }),
};

export const Gallery: Story = {
  args: {
    variant: 'gallery',
    tagline: 'Exploring the Human Reference Atlas: A Comprehensive Guide',
    image: 'assets/ui-images/placeholder.png',
    imageAlt: 'HRA Gallery Thumbnail',
    date: 'March 15, 2024',
    taglineUrl: 'https://humanatlas.io',
    taglineExternal: true,
    categoryTag: 'Research',
    projectTag: 'HRA',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="max-width: 400px;">
      <hra-action-card
        [variant]="variant"
        [tagline]="tagline"
        [image]="image"
        [imageAlt]="imageAlt"
        [date]="date"
        [taglineUrl]="taglineUrl"
        [taglineExternal]="taglineExternal"
        [categoryTag]="categoryTag"
        [projectTag]="projectTag"
      >
      </hra-action-card>
    </div>
    `,
  }),
};

export const GalleryGrid: Story = {
  args: {
    variant: 'gallery',
  },
  render: () => ({
    template: `
    <hra-grid-container>
      <hra-action-card
        variant="gallery"
        tagline="Understanding Tissue Mapping in the Human Body"
        image="assets/ui-images/placeholder.png"
        imageAlt="Tissue Mapping"
        date="January 10, 2024"
        taglineUrl="https://humanatlas.io/tissue-mapping"
        [taglineExternal]="true"
        categoryTag="Research"
        projectTag="HRA"
      >
      </hra-action-card>

      <hra-action-card
        variant="gallery"
        tagline="Advanced Visualization Techniques for Anatomical Data"
        image="assets/ui-images/placeholder.png"
        imageAlt="Visualization Techniques"
        date="February 5, 2024"
        taglineUrl="https://humanatlas.io/visualization"
        [taglineExternal]="true"
        categoryTag="Tutorial"
        projectTag="HRA"
      >
      </hra-action-card>

      <hra-action-card
        variant="gallery"
        tagline="Cell Type Analysis and Classification Methods"
        image="assets/ui-images/placeholder.png"
        imageAlt="Cell Type Analysis"
        date="March 20, 2024"
        taglineUrl="https://humanatlas.io/cell-types"
        [taglineExternal]="true"
        categoryTag="Analysis"
        projectTag="HRA"
      >
      </hra-action-card>

      <hra-action-card
        variant="gallery"
        tagline="Spatial Transcriptomics and Gene Expression Patterns"
        image="assets/ui-images/placeholder.png"
        imageAlt="Spatial Transcriptomics"
        date="April 12, 2024"
        taglineUrl="https://humanatlas.io/transcriptomics"
        [taglineExternal]="true"
        categoryTag="Research"
        projectTag="HRA"
      >
      </hra-action-card>

      <hra-action-card
        variant="gallery"
        tagline="3D Organ Reconstruction and Modeling Techniques"
        image="assets/ui-images/placeholder.png"
        imageAlt="3D Organ Reconstruction"
        date="May 8, 2024"
        taglineUrl="https://humanatlas.io/3d-reconstruction"
        [taglineExternal]="true"
        categoryTag="Tutorial"
        projectTag="HRA"
      >
      </hra-action-card>

      <hra-action-card
        variant="gallery"
        tagline="Biomarker Discovery in Human Tissue Samples"
        image="assets/ui-images/placeholder.png"
        imageAlt="Biomarker Discovery"
        date="June 22, 2024"
        taglineUrl="https://humanatlas.io/biomarkers"
        [taglineExternal]="true"
        categoryTag="Analysis"
        projectTag="HRA"
      >
      </hra-action-card>
    </hra-grid-container>
    `,
  }),
};
