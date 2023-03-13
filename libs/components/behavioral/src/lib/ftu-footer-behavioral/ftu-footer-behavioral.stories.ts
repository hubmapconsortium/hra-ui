import { Meta, Story } from '@storybook/angular/types-6-0';
import { FtuFooterBehavioralComponent } from './ftu-footer-behavioral.component';

export default {
  title: 'Behavioral/FtuFooterBehavioralComponent',
  component: FtuFooterBehavioralComponent,
} as Meta;

const Template: Story<FtuFooterBehavioralComponent> = (args: FtuFooterBehavioralComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
