import { MatIconModule } from '@angular/material/icon';
import { ResourceRegistryActions, ResourceRegistryState } from '@hra-ui/cdk/state';
import { DataItem } from '@hra-ui/components/molecules';
import { SourceRefsState } from '@hra-ui/state';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { BiomarkerDetailsComponent } from './biomarker-details.component';

export function createDataItem(label: string, value: string): DataItem {
  return { label, value };
}

export default {
  title: 'BiomarkerDetailsComponent',
  component: BiomarkerDetailsComponent,
  parameters: {
    state: {
      states: [ResourceRegistryState, SourceRefsState],
      actions: [
        new ResourceRegistryActions.LoadFromYaml('assets/resources/gradient.yml'),
        new ResourceRegistryActions.LoadFromYaml('assets/resources/size.yml'),
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
} as Meta<BiomarkerDetailsComponent>;

const Template: Story<BiomarkerDetailsComponent> = (args: BiomarkerDetailsComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
