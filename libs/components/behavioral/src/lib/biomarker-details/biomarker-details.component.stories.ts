import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BiomarkerDetailsComponent } from './biomarker-details.component';
import { MatIconModule } from '@angular/material/icon';

export default {
  title: 'BiomarkerDetailsComponent',
  component: BiomarkerDetailsComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
} as Meta<BiomarkerDetailsComponent>;

const Template: Story<BiomarkerDetailsComponent> = (args: BiomarkerDetailsComponent) => ({
  props: args,
});

export const data = [
  [
    {
      label: 'New Functional Tissue Unit Name',
      value: 'New Crypt of Lieberkuhn',
    },
    {
      label: 'New Uberon ID',
      value: 'UBERON1:0011185',
    },
    {
      label: '#Datasets1',
      value: '4',
    },
  ],
  [
    {
      label: 'New Cell Type Name',
      value: 'epithelial stem cell 1',
    },
    {
      label: 'CL ID',
      value: 'CL:0009017',
    },
    {
      label: 'Number of Cells',
      value: '186',
    },
  ],
  [
    {
      label: 'New Gene Name',
      value: 'RGMB',
    },
    {
      label: 'HGNC ID',
      value: 'HGNC:26897',
    },
    {
      label: 'New Mean Expression Value',
      value: '0.0643',
    },
  ],
];

export const Primary = Template.bind({});
Primary.args = {
  data: data,
  gradient: [
    { color: '#00385F', percentage: 0 },
    { color: '#63B1D3', percentage: 49.78 },
    { color: '#EDFAFD', percentage: 100 },
  ],
  sizes: [
    {
      label: '0%',
      radius: 0.5,
    },
    {
      label: '50%',
      radius: 1,
    },
    {
      label: '100%',
      radius: 1.5,
    },
  ],
  sources: [
    {
      title: 'Owner Title',
      link: 'google.com',
    },
    {
      title:
        '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
      link: 'google.com',
    },
  ],
};
