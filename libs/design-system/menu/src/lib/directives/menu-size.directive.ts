import { Directive, effect, inject, input } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

/** Type for Menu Sizes */
export type MenuSize = 'small' | 'medium' | 'large';

/** Menu Size Directive */
@Directive({
  selector: '[hraMenuSize]',
  standalone: true,
})
export class MenuSizeDirective {
  /** Size of menu to use */
  readonly size = input<MenuSize>('medium', { alias: 'hraMenuSize' });

  /** Instance of Mat Menu */
  protected readonly menu = inject(MatMenu);

  /** Cleanup the previous panel class and assign the current */
  constructor() {
    effect((onCleanup) => {
      const { menu } = this;
      const cls = ` ${this.size()}`;
      menu.panelClass = this.getPanelClass() + cls;

      onCleanup(() => (menu.panelClass = this.getPanelClass().replace(cls, '')));
    });
  }

  /** Utility function to get the panel class because they dont have the getter for panelClass in mat menu */
  private getPanelClass(): string {
    // WARNING: Pulling from internals since panelClass doesn't have a getter.
    // May break in the future!
    return (this.menu as unknown as { _previousPanelClass: string })._previousPanelClass;
  }
}
