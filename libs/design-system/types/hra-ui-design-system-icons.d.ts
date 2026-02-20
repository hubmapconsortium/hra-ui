import * as _hra_ui_design_system_icons from '@hra-ui/design-system/icons';
import * as i0 from '@angular/core';
import { Signal, Provider, EnvironmentProviders } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Design system icon.
 * Wraps mat-icon to provide additional functionality.
 */
declare class IconComponent {
    /** Data packed into an `IconData` object */
    readonly icon: i0.InputSignal<{
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    } | undefined>;
    /** Svg icon in format `[namespace:]name` */
    readonly svgIcon: i0.InputSignal<string | undefined>;
    /** Font icon name */
    readonly fontIcon: i0.InputSignal<string | undefined>;
    /** Font icon set */
    readonly fontSet: i0.InputSignal<string | undefined>;
    /** Whether the icon should inherit it's size from the containing context */
    readonly inline: i0.InputSignalWithTransform<boolean | undefined, unknown>;
    /** Resolved svg icon */
    protected readonly svgIcon_: Signal<string>;
    /** Resolved font icon */
    protected readonly fontIcon_: Signal<string>;
    /** Resolved font set */
    protected readonly fontSet_: Signal<string>;
    /** Resolved inline */
    protected readonly inline_: Signal<NonNullable<boolean | undefined>>;
    /** Icon configuration from the configuration service */
    protected readonly svgConfig: Signal<_hra_ui_design_system_icons.IconConfig | undefined>;
    /** Configuration registry */
    private readonly configRegistry;
    /**
     * Resolves an input value based on both the input signal and the packed `icon` input data.
     *
     * @param key Icon data key
     * @param defaultValue Default value
     * @returns A signal containing the resolved value for the key
     */
    private selectValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "hra-icon", never, { "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "svgIcon": { "alias": "svgIcon"; "required": false; "isSignal": true; }; "fontIcon": { "alias": "fontIcon"; "required": false; "isSignal": true; }; "fontSet": { "alias": "fontSet"; "required": false; "isSignal": true; }; "inline": { "alias": "inline"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/**
 * Exports all icon related components, etc.
 * Also reexports the material icon module
 */
declare class IconsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IconsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IconsModule, never, [typeof IconComponent], [typeof i2.MatIconModule, typeof IconComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IconsModule>;
}

/**
 * Enum of all icon feature kinds
 */
declare const enum IconFeatureKind {
    FontIconClasses = 0,
    SvgIconDirectory = 1
}
/**
 * An icon feature object. All properties are internal!
 */
interface IconFeature<KindT extends IconFeatureKind> {
    /** Feature kind */
    __kind: KindT;
    /** Feature providers */
    __providers: (Provider | EnvironmentProviders)[];
}
/**
 * All icon features
 */
type IconFeatures = FontIconClassesFeature | SvgIconDirectoryFeature;
/** Font icon classes feature */
type FontIconClassesFeature = IconFeature<IconFeatureKind.FontIconClasses>;
/**
 * Set the default font icon classes
 *
 * @param classes Default font icon classes
 */
declare function withFontIconClasses(classes: string[]): FontIconClassesFeature;
/** Svg icon directory feature */
type SvgIconDirectoryFeature = IconFeature<IconFeatureKind.SvgIconDirectory>;
/**
 * Set the svg icon directory
 *
 * @param directory Icon directory
 */
declare function withSvgIconDirectory(directory: string): SvgIconDirectoryFeature;
/**
 * Setups design system icons
 *
 * @param features Additional icon features
 */
declare function provideIcons(...features: IconFeatures[]): EnvironmentProviders;

/** Configuration that can be associated with a svg icon */
interface IconConfig {
    /** Icon fill color */
    color?: string;
    /** Icon background color */
    backgroundColor?: string;
}
/**
 * An icon configuration resolver callback function.
 * Returning undefined from a resolver instructs the registry to
 * continue calling other resolvers to determine the configuration
 */
type IconConfigResolver = (name: string, namespace: string) => IconConfig | undefined;
/** Services that manages configuration for svg icons */
declare class IconConfigRegistryService {
    /** Cache of configurations */
    private readonly configs;
    /** List of resolvers to call when determining the configuration */
    private readonly resolvers;
    /**
     * Adds a resolver to call when determining an icon's configuration.
     * Resolvers are called in the order they are registered and
     * the the registry stops at the first resolver that returns configuration.
     *
     * @param resolver The new resolver
     * @returns `this` for chaining
     */
    addIconConfigResolver(resolver: IconConfigResolver): this;
    /**
     * Set the configuration for a specific icon
     *
     * @param name Icon name
     * @param namespace Icon namespace
     * @param config New configuration
     * @returns `this` for chaining
     */
    setIconConfig(name: string, namespace: string | undefined, config: IconConfig): this;
    /**
     * Get configuration for an icon, querying the resolvers if necessary
     *
     * @param name Icon name
     * @param namespace Icon namespace
     * @returns The associated configuration if available, otherwise undefined
     */
    getIconConfig(name: string, namespace?: string): IconConfig | undefined;
    /**
     * Iterates over each resolver to get configuration for an icon
     *
     * @param name Icon name
     * @param namespace Icon namespace
     * @returns Configuration produced by the resolvers or undefined if no resolver returned configuration
     */
    private getIconConfigFromResolvers;
    /**
     * Splits a icon name into a namespace and name
     *
     * @param name Icon name
     * @returns A tuple `[namespace, name]`
     */
    private splitIconName;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconConfigRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IconConfigRegistryService>;
}

/** Icon content template definition */
declare const IconDef: ContentTemplateDef<IconComponent>;

/** Icon data */
type IconData = z.infer<typeof IconDataSchema>;
/** Schema for icon data */
declare const IconDataSchema: z.ZodObject<{
    svgIcon: z.ZodOptional<z.ZodString>;
    fontIcon: z.ZodOptional<z.ZodString>;
    fontSet: z.ZodOptional<z.ZodString>;
    inline: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/** Icon content template */
type Icon = z.infer<typeof IconSchema>;
/** Schema for icon content template */
declare const IconSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"Icon">;
    svgIcon: z.ZodOptional<z.ZodString>;
    fontIcon: z.ZodOptional<z.ZodString>;
    fontSet: z.ZodOptional<z.ZodString>;
    inline: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/** One or more mixed icon items */
type IconList = z.infer<typeof IconListSchema>;
/** Schema for icon list */
declare const IconListSchema: z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
    svgIcon: z.ZodOptional<z.ZodString>;
    fontIcon: z.ZodOptional<z.ZodString>;
    fontSet: z.ZodOptional<z.ZodString>;
    inline: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>]>, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
    svgIcon: z.ZodOptional<z.ZodString>;
    fontIcon: z.ZodOptional<z.ZodString>;
    fontSet: z.ZodOptional<z.ZodString>;
    inline: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>]>>]>;

/**
 * Coerces mixed format icons into a list of icon object that
 * can be passed directly into hra-icon's `[icon]` input or
 * into a hraContentTemplateOutlet
 *
 * @param list Mixed format icon list
 * @returns A list of icon objects
 */
declare function coerceIconList(list?: IconList): Icon[];

export { IconComponent, IconConfigRegistryService, IconDataSchema, IconDef, IconListSchema, IconSchema, IconsModule, coerceIconList, provideIcons, withFontIconClasses, withSvgIconDirectory };
export type { FontIconClassesFeature, Icon, IconConfig, IconConfigResolver, IconData, IconFeatures, IconList, SvgIconDirectoryFeature };
