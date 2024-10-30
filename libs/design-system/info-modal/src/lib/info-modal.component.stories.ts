import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { InfoModalComponent } from './info-modal.component';

const meta: Meta = {
  component: InfoModalComponent,
  title: 'InfoModalComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/Explorer-Design-System-Repository?node-id=5756-23245&t=TKx0gfqZQ8ctOHR4-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<InfoModalComponent>;

export const Tabular: Story = {
  args: {
    title: 'Cell Type by Biomarker Info',
    data: [
      { label: 'Functional Tissue Unit Name', value: 'Loop of Henle ascending limb thin segment' },
      { label: 'Uberon ID', value: 'Uberon ID Placeholder' },
      { label: 'Number of Datasets', value: '214' },
      { label: 'Cell Type Name', value: 'Kidney loop of Henle thin ascending limb epithelial cell' },
      { label: 'CL ID', value: 'CL: 1001234' },
      { label: 'Number of Cells', value: '4,532' },
      { label: 'Gene Name', value: 'AKAP9' },
      { label: 'HGNC ID', value: 'HGNC:954' },
      { label: 'Mean Expression Value', value: '0.235045' },
    ],
  },
};

export const Center: Story = {
  args: {
    variant: 'center',
    title: 'Cell Info',
    data: [
      { label: 'Cell Type', value: 'Ki67+ Tumor/Epithelial' },
      { label: 'CL ID', value: 'CL:1000452' },
      { label: 'Distance to Closest Anchor Cell', value: '45 µm' },
      { label: 'X Coordinate', value: '2,991.02 µm' },
      { label: 'Y Coordinate', value: '5,310.57 µm' },
      { label: 'Z Coordinate', value: '8,635.05 µm' },
    ],
  },
};
