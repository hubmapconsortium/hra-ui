import { DownloadState } from '@hra-ui/state';
import { NgxsModule } from '@ngxs/store';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DownloadButtonComponent } from './download-button.component';

export default {
  title: 'Atoms/DownloadButtonComponent',
  component: DownloadButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [NgxsModule.forRoot([])],
    }),
  ],
} as Meta<DownloadButtonComponent>;

const Template: Story<DownloadButtonComponent> = (args: DownloadButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
