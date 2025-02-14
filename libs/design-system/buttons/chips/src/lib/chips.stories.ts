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
  render: () => ({
    template: `
      <mat-chip-row>
        Label
        <button matChipRemove>
          <mat-icon>close</mat-icon>
        </button>
      </mat-chip-row>
    `,
  }),
};

export const Group: Story = {
  render: () => ({
    template: `
    <mat-chip-grid>
      <mat-chip-row>
        Label
        <button matChipRemove>
          <mat-icon>close</mat-icon>
        </button>
      </mat-chip-row>
            <mat-chip-row>
        Label
        <button matChipRemove>
          <mat-icon>close</mat-icon>
        </button>
      </mat-chip-row>
            <mat-chip-row>
        Label
        <button matChipRemove>
          <mat-icon>close</mat-icon>
        </button>
      </mat-chip-row>
            <mat-chip-row>
        Label
        <button matChipRemove>
          <mat-icon>close</mat-icon>
        </button>
      </mat-chip-row>
    </mat-chip-grid>
    `,
  }),
};
