import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, input, booleanAttribute, computed, inject, ChangeDetectionStrategy, Component, NgModule, InjectionToken, assertInInjectionContext, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import * as i1 from '@angular/material/icon';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { assetUrl, joinWithSlash } from '@hra-ui/common/url';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';
import { coerceArray } from '@angular/cdk/coercion';

/** Services that manages configuration for svg icons */
class IconConfigRegistryService {
    /** Cache of configurations */
    configs = new Map();
    /** List of resolvers to call when determining the configuration */
    resolvers = [];
    /**
     * Adds a resolver to call when determining an icon's configuration.
     * Resolvers are called in the order they are registered and
     * the the registry stops at the first resolver that returns configuration.
     *
     * @param resolver The new resolver
     * @returns `this` for chaining
     */
    addIconConfigResolver(resolver) {
        this.resolvers.push(resolver);
        return this;
    }
    /**
     * Set the configuration for a specific icon
     *
     * @param name Icon name
     * @param namespace Icon namespace
     * @param config New configuration
     * @returns `this` for chaining
     */
    setIconConfig(name, namespace, config) {
        if (namespace === undefined) {
            [namespace, name] = this.splitIconName(name);
        }
        this.configs.set(`${namespace}:${name}`, config);
        return this;
    }
    /**
     * Get configuration for an icon, querying the resolvers if necessary
     *
     * @param name Icon name
     * @param namespace Icon namespace
     * @returns The associated configuration if available, otherwise undefined
     */
    getIconConfig(name, namespace) {
        if (namespace === undefined) {
            [namespace, name] = this.splitIconName(name);
        }
        const { configs } = this;
        const key = `${namespace}:${name}`;
        if (!configs.has(key)) {
            configs.set(key, this.getIconConfigFromResolvers(name, namespace));
        }
        return configs.get(key);
    }
    /**
     * Iterates over each resolver to get configuration for an icon
     *
     * @param name Icon name
     * @param namespace Icon namespace
     * @returns Configuration produced by the resolvers or undefined if no resolver returned configuration
     */
    getIconConfigFromResolvers(name, namespace) {
        for (const resolver of this.resolvers) {
            const result = resolver(name, namespace);
            if (result) {
                return result;
            }
        }
        return undefined;
    }
    /**
     * Splits a icon name into a namespace and name
     *
     * @param name Icon name
     * @returns A tuple `[namespace, name]`
     */
    splitIconName(name) {
        const parts = name.split(':');
        if (parts.length === 1) {
            return ['', parts[0]];
        }
        else if (parts.length === 2) {
            return parts;
        }
        throw new Error(`Invalid icon name: "${name}"`);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconConfigRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconConfigRegistryService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconConfigRegistryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Design system icon.
 * Wraps mat-icon to provide additional functionality.
 */
class IconComponent {
    /** Data packed into an `IconData` object */
    icon = input(...(ngDevMode ? [undefined, { debugName: "icon" }] : []));
    /** Svg icon in format `[namespace:]name` */
    svgIcon = input(...(ngDevMode ? [undefined, { debugName: "svgIcon" }] : []));
    /** Font icon name */
    fontIcon = input(...(ngDevMode ? [undefined, { debugName: "fontIcon" }] : []));
    /** Font icon set */
    fontSet = input(...(ngDevMode ? [undefined, { debugName: "fontSet" }] : []));
    /** Whether the icon should inherit it's size from the containing context */
    inline = input(undefined, ...(ngDevMode ? [{ debugName: "inline", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Resolved svg icon */
    svgIcon_ = this.selectValue('svgIcon', '');
    /** Resolved font icon */
    fontIcon_ = this.selectValue('fontIcon', '');
    /** Resolved font set */
    fontSet_ = this.selectValue('fontSet', '');
    /** Resolved inline */
    inline_ = this.selectValue('inline', false);
    /** Icon configuration from the configuration service */
    svgConfig = computed(() => {
        const icon = this.svgIcon_();
        return icon ? this.configRegistry.getIconConfig(icon) : undefined;
    }, ...(ngDevMode ? [{ debugName: "svgConfig" }] : []));
    /** Configuration registry */
    configRegistry = inject(IconConfigRegistryService);
    /**
     * Resolves an input value based on both the input signal and the packed `icon` input data.
     *
     * @param key Icon data key
     * @param defaultValue Default value
     * @returns A signal containing the resolved value for the key
     */
    selectValue(key, defaultValue) {
        return computed(() => (this[key]() || this.icon()?.[key] || defaultValue));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: IconComponent, isStandalone: true, selector: "hra-icon", inputs: { icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, svgIcon: { classPropertyName: "svgIcon", publicName: "svgIcon", isSignal: true, isRequired: false, transformFunction: null }, fontIcon: { classPropertyName: "fontIcon", publicName: "fontIcon", isSignal: true, isRequired: false, transformFunction: null }, fontSet: { classPropertyName: "fontSet", publicName: "fontSet", isSignal: true, isRequired: false, transformFunction: null }, inline: { classPropertyName: "inline", publicName: "inline", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.hra-icon-filled": "!!svgConfig()?.backgroundColor", "style.color": "svgConfig()?.color || null", "style.background-color": "svgConfig()?.backgroundColor || null" } }, ngImport: i0, template: "<mat-icon [svgIcon]=\"svgIcon_()\" [fontIcon]=\"fontIcon_()\" [fontSet]=\"fontSet_()\" [inline]=\"inline_()\">\n  <ng-content />\n</mat-icon>\n", styles: [":host{display:inline-flex;justify-content:center;align-items:center}:host mat-icon{width:inherit;height:inherit}:host.hra-icon-filled{width:2.5rem;height:2.5rem;border-radius:var(--mat-sys-corner-full)}:host.hra-icon-filled mat-icon{width:60%;height:60%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-icon', imports: [CommonModule, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.hra-icon-filled]': '!!svgConfig()?.backgroundColor',
                        '[style.color]': 'svgConfig()?.color || null',
                        '[style.background-color]': 'svgConfig()?.backgroundColor || null',
                    }, template: "<mat-icon [svgIcon]=\"svgIcon_()\" [fontIcon]=\"fontIcon_()\" [fontSet]=\"fontSet_()\" [inline]=\"inline_()\">\n  <ng-content />\n</mat-icon>\n", styles: [":host{display:inline-flex;justify-content:center;align-items:center}:host mat-icon{width:inherit;height:inherit}:host.hra-icon-filled{width:2.5rem;height:2.5rem;border-radius:var(--mat-sys-corner-full)}:host.hra-icon-filled mat-icon{width:60%;height:60%}\n"] }]
        }], propDecorators: { icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], svgIcon: [{ type: i0.Input, args: [{ isSignal: true, alias: "svgIcon", required: false }] }], fontIcon: [{ type: i0.Input, args: [{ isSignal: true, alias: "fontIcon", required: false }] }], fontSet: [{ type: i0.Input, args: [{ isSignal: true, alias: "fontSet", required: false }] }], inline: [{ type: i0.Input, args: [{ isSignal: true, alias: "inline", required: false }] }] } });

/**
 * Exports all icon related components, etc.
 * Also reexports the material icon module
 */
class IconsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: IconsModule, imports: [IconComponent], exports: [MatIconModule, IconComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconsModule, imports: [IconComponent, MatIconModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IconsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IconComponent],
                    exports: [MatIconModule, IconComponent],
                }]
        }] });

