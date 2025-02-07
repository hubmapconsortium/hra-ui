import { coerceArray } from '@angular/cdk/coercion';
import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MenuDivider, MenuGroup, MenuItem, MenuSubGroup } from '../types/menus.schema';

export type MenuObject = MenuDivider | MenuGroup | MenuItem | MenuSubGroup;

interface BaseMenuObjectContext<C> {
  $implicit: C;
  templates: MenuTemplates;
}

interface ContextExtras {
  divider: Record<string, never>;
  group: Record<string, never>;
  item: { indent?: number };
  subgroup: Record<string, never>;
}

export type MenuObjectContexts = {
  [Obj in MenuObject as Obj['type']]: BaseMenuObjectContext<Obj> & ContextExtras[Obj['type']];
};

export type MenuTemplates = {
  [Obj in MenuObject as Obj['type']]?: TemplateRef<MenuObjectContexts[Obj['type']]>;
};

@Directive()
export class MenuObjectDirective<C> {
  readonly template = inject<TemplateRef<C>>(TemplateRef);
}

@Directive({
  selector: 'ng-template[hraMenuDivider]',
  standalone: true,
})
export class MenuDividerDirective extends MenuObjectDirective<MenuObjectContexts['divider']> {
  static ngTemplateContextGuard(_dir: MenuDividerDirective, _ctx: unknown): _ctx is MenuObjectContexts['divider'] {
    return true;
  }
}

@Directive({
  selector: 'ng-template[hraMenuGroup]',
  standalone: true,
})
export class MenuGroupDirective extends MenuObjectDirective<MenuObjectContexts['group']> {
  static ngTemplateContextGuard(_dir: MenuGroupDirective, _ctx: unknown): _ctx is MenuObjectContexts['group'] {
    return true;
  }
}

@Directive({
  selector: 'ng-template[hraMenuItem]',
  standalone: true,
})
export class MenuItemDirective extends MenuObjectDirective<MenuObjectContexts['item']> {
  static ngTemplateContextGuard(_dir: MenuItemDirective, _ctx: unknown): _ctx is MenuObjectContexts['item'] {
    return true;
  }
}

@Directive({
  selector: 'ng-template[hraMenuSubGroup]',
  standalone: true,
})
export class MenuSubGroupDirective extends MenuObjectDirective<MenuObjectContexts['subgroup']> {
  static ngTemplateContextGuard(_dir: MenuSubGroupDirective, _ctx: unknown): _ctx is MenuObjectContexts['subgroup'] {
    return true;
  }
}

@Directive({
  selector: '[hraMenuObjectOutlet]',
  standalone: true,
})
export class MenuObjectOutletDirective {
  readonly items = input.required<MenuObject | MenuObject[]>({ alias: 'hraMenuObjectOutlet' });
  readonly templates = input.required<MenuTemplates>({ alias: 'hraMenuObjectOutletTemplates' });
  readonly context = input<Record<string, unknown>>({}, { alias: 'hraMenuObjectOutletContext' });

  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect((cleanup) => {
      this.render();
      cleanup(() => this.viewContainerRef.clear());
    });
  }

  private render(): void {
    const { items, templates, context, viewContainerRef } = this;
    const objects = coerceArray(items());
    const refs = templates();
    const baseContext = { ...context(), templates: refs };

    for (const obj of objects) {
      const template = refs[obj.type];
      if (template) {
        const context = { ...baseContext, $implicit: obj } satisfies BaseMenuObjectContext<MenuObject>;
        viewContainerRef.createEmbeddedView(template, context);
      }
    }
  }
}
