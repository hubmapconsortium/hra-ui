import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  SecurityContext,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeValue } from '@angular/platform-browser';
import { BaseSvgIconDef, SvgIconDef } from './icon-registry.types';

export const SVG_ICON_DEFS = new InjectionToken<SvgIconDef[][]>('Svg icons');

export function provideIcons(defs: SvgIconDef[] = []): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SVG_ICON_DEFS,
      useValue: defs,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (reg: IconRegistryService) => () => reg.registerAll(),
      multi: true,
      deps: [IconRegistryService],
    },
  ]);
}

const enum DefType {
  Literal = 0,
  Url = 1 << 0,
  Named = 1 << 1,
  Namespaced = 1 << 2,

  NamedLiteral = Literal | Named,
  NamespacedLiteral = Literal | Namespaced,
  NamespacedNamedLiteral = Literal | Named | Namespaced,

  NamedUrl = Url | Named,
  NamespacedUrl = Url | Namespaced,
  NamespacedNamedUrl = Url | Named | Namespaced,
}

type RegistryDispatcher = (reg: MatIconRegistry, resource: SafeValue, def: BaseSvgIconDef) => void;

const REGISTRY_DISPATCH_TABLE: Record<DefType, RegistryDispatcher> = {
  [DefType.Url]: (reg, url, { options }) => reg.addSvgIconSet(url, options),
  [DefType.NamedUrl]: (reg, url, { name, options }) => reg.addSvgIcon(name ?? '', url, options),
  [DefType.NamespacedUrl]: (reg, url, { namespace, options }) =>
    reg.addSvgIconSetInNamespace(namespace ?? '', url, options),
  [DefType.NamespacedNamedUrl]: (reg, url, { name, namespace, options }) =>
    reg.addSvgIconInNamespace(namespace ?? '', name ?? '', url, options),

  [DefType.Literal]: (reg, literal, { options }) => reg.addSvgIconSetLiteral(literal, options),
  [DefType.NamedLiteral]: (reg, literal, { name, options }) => reg.addSvgIconLiteral(name ?? '', literal, options),
  [DefType.NamespacedLiteral]: (reg, literal, { namespace, options }) =>
    reg.addSvgIconSetLiteralInNamespace(namespace ?? '', literal, options),
  [DefType.NamespacedNamedLiteral]: (reg, literal, { name, namespace, options }) =>
    reg.addSvgIconLiteralInNamespace(namespace ?? '', name ?? '', literal, options),
};

function defHasValue(def: SvgIconDef, key: keyof SvgIconDef): boolean {
  return typeof def[key] === 'string';
}

function getDefType(def: SvgIconDef): DefType {
  const named = +defHasValue(def, 'name');
  const namespaced = +defHasValue(def, 'namespace');
  const hasUrl = +defHasValue(def, 'url');
  return (named * DefType.Named) | (namespaced * DefType.Namespaced) | (hasUrl * DefType.Url);
}

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private readonly registry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly defs = inject(SVG_ICON_DEFS, { optional: true });
  private allRegistered = false;

  registerAll(): void {
    if (!this.allRegistered && this.defs) {
      for (const outerDefArray of this.defs) {
        for (const def of outerDefArray) {
          this.register(def);
        }
      }
      this.allRegistered = true;
    }
  }

  register(def: SvgIconDef): void {
    const defType = getDefType(def);
    const resource = this.sanitizeResource(def);
    const dispatch = REGISTRY_DISPATCH_TABLE[defType];
    dispatch(this.registry, resource, def);
  }

  private sanitizeResource(def: SvgIconDef): SafeResourceUrl | SafeHtml {
    if (typeof def.url === 'string') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(def.url);
    } else {
      const safe = this.sanitizer.sanitize(SecurityContext.HTML, def.literal);
      return this.sanitizer.bypassSecurityTrustHtml(safe ?? '');
    }
  }
}
