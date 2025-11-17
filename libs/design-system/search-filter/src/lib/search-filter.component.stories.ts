import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { SearchFilterComponent, SearchFilterOption } from './search-filter.component';

const SAMPLE_OPTIONS: SearchFilterOption[] = [
  { label: 'Liver', value: 'liver' },
  { label: 'Heart', value: 'heart' },
  { label: 'Kidney', value: 'kidney' },
  { label: 'Lung', value: 'lung' },
  { label: 'Brain', value: 'brain' },
  { label: 'Stomach', value: 'stomach' },
  { label: 'Intestine', value: 'intestine' },
  { label: 'Pancreas', value: 'pancreas' },
  { label: 'Spleen', value: 'spleen' },
  { label: 'Bladder', value: 'bladder' },
  { label: 'Esophagus', value: 'esophagus' },
  { label: 'Gallbladder', value: 'gallbladder' },
  { label: 'Thyroid', value: 'thyroid' },
  { label: 'Adrenal Gland', value: 'adrenal-gland' },
  { label: 'Prostate', value: 'prostate' },
  { label: 'Uterus', value: 'uterus' },
  { label: 'Bone Marrow', value: 'bone-marrow' },
  { label: 'Lymph Node', value: 'lymph-node' },
];

const meta: Meta<SearchFilterComponent> = {
  component: SearchFilterComponent,
  title: 'Design System/Search Filter',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  args: {
    label: 'Search',
    options: SAMPLE_OPTIONS,
  },
};

export default meta;
type Story = StoryObj<SearchFilterComponent>;

export const Default: Story = {
  args: {},
};
