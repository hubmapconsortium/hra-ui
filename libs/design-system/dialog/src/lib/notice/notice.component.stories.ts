import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'hra-dialog-demo',
  standalone: true,
  imports: [MatButtonModule],
  template: ` <button mat-flat-button (click)="openDialog()">Open Dialog</button> `,
})
class DialogDemoComponent {
  readonly tagline = input<string>('');
  readonly message = input<string>('');
  readonly actionLabel = input<string>();
  readonly actionClick = output();

  readonly dialogService = inject(DialogService);

  openDialog() {
    const actionLabel = this.actionLabel();
    const action =
      actionLabel !== undefined
        ? {
            label: actionLabel,
            callback: () => this.actionClick.emit(),
          }
        : undefined;
    this.dialogService.openNotice(this.tagline(), this.message(), action);
  }
}

const meta: Meta<DialogDemoComponent> = {
  component: DialogDemoComponent,
  title: 'DialogDemoComponent',
  args: {
    tagline: 'Dialog Title',
    message: 'Dialog Message',
  },
  argTypes: {
    tagline: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
    actionLabel: {
      control: 'text',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Explorer-Components?node-id=1115-364',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<DialogDemoComponent>;

export const WithAction: Story = {
  args: {
    tagline: 'No Data',
    message: 'We currently do not have cell type data for this biomarker. Please email us to discuss your dataset.',
    actionLabel: 'Copy Email',
  },
};

export const WithoutAction: Story = {
  args: {
    tagline: 'Heads up!',
    message: 'This website is optimized for Chrome or Firefox on a minimum resolution of 1280x832.',
  },
};
