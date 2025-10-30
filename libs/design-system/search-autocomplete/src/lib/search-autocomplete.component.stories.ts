import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { SearchAutocompleteComponent, SearchAutocompleteOption } from './search-autocomplete.component';

const SAMPLE_OPTIONS: SearchAutocompleteOption[] = [
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

const meta: Meta<SearchAutocompleteComponent> = {
  component: SearchAutocompleteComponent,
  title: 'Design System/Search Autocomplete',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  args: {
    placeholder: 'Search',
    options: SAMPLE_OPTIONS,
    showCounter: true,
    sticky: false,
    disabled: false,
    ariaLabel: 'Search with autocomplete',
  },
};

export default meta;
type Story = StoryObj<SearchAutocompleteComponent>;

export const Default: Story = {
  args: {},
};
