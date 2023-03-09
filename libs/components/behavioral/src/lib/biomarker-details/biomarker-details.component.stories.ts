import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BiomarkerDetailsComponent } from './biomarker-details.component';
import { MatIconModule } from '@angular/material/icon';
import { DataItem } from '@hra-ui/components/molecules';

function createDataItem(label: string, value: string): DataItem {
  return { label, value };
}

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

const data = [
  [
    createDataItem('Functional Tissue Unit Name', 'Liver lobule'),
    createDataItem('New Uberon ID', 'UBERON1:0022285'),
    createDataItem('#Datasets1', '4'),
  ],
  [createDataItem('Cell Type Name', 'absorptive cell'), createDataItem('CL ID', 'CL:1119017')],
  [createDataItem('New Gene Name', 'RGMB'), createDataItem('Mean Expression Value', '0.0643')],
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
