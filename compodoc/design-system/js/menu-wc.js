'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">design-system</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ButtonModule.html" data-type="entity-link" >ButtonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' : 'data-bs-target="#xs-directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' :
                                        'id="xs-directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' }>
                                        <li class="link">
                                            <a href="directives/ButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CallToActionButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CallToActionButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationCategoryButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationCategoryButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PrimaryButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimaryButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SecondaryButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondaryButtonDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpansionPanelModule.html" data-type="entity-link" >ExpansionPanelModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IconButtonModule.html" data-type="entity-link" >IconButtonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' : 'data-bs-target="#xs-directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' :
                                        'id="xs-directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' }>
                                        <li class="link">
                                            <a href="directives/IconButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/IconButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconButtonVariantDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScrollingModule.html" data-type="entity-link" >ScrollingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"' : 'data-bs-target="#xs-directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"' :
                                        'id="xs-directives-links-module-ScrollingModule-be92df704ab4f4a4523b66effa747b28adbcd4019d314eb5d936bc3c0fcb004ad347b57d224ea9715e389f15b61ce0bf4f8dd875fed05a827cd767ba1ce12c35"' }>
                                        <li class="link">
                                            <a href="directives/ScrollOverflowFadeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScrollOverflowFadeDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowCardModule.html" data-type="entity-link" >WorkflowCardModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppsCardComponent.html" data-type="entity-link" >AppsCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppsSidenavDemoComponent.html" data-type="entity-link" >AppsSidenavDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BackBarComponent.html" data-type="entity-link" >BackBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandLogoComponent.html" data-type="entity-link" >BrandLogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandmarkComponent.html" data-type="entity-link" >BrandmarkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" >BreadcrumbsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonStylesComponent.html" data-type="entity-link" >ButtonStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonToggleStylesComponent.html" data-type="entity-link" >ButtonToggleStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckboxStylesComponent.html" data-type="entity-link" >CheckboxStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorPickerComponent.html" data-type="entity-link" >ColorPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteFileButtonComponent.html" data-type="entity-link" >DeleteFileButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeprecatedWorkflowCardComponent.html" data-type="entity-link" class="deprecated-name">DeprecatedWorkflowCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorIndicatorComponent.html" data-type="entity-link" >ErrorIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpansionPanelActionsComponent.html" data-type="entity-link" >ExpansionPanelActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpansionPanelComponent.html" data-type="entity-link" >ExpansionPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpansionPanelHeaderContentComponent.html" data-type="entity-link" >ExpansionPanelHeaderContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenActionsComponent.html" data-type="entity-link" >FullscreenActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenPortalComponent.html" data-type="entity-link" >FullscreenPortalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenPortalContentComponent.html" data-type="entity-link" >FullscreenPortalContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FundingComponent.html" data-type="entity-link" >FundingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IconButtonStylesComponent.html" data-type="entity-link" >IconButtonStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoModalComponent.html" data-type="entity-link" >InfoModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputStylesComponent.html" data-type="entity-link" >InputStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuDemoComponent.html" data-type="entity-link" >MenuDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuStylesComponent.html" data-type="entity-link" >MenuStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MicroTooltipStylesComponent.html" data-type="entity-link" >MicroTooltipStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavHeaderButtonsComponent.html" data-type="entity-link" >NavHeaderButtonsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavHeaderComponent.html" data-type="entity-link" >NavHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoticeComponent.html" data-type="entity-link" >NoticeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductLogoComponent.html" data-type="entity-link" >ProductLogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollbarStylesComponent.html" data-type="entity-link" >ScrollbarStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollOverflowFadeStylesComponent.html" data-type="entity-link" >ScrollOverflowFadeStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectStylesComponent.html" data-type="entity-link" >SelectStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SnackbarComponent.html" data-type="entity-link" >SnackbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SocialMediaButtonComponent.html" data-type="entity-link" >SocialMediaButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SoftwareStatusIndicatorComponent.html" data-type="entity-link" >SoftwareStatusIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepIndicatorComponent.html" data-type="entity-link" >StepIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableDemoComponent.html" data-type="entity-link" >TableDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableStylesComponent.html" data-type="entity-link" >TableStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TooltipCardComponent.html" data-type="entity-link" >TooltipCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeDemoComponent.html" data-type="entity-link" >TreeDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeStylesComponent.html" data-type="entity-link" >TreeStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WebComponentCardComponent.html" data-type="entity-link" >WebComponentCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkflowCardActionsComponent.html" data-type="entity-link" >WorkflowCardActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkflowCardComponent.html" data-type="entity-link" >WorkflowCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkflowCardExtraComponent.html" data-type="entity-link" >WorkflowCardExtraComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/ButtonSizeDirective.html" data-type="entity-link" >ButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CallToActionButtonDirective.html" data-type="entity-link" >CallToActionButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CheckboxErrorVariantDirective.html" data-type="entity-link" >CheckboxErrorVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FullscreenDirective.html" data-type="entity-link" >FullscreenDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/IconButtonSizeDirective.html" data-type="entity-link" >IconButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/IconButtonVariantDirective.html" data-type="entity-link" >IconButtonVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MicroTooltipDirective.html" data-type="entity-link" >MicroTooltipDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NavigationCategoryButtonDirective.html" data-type="entity-link" >NavigationCategoryButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/PrimaryButtonDirective.html" data-type="entity-link" >PrimaryButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ScrollOverflowFadeDirective.html" data-type="entity-link" >ScrollOverflowFadeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SecondaryButtonDirective.html" data-type="entity-link" >SecondaryButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SoftwareStatusSizeDirective.html" data-type="entity-link" >SoftwareStatusSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ToggleButtonSizeDirective.html" data-type="entity-link" >ToggleButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TreeSizeDirective.html" data-type="entity-link" >TreeSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ViewOutletDirective.html" data-type="entity-link" >ViewOutletDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link" >SnackbarService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BreadcrumbItem.html" data-type="entity-link" >BreadcrumbItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonToggleConfig.html" data-type="entity-link" >ButtonToggleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardData.html" data-type="entity-link" >CardData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataItem.html" data-type="entity-link" >DataItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DesignSystemOptions.html" data-type="entity-link" >DesignSystemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuDemoOption.html" data-type="entity-link" >MenuDemoOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NestedNode.html" data-type="entity-link" >NestedNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollingGlobals.html" data-type="entity-link" >ScrollingGlobals</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollingOptions.html" data-type="entity-link" >ScrollingOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnackbarData.html" data-type="entity-link" >SnackbarData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableDemoData.html" data-type="entity-link" >TableDemoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TooltipContent.html" data-type="entity-link" >TooltipContent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});