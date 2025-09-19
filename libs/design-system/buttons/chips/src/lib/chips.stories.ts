import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Design System/Buttons/Chips',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1426-344',
    },
  },
  args: {
    disabled: false,
    closeButton: true,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the chip if true',
    },
    closeButton: {
      control: 'boolean',
      description: 'Shows or hides the close button',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, MatIconModule, MatChipsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mat-chip-row>
        Label
        @if (closeButton) {
          <button matChipRemove>
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-chip-row>
    `,
  }),
};

export const Group: Story = {
  render: (args) => ({
    props: args,
    template: `
    <mat-chip-set>
    @for (item of [1,2,3,4,5]; track item) {
      <mat-chip-row>
        Label
        @if (closeButton) {
          <button matChipRemove>
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-chip-row>
    }
    </mat-chip-set>
    `,
  }),
};
