import * as i0 from '@angular/core';
import { input, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import * as i4 from '@hra-ui/design-system/buttons/icon-button';
import { IconButtonModule } from '@hra-ui/design-system/buttons/icon-button';
import { z } from 'zod';
import { findOrThrow } from '@hra-ui/common/array-util';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from '@angular/material/button';
import * as i3 from '@angular/material/icon';

/** Schema for social media item */
const SocialMediaSchema = z.object({
    id: z.string().brand(),
    label: z.string(),
    icon: z.string(),
    isFontIcon: z.boolean().optional(),
    link: z.string(),
});
/** Schema for social media items */
const SocialsSchema = z.object({
    $schema: z.string(),
    socials: SocialMediaSchema.array(),
});

var $schema = "../types/social-media.schema.json";
var socials = [
	{
		id: "linkedin",
		label: "Connect with CNS on LinkedIn",
		icon: "social:linkedin",
		link: "https://www.linkedin.com/company/cns-indiana-university-bloomington"
	},
	{
		id: "youtube",
		label: "Learn about CNS on YouTube",
		icon: "social:youtube",
		link: "https://www.youtube.com/@CNSCenter/"
	},
	{
		id: "instagram",
		label: "Connect with CNS on Instagram",
		icon: "social:instagram",
		link: "https://www.instagram.com/cns_at_iu/"
	},
	{
		id: "facebook",
		label: "Connect with CNS on Facebook",
		icon: "social:facebook",
		link: "https://www.facebook.com/cnscenter/"
	},
	{
		id: "github",
		label: "CNS GitHub",
		icon: "social:github",
		link: "https://github.com/hubmapconsortium/hra-ui"
	},
	{
		id: "bluesky",
		label: "Connect with CNS on Bluesky",
		icon: "social:bluesky",
		link: "https://bsky.app/profile/cnscenter.bsky.social"
	},
	{
		id: "x",
		label: "Connect with CNS on X (formerly Twitter)",
		icon: "social:x",
		link: "https://twitter.com/cnscenter"
	},
	{
		id: "email",
		label: "Email us",
		icon: "email",
		link: "mailto:infoccf@iu.edu",
		isFontIcon: true
	}
];
var RAW_SOCIALS = {
	$schema: $schema,
	socials: socials
};

/** Parsed social media items */
const SOCIALS = SocialsSchema.parse(RAW_SOCIALS).socials;
/** All available social ids */
const SOCIAL_IDS = SOCIALS.map(({ id }) => id);

/**
 * Social media buttons for HRA apps
 */
class SocialMediaButtonComponent {
    /** Social media to display */
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : []));
    /** Button size */
    size = input('large', ...(ngDevMode ? [{ debugName: "size" }] : []));
    /** Button variant */
    variant = input('dark', ...(ngDevMode ? [{ debugName: "variant" }] : []));
    /** Social media button data */
    data = computed(() => findOrThrow(SOCIALS, ({ id }) => id === this.id()), ...(ngDevMode ? [{ debugName: "data" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SocialMediaButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: SocialMediaButtonComponent, isStandalone: true, selector: "hra-social-media-button", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<a\n  mat-icon-button\n  hraFeature=\"social-media\"\n  hraClickEvent\n  [hraIconButtonVariant]=\"variant()\"\n  [hraIconButtonSize]=\"size()\"\n  [attr.aria-label]=\"data().label\"\n  [attr.href]=\"data().link\"\n  target=\"_blank\"\n  rel=\"noopener noreferrer\"\n>\n  @if (data().isFontIcon) {\n    <mat-icon [fontIcon]=\"data().icon\"></mat-icon>\n  } @else {\n    <mat-icon [svgIcon]=\"data().icon\"></mat-icon>\n  }\n</a>\n", styles: [":host{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: IconButtonModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "directive", type: i4.IconButtonVariantDirective, selector: "[hraIconButtonVariant]", inputs: ["hraIconButtonVariant"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: SocialMediaButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-social-media-button', imports: [HraCommonModule, IconButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  mat-icon-button\n  hraFeature=\"social-media\"\n  hraClickEvent\n  [hraIconButtonVariant]=\"variant()\"\n  [hraIconButtonSize]=\"size()\"\n  [attr.aria-label]=\"data().label\"\n  [attr.href]=\"data().link\"\n  target=\"_blank\"\n  rel=\"noopener noreferrer\"\n>\n  @if (data().isFontIcon) {\n    <mat-icon [fontIcon]=\"data().icon\"></mat-icon>\n  } @else {\n    <mat-icon [svgIcon]=\"data().icon\"></mat-icon>\n  }\n</a>\n", styles: [":host{display:inline-block}\n"] }]
        }], propDecorators: { id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SOCIAL_IDS, SocialMediaButtonComponent };
//# sourceMappingURL=hra-ui-design-system-buttons-social-media-button.mjs.map
