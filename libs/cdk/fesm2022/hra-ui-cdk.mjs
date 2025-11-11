import { EMPTY_LINK, LinkRegistrySelectors, LinkRegistryActions, LinkType } from '@hra-ui/cdk/state';
export { EMPTY_LINK } from '@hra-ui/cdk/state';
import * as i0 from '@angular/core';
import { inject, Injector, ElementRef, HostListener, HostBinding, Input, Directive } from '@angular/core';
import '@angular/router';
import { selectQuerySnapshot, dispatch } from '@hra-ui/cdk/injectors';
import { createExternalUrl, createInternalUrl } from '@hra-ui/utils';

/** Link Directive for routing */
class LinkDirective {
    constructor() {
        /** linkId with empty string as default value */
        this.linkId = EMPTY_LINK;
        /** Reference to this component's injector */
        this.injector = inject(Injector);
        /** Element tag on which this directive is mounted */
        this.tagName = inject(ElementRef).nativeElement.tagName.toLowerCase();
        /** Selector for querying the link registry state */
        this.queryLink = selectQuerySnapshot(LinkRegistrySelectors.query);
        /** Dispatch action to navigate to a url */
        this.navigate = dispatch(LinkRegistryActions.Navigate);
    }
    /** Whether the host element is an anchor */
    get isAnchorElement() {
        return ['a', 'area'].includes(this.tagName);
    }
    /** Whether the host element deals with resource urls */
    get isResourceUrl() {
        return ['base', 'link'].includes(this.tagName);
    }
    /** Collects query params and fragment options into a single object */
    get extras() {
        const { link } = this;
        return this.mergeExtras(link?.type === LinkType.Internal ? link.extras : undefined, this);
    }
    /** Updates the current link/url based on the inputs */
    ngDoCheck() {
        const link = this.queryLink(this.linkId);
        if (this.link !== link) {
            this.updateLink(link);
        }
    }
    /**
     * Triggers when a click action is performed on the element
     * @param event type of event
     * @returns true/false based on entry and element
     */
    onClick(event) {
        const { link, linkId, isAnchorElement } = this;
        if (!link) {
            return true;
        }
        if (isAnchorElement) {
            const { button, ctrlKey, shiftKey, altKey, metaKey } = event;
            if (link.type === LinkType.External || button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
                return true;
            }
        }
        this.navigate(linkId, this.extras);
        return !isAnchorElement;
    }
    /** Updates the link entry and bound attributes */
    updateLink(link) {
        this.link = link;
        ({ href: this.href, rel: this.rel, target: this.target } = this.getLinkAttributes(link));
    }
    /**
     * Gets the new values for different attributes bound to the host element
     * @param link Current link entry
     * @returns New attributes values to bind on the host element
     */
    getLinkAttributes(link) {
        const { injector, extras, isResourceUrl } = this;
        switch (link?.type) {
            case LinkType.Internal:
                return { href: createInternalUrl(injector, link.commands, extras, isResourceUrl) };
            case LinkType.External:
                return { ...link, href: createExternalUrl(link.url, extras) };
            default:
                return {};
        }
    }
    /**
     * Merges two UrlCreationOptions.
     * Undefined values in the second set does not override values from the first set.
     * @param opt1 First set of options
     * @param opt2 Second set of options
     * @returns Merged options
     */
    mergeExtras(opt1, opt2) {
        const result = { ...opt1 };
        const mergeKey = (key) => {
            if (opt2[key] !== undefined) {
                result[key] = opt2[key];
            }
        };
        mergeKey('queryParams');
        mergeKey('queryParamsHandling');
        mergeKey('fragment');
        mergeKey('preserveFragment');
        mergeKey('relativeTo');
        return result;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: LinkDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.9", type: LinkDirective, isStandalone: true, selector: "[hraLink]", inputs: { linkId: ["hraLink", "linkId"], queryParams: "queryParams", queryParamsHandling: "queryParamsHandling", fragment: "fragment", preserveFragment: "preserveFragment", relativeTo: "relativeTo" }, host: { listeners: { "click": "onClick($event)" }, properties: { "attr.href": "this.href", "attr.rel": "this.rel", "attr.target": "this.target" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: LinkDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraLink]',
                }]
        }], propDecorators: { linkId: [{
                type: Input,
                args: ['hraLink']
            }], queryParams: [{
                type: Input
            }], queryParamsHandling: [{
                type: Input
            }], fragment: [{
                type: Input
            }], preserveFragment: [{
                type: Input
            }], relativeTo: [{
                type: Input
            }], href: [{
                type: HostBinding,
                args: ['attr.href']
            }], rel: [{
                type: HostBinding,
                args: ['attr.rel']
            }], target: [{
                type: HostBinding,
                args: ['attr.target']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { LinkDirective };
//# sourceMappingURL=hra-ui-cdk.mjs.map