/** Token with the default font icon classes */
const FONT_ICONS_CLASSES = new InjectionToken('FONT_ICONS_CLASSES', {
    providedIn: 'root',
    factory: () => ['material-symbols-rounded'],
});
/** Token with the svg icon directory */
const SVG_ICON_DIRECTORY = new InjectionToken('SVG_ICON_DIRECTORY', {
    providedIn: 'root',
    factory: () => 'assets/icons/',
});

/**
 * Creates a new resolver that resolves svg icons by
 * concatenating the svg icon directory with the icon
 * namespace and name.
 *
 * @returns An icon resolver
 */
function createSvgIconResolver() {
    assertInInjectionContext(createSvgIconResolver);
    const directory = inject(SVG_ICON_DIRECTORY);
    const sanitizer = inject(DomSanitizer);
    const baseUrl = assetUrl(directory);
    return (name, namespace) => {
        let path = baseUrl();
        path = joinWithSlash(path, namespace);
        path = joinWithSlash(path, `${name}.svg`);
        return sanitizer.bypassSecurityTrustResourceUrl(path);
    };
}

/**
 * Initializes design system icons by configuring material's icon registry
 */
function initializeIcons() {
    const registry = inject(MatIconRegistry);
    const classes = [...registry.getDefaultFontSetClass(), ...inject(FONT_ICONS_CLASSES)];
    registry.setDefaultFontSetClass(...classes);
    registry.addSvgIconResolver(createSvgIconResolver());
}

