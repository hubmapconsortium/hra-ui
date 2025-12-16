import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { GalleryItem, GalleryViewComponent } from './gallery-view.component';
import { FilterMenuComponent, FilterOptionCategory } from '@hra-ui/design-system/filter-menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SearchListOption } from '@hra-ui/design-system/search-list';

const PICTURE_URL = 'assets/ui-images/placeholder.png';

const GALLERY_CARDS: GalleryItem[] = [
  {
    name: 'A',
    imageSrc: PICTURE_URL,
    date: 'March 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA'],
  },
  {
    name: 'AB',
    imageSrc: PICTURE_URL,
    date: 'March 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA', 'Test'],
  },
  {
    name: 'ABC',
    imageSrc: PICTURE_URL,
    date: 'June 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA', 'Label'],
  },
  {
    name: 'ABCD',
    imageSrc: PICTURE_URL,
    date: 'May 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['HRA'],
  },
  {
    name: 'ABCDE',
    imageSrc: PICTURE_URL,
    date: 'April 15, 2024',
    link: 'https://humanatlas.io',
    external: true,
    tags: ['Research', 'HRA'],
  },
];

const PROFILE_CARDS = [
  {
    name: 'Katy Börner',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Faculty, Center Director',
    actionText: 'Learn more',
  },
  {
    name: 'Andreas Bueckle',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Research Lead, Faculty',
    actionText: 'Learn more',
  },
  {
    name: 'Bruce W. Herr II',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Technical Director',
    actionText: 'Learn more',
  },
  {
    name: 'Lisel Record',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Associate Director',
    actionText: 'Learn more',
  },
  {
    name: 'Daniel Bolin',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Senior Software Developer',
    actionText: 'Learn more',
  },
  {
    name: 'Mike Gallant',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Assistant Director of IT',
    actionText: 'Learn more',
  },
  {
    name: 'Michael Ginda',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Senior Research Analyst',
    actionText: 'Learn more',
  },
  {
    name: 'Yashvardhan Jain',
    imageSrc: PICTURE_URL,
    link: 'https://humanatlas.io',
    description: 'Research Software Engineer - Machine Learning',
    actionText: 'Learn more',
  },
];

const FILTER_OPTIONS = [
  { id: 'a', label: 'A', count: 9999 },
  { id: 'ab', label: 'AB', count: 4299 },
  { id: 'abc', label: 'ABC', count: 1799 },
  { id: 'abcd', label: 'ABCD', count: 899 },
  { id: 'abcde', label: 'ABCDE', count: 499 },
  { id: 'abcdef', label: 'ABCDEF', count: 299 },
  { id: 'abcdefg', label: 'ABCDEFG', count: 199 },
  { id: 'abcdefgh', label: 'BACDEFGH', count: 99 },
] as SearchListOption[];

const FILTER_CATEGORIES = [
  { id: 'category1', label: 'Category 1', options: FILTER_OPTIONS },
  { id: 'category2', label: 'Category 2', options: FILTER_OPTIONS },
  { id: 'category3', label: 'Category 3', options: FILTER_OPTIONS },
  { id: 'category4', label: 'Category 4', options: FILTER_OPTIONS },
  { id: 'category5', label: 'Category 5', options: FILTER_OPTIONS },
  { id: 'category6', label: 'Category 6', options: FILTER_OPTIONS },
  { id: 'category7', label: 'Category 7', options: FILTER_OPTIONS },
  { id: 'category8', label: 'Category 8', options: FILTER_OPTIONS },
  { id: 'category9', label: 'Category 9', options: FILTER_OPTIONS },
  { id: 'category10', label: 'Category 10', options: FILTER_OPTIONS },
] as FilterOptionCategory<SearchListOption>[];

const CUSTOM_CONTROLS = `
<mat-button-toggle-group class="toggle-group" [value]="toggleOptions[0]">
  @for (category of toggleOptions; track category.id) {
    <mat-button-toggle hraClickEvent [hraFeature]="category.id" [value]="category">
      {{ category.label }}
    </mat-button-toggle>
  }
</mat-button-toggle-group>

<mat-form-field subscriptSizing="dynamic">
  <hra-icon class="select-icon" matPrefix>table_view</hra-icon>
  <mat-label>View as</mat-label>
  <mat-select>
    @for (option of viewAsOptions; track option) {
      <mat-option [value]="option.id">{{ option.label }}</mat-option>
    }
  </mat-select>
</mat-form-field>

<mat-form-field subscriptSizing="dynamic">
  <hra-icon class="select-icon" matPrefix>sort</hra-icon>
  <mat-label>Sort by</mat-label>
  <mat-select>
    @for (option of sortByOptions; track option) {
      <mat-option [value]="option.id">{{ option.label }}</mat-option>
    }
  </mat-select>
</mat-form-field>

<mat-form-field subscriptSizing="dynamic">
  <hra-icon class="select-icon" matPrefix>category</hra-icon>
  <mat-label>Group by</mat-label>
  <mat-select>
    @for (option of filters; track option) {
      <mat-option [value]="option.id">{{ option.label }}</mat-option>
    }
  </mat-select>
</mat-form-field>
`;

const STYLES = `.hra-app {
    height: calc(100vh - 3rem);
  }
  button {
    position: absolute;
    right: 0;
    z-index: 2;
  }
  .toggle-group {
    width: fit-content;
    max-width: 100%;
    --mat-button-toggle-height: 2rem;
  }
  mat-button-toggle {
      font: var(--mat-sys-label-medium);
  }
  mat-label {
    font: var(--mat-sys-label-medium);
    --mat-form-field-filled-label-text-color: var(--mat-sys-primary);
  }
  .select-icon {
    padding-left: 0.75rem;
    padding-right: 0.5rem;
    --mat-form-field-leading-icon-color: var(--mat-sys-secondary);
  }
`;

const meta: Meta = {
  title: 'Design System/Content Templates/Gallery View',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=12642-57693&t=Hhug8Q6yf6QcFAL9-4',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        GalleryViewComponent,
        FilterMenuComponent,
        HraCommonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        IconsModule,
        MatSelectModule,
      ],
    }),
  ],
  args: {
    filters: FILTER_CATEGORIES,
    toggleOptions: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' },
    ],
    viewAsOptions: [
      { id: 'table', label: 'Table' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'list', label: 'List' },
    ],
    sortByOptions: [
      { id: 'nameAsc', label: 'Name ascending' },
      { id: 'nameDesc', label: 'Name descending' },
      { id: 'oldest', label: 'Oldest' },
      { id: 'newest', label: 'Newest' },
      { id: 'hierachical', label: 'Hierarchical' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
    <hra-gallery-view [galleryCards]="galleryCards" [variant]="variant" #gallery>
      <hra-filter-menu tagline="Research at the Cyberinfrastructure for Network Science Center" [filters]="filters">
        ${CUSTOM_CONTROLS}
      </hra-filter-menu>
    </hra-gallery-view>
    `,
    styles: [STYLES],
  }),
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  args: {
    galleryCards: GALLERY_CARDS,
    variant: 'gallery',
  },
};

export const Profile: Story = {
  args: {
    galleryCards: PROFILE_CARDS,
    variant: 'profile',
  },
};
