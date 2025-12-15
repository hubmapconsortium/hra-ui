export { EMPTY_LINK } from '@hra-ui/cdk/state';
import * as zod from 'zod';
import * as i0 from '@angular/core';
import { DoCheck } from '@angular/core';
import { Params, QueryParamsHandling, ActivatedRoute } from '@angular/router';

/** Link Directive for routing */
declare class LinkDirective implements DoCheck {
    /** linkId with empty string as default value */
    linkId: string & zod.$brand<"LinkId">;
    /** Query string parameters */
    queryParams?: Params;
    /** How to handle existing query params */
    queryParamsHandling?: QueryParamsHandling;
    /** Url fragment */
    fragment?: string;
    /** Whether to preserve the existing fragment */
    preserveFragment?: boolean;
    /** Nagivate relative to a route. Only affects internal links. */
    relativeTo?: ActivatedRoute;
    /** href of the element */
    protected href?: string;
    /** rel attribute of the element */
    protected rel?: string;
    /** target attribute of the element */
    protected target?: string;
    /** Reference to this component's injector */
    private readonly injector;
    /** Element tag on which this directive is mounted */
    private readonly tagName;
    /** Selector for querying the link registry state */
    private readonly queryLink;
    /** Dispatch action to navigate to a url */
    private readonly navigate;
    /** Link Entry */
    private link?;
    /** Whether the host element is an anchor */
    private get isAnchorElement();
    /** Whether the host element deals with resource urls */
    private get isResourceUrl();
    /** Collects query params and fragment options into a single object */
    private get extras();
    /** Updates the current link/url based on the inputs */
    ngDoCheck(): void;
    /**
     * Triggers when a click action is performed on the element
     * @param event type of event
     * @returns true/false based on entry and element
     */
    onClick(event: MouseEvent): boolean;
    /** Updates the link entry and bound attributes */
    private updateLink;
    /**
     * Gets the new values for different attributes bound to the host element
     * @param link Current link entry
     * @returns New attributes values to bind on the host element
     */
    private getLinkAttributes;
    /**
     * Merges two UrlCreationOptions.
     * Undefined values in the second set does not override values from the first set.
     * @param opt1 First set of options
     * @param opt2 Second set of options
     * @returns Merged options
     */
    private mergeExtras;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LinkDirective, "[hraLink]", never, { "linkId": { "alias": "hraLink"; "required": false; }; "queryParams": { "alias": "queryParams"; "required": false; }; "queryParamsHandling": { "alias": "queryParamsHandling"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "preserveFragment": { "alias": "preserveFragment"; "required": false; }; "relativeTo": { "alias": "relativeTo"; "required": false; }; }, {}, never, never, true, never>;
}

export { LinkDirective };