/**
 * Helper for creating icon feature objects
 *
 * @param kind Feature kind
 * @param providers Array of providers for the feature
 * @returns A new feature object
 */
function makeIconFeature(kind, providers) {
    return { __kind: kind, __providers: providers };
}
/**
 * Set the default font icon classes
 *
 * @param classes Default font icon classes
 */
function withFontIconClasses(classes) {
    return makeIconFeature(0 /* IconFeatureKind.FontIconClasses */, [
        {
            provide: FONT_ICONS_CLASSES,
            useValue: classes,
        },
    ]);
}
/**
 * Set the svg icon directory
 *
 * @param directory Icon directory
 */
function withSvgIconDirectory(directory) {
    return makeIconFeature(1 /* IconFeatureKind.SvgIconDirectory */, [
        {
            provide: SVG_ICON_DIRECTORY,
            useValue: directory,
        },
    ]);
}
/**
 * Setups design system icons
 *
 * @param features Additional icon features
 */
function provideIcons(...features) {
    return makeEnvironmentProviders([
        provideEnvironmentInitializer(initializeIcons),
        ...features.map((feature) => feature.__providers).flat(),
    ]);
}

/** Schema for icon data */
const IconDataSchema = z
    .object({
    svgIcon: z.string().optional(),
    fontIcon: z.string().optional(),
    fontSet: z.string().optional(),
    inline: z.boolean().optional(),
})
    .meta({ id: 'IconData' });
/** Schema for icon content template */
const IconSchema = ContentTemplateSchema.extend({
    component: z.literal('Icon'),
})
    .merge(IconDataSchema)
    .meta({ id: 'Icon' });
/** Schema for icon list */
const IconListSchema = z
    .union([z.union([z.string(), IconDataSchema]), z.union([z.string(), IconDataSchema]).array()])
    .meta({ id: 'IconList' });

/** Icon content template definition */
const IconDef = {
    component: IconComponent,
    spec: IconSchema,
};

/**
 * Coerces mixed format icons into a list of icon object that
 * can be passed directly into hra-icon's `[icon]` input or
 * into a hraContentTemplateOutlet
 *
 * @param list Mixed format icon list
 * @returns A list of icon objects
 */
function coerceIconList(list = []) {
    return coerceArray(list).map((value) => {
        if (typeof value === 'string') {
            return { component: 'Icon', svgIcon: value };
        }
        return { component: 'Icon', ...value };
    });
}

/**
 * Generated bundle index. Do not edit.
 */

export { IconComponent, IconConfigRegistryService, IconDataSchema, IconDef, IconListSchema, IconSchema, IconsModule, coerceIconList, provideIcons, withFontIconClasses, withSvgIconDirectory };
//# sourceMappingURL=hra-ui-design-system-icons.mjs.map
