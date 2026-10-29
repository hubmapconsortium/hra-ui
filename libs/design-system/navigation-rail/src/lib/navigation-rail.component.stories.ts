import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NavigationRailComponent } from './navigation-rail.component';
import { NavigationRailModule } from './navigation-rail.module';

const meta: Meta<NavigationRailComponent> = {
  title: 'Design System/Navigation Rail',
  component: NavigationRailComponent,
  parameters: {
    docs: {
      description: {
        component:
          'A vertical rail of app-wide actions, styled after the Material 3 navigation rail. ' +
          'Items open menus, drawers and dialogs, follow links, or toggle state. ' +
          'Drawers, toggles and the current page show the active indicator; an open menu gets a light highlight. ' +
          'Long labels wrap to two lines, and a plain tooltip beside the rail can describe what each item does. ' +
          'The rail is a toolbar: it takes one tab stop, and the arrow keys, Home and End move between items. ' +
          'Colors and label type come from the app theme, and each can be overridden with a ' +
          '--hra-navigation-rail-* token. ' +
          'The Cell Distance Explorer uses it first. FTU Explorer and the Exploration User Interface ' +
          '(and the Multiscale Model Explorer, which embeds it) will follow.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NavigationRailModule, MatDividerModule, MatIconModule, MatMenuModule, PlainTooltipDirective],
    }),
  ],
};
export default meta;

type Story = StoryObj<NavigationRailComponent>;

/**
 * Container that gives the rail a height. It also sets the label role to AtlasNG HRA's label-medium
 * (Nunito Sans 600, 12/16), as CDE's theme does, since this Storybook's theme predates AtlasNG.
 */
const FRAME_STYLES = [
  `.frame {
    --mat-sys-label-medium-font: 'Nunito Sans Variable';
    --mat-sys-label-medium-size: 0.75rem;
    --mat-sys-label-medium-weight: 600;
    --mat-sys-label-medium-line-height: 1rem;
    --mat-sys-label-medium-tracking: 0.031rem;
    display: flex;
    height: 40rem;
    border: 1px solid var(--mat-sys-outline-variant);
  }`,
];

export const AppActions: Story = {
  name: 'App actions',
  render: () => ({
    props: { downloadsOpen: false, cellLinks: true, allMetadata: false },
    styles: FRAME_STYLES,
    template: `
      <div class="frame">
        <hra-navigation-rail aria-label="Visualization actions">
          <button hraNavigationRailItem icon="layers" [matMenuTriggerFor]="display"
            hraPlainTooltip="Choose what the visualization shows">
            Display
          </button>
          <button hraNavigationRailItem icon="restart_alt" [matMenuTriggerFor]="reset"
            hraPlainTooltip="Reset the view, deleted cells or colors">
            Reset
          </button>
          <mat-divider />
          <button hraNavigationRailItem icon="download" [active]="downloadsOpen" (click)="downloadsOpen = !downloadsOpen"
            hraPlainTooltip="Download data and images">
            Downloads
          </button>
          <a hraNavigationRailItem icon="code" href="https://github.com/hubmapconsortium/hra-ui" target="_blank" rel="noopener noreferrer"
            hraPlainTooltip="Embed this visualization in a website">
            Embed
          </a>
          <button hraNavigationRailItem icon="info" hraNavigationRailBottom hraPlainTooltip="About this visualization">
            Info
          </button>
          <button hraNavigationRailItem icon="help" hraNavigationRailBottom [matMenuTriggerFor]="help"
            hraPlainTooltip="Guides and documentation">
            Help
          </button>
        </hra-navigation-rail>
      </div>

      <mat-menu #display="matMenu" hraNavigationRailMenu>
        <button mat-menu-item role="menuitemcheckbox" [attr.aria-checked]="cellLinks"
          (click)="$event.stopPropagation(); cellLinks = !cellLinks">
          <mat-icon>{{ cellLinks ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
          Cell links
        </button>
        <button mat-menu-item role="menuitemcheckbox" [attr.aria-checked]="allMetadata"
          (click)="$event.stopPropagation(); allMetadata = !allMetadata">
          <mat-icon>{{ allMetadata ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
          All metadata
        </button>
      </mat-menu>

      <mat-menu #reset="matMenu" hraNavigationRailMenu>
        <button mat-menu-item>Reset view</button>
        <button mat-menu-item disabled>Restore deleted cells</button>
        <button mat-menu-item>Reset colors</button>
      </mat-menu>

      <mat-menu #help="matMenu" hraNavigationRailMenu yPosition="above">
        <a mat-menu-item href="https://humanatlas.io" target="_blank" rel="noopener noreferrer">Guide</a>
      </mat-menu>
    `,
  }),
};

export const Toggles: Story = {
  render: () => ({
    props: { anatomicalStructures: true, cellTypes: false, biomarkers: false },
    styles: FRAME_STYLES,
    template: `
      <div class="frame">
        <hra-navigation-rail aria-label="Panels">
          <button hraNavigationRailItem icon="accessibility_new" [attr.aria-pressed]="anatomicalStructures"
            (click)="anatomicalStructures = !anatomicalStructures" hraPlainTooltip="Show or hide anatomical structures">
            Anatomical structures
          </button>
          <button hraNavigationRailItem icon="bubble_chart" [attr.aria-pressed]="cellTypes" (click)="cellTypes = !cellTypes"
            hraPlainTooltip="Show or hide cell types">
            Cell types
          </button>
          <button hraNavigationRailItem icon="biotech" [attr.aria-pressed]="biomarkers" (click)="biomarkers = !biomarkers"
            hraPlainTooltip="Show or hide biomarkers">
            Biomarkers
          </button>
        </hra-navigation-rail>
      </div>
    `,
  }),
};

export const Links: Story = {
  render: () => ({
    props: { current: 'library' },
    styles: FRAME_STYLES,
    template: `
      <div class="frame">
        <hra-navigation-rail aria-label="Pages">
          <a hraNavigationRailItem icon="home" href="#home"
            [attr.aria-current]="current === 'home' ? 'page' : null" (click)="current = 'home'">
            Home
          </a>
          <a hraNavigationRailItem icon="menu_book" href="#library"
            [attr.aria-current]="current === 'library' ? 'page' : null" (click)="current = 'library'">
            Library
          </a>
          <button hraNavigationRailItem icon="help" hraNavigationRailBottom disabled>Help</button>
        </hra-navigation-rail>
      </div>
    `,
  }),
};
