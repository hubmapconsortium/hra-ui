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
                    <a href="index.html" data-type="index-link">Code Documentation for application</a>
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
                                    <span class="icon ion-ios-paper"></span>
                                        README
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
                                <a href="modules/AnalyticsModule.html" data-type="entity-link" >AnalyticsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-AnalyticsModule-ca5d2f2c41b5c8f33da16d872cf961b80c071b3cb7c62dc1557cf90392c5072bea3e2dd0b6fd4c113f451cf02e01010573c2adcf353f5d9bc89fb0ca49f296be"' : 'data-bs-target="#xs-directives-links-module-AnalyticsModule-ca5d2f2c41b5c8f33da16d872cf961b80c071b3cb7c62dc1557cf90392c5072bea3e2dd0b6fd4c113f451cf02e01010573c2adcf353f5d9bc89fb0ca49f296be"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AnalyticsModule-ca5d2f2c41b5c8f33da16d872cf961b80c071b3cb7c62dc1557cf90392c5072bea3e2dd0b6fd4c113f451cf02e01010573c2adcf353f5d9bc89fb0ca49f296be"' :
                                        'id="xs-directives-links-module-AnalyticsModule-ca5d2f2c41b5c8f33da16d872cf961b80c071b3cb7c62dc1557cf90392c5072bea3e2dd0b6fd4c113f451cf02e01010573c2adcf353f5d9bc89fb0ca49f296be"' }>
                                        <li class="link">
                                            <a href="directives/ClickEventDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClickEventDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DoubleClickEventDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DoubleClickEventDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/EventDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FeatureDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeatureDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/HoverEventDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HoverEventDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/KeyboardEventDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeyboardEventDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ModelChangeEventDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModelChangeEventDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HraCommonModule.html" data-type="entity-link" >HraCommonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-HraCommonModule-e3d6b207f92123f8e540874b26999fbb1340db89053596ada790b95750a6004abdeb72f38a001e47e805c36f080e4491586bc91292003cc77540c736345bc643"' : 'data-bs-target="#xs-pipes-links-module-HraCommonModule-e3d6b207f92123f8e540874b26999fbb1340db89053596ada790b95750a6004abdeb72f38a001e47e805c36f080e4491586bc91292003cc77540c736345bc643"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-HraCommonModule-e3d6b207f92123f8e540874b26999fbb1340db89053596ada790b95750a6004abdeb72f38a001e47e805c36f080e4491586bc91292003cc77540c736345bc643"' :
                                            'id="xs-pipes-links-module-HraCommonModule-e3d6b207f92123f8e540874b26999fbb1340db89053596ada790b95750a6004abdeb72f38a001e47e805c36f080e4491586bc91292003cc77540c736345bc643"' }>
                                            <li class="link">
                                                <a href="pipes/SlugifyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlugifyPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RouterExtModule.html" data-type="entity-link" >RouterExtModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-RouterExtModule-46bb882689a00110a517b631c243b5ac22f8a293beff4ad8d30b8ebbb35c40e7219f15abba51dda2784f263d2f727ab398408e0503ad550950be7deec0b8d016"' : 'data-bs-target="#xs-directives-links-module-RouterExtModule-46bb882689a00110a517b631c243b5ac22f8a293beff4ad8d30b8ebbb35c40e7219f15abba51dda2784f263d2f727ab398408e0503ad550950be7deec0b8d016"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-RouterExtModule-46bb882689a00110a517b631c243b5ac22f8a293beff4ad8d30b8ebbb35c40e7219f15abba51dda2784f263d2f727ab398408e0503ad550950be7deec0b8d016"' :
                                        'id="xs-directives-links-module-RouterExtModule-46bb882689a00110a517b631c243b5ac22f8a293beff4ad8d30b8ebbb35c40e7219f15abba51dda2784f263d2f727ab398408e0503ad550950be7deec0b8d016"' }>
                                        <li class="link">
                                            <a href="directives/FragmentLinkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FragmentLinkDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/LinkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UrlModule.html" data-type="entity-link" >UrlModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-UrlModule-3b22028ce42efb7da88a2992fda88d81c6586dcddead7ade1767ddb820898292883b15ecd735136bd477a799b35f1fc0e215f3cd247d0f481cfcae897e196a5f"' : 'data-bs-target="#xs-pipes-links-module-UrlModule-3b22028ce42efb7da88a2992fda88d81c6586dcddead7ade1767ddb820898292883b15ecd735136bd477a799b35f1fc0e215f3cd247d0f481cfcae897e196a5f"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-UrlModule-3b22028ce42efb7da88a2992fda88d81c6586dcddead7ade1767ddb820898292883b15ecd735136bd477a799b35f1fc0e215f3cd247d0f481cfcae897e196a5f"' :
                                            'id="xs-pipes-links-module-UrlModule-3b22028ce42efb7da88a2992fda88d81c6586dcddead7ade1767ddb820898292883b15ecd735136bd477a799b35f1fc0e215f3cd247d0f481cfcae897e196a5f"' }>
                                            <li class="link">
                                                <a href="pipes/AppUrlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppUrlPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/AssetUrlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssetUrlPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/CssUrlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CssUrlPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PageUrlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageUrlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                    <a href="directives/BaseEventDirective.html" data-type="entity-link" >BaseEventDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ClickEventDirective.html" data-type="entity-link" >ClickEventDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/DoubleClickEventDirective.html" data-type="entity-link" >DoubleClickEventDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/EventDirective.html" data-type="entity-link" >EventDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FeatureDirective.html" data-type="entity-link" >FeatureDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FragmentLinkDirective.html" data-type="entity-link" >FragmentLinkDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/HoverEventDirective.html" data-type="entity-link" >HoverEventDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/KeyboardEventDirective.html" data-type="entity-link" >KeyboardEventDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/LinkDirective.html" data-type="entity-link" >LinkDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ModelChangeEventDirective.html" data-type="entity-link" >ModelChangeEventDirective</a>
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
                                    <a href="injectables/AnalyticsErrorHandler.html" data-type="entity-link" >AnalyticsErrorHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnalyticsService.html" data-type="entity-link" >AnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsentService.html" data-type="entity-link" >ConsentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CsvFileLoaderService.html" data-type="entity-link" >CsvFileLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomScrollService.html" data-type="entity-link" >CustomScrollService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileDownloadService.html" data-type="entity-link" >FileDownloadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonFileLoaderService.html" data-type="entity-link" >JsonFileLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TelemetryService.html" data-type="entity-link" >TelemetryService</a>
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
                                <a href="interfaces/AnalyticsErrorHandlerConfig.html" data-type="entity-link" >AnalyticsErrorHandlerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AnalyticsEvent.html" data-type="entity-link" >AnalyticsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppConfiguration.html" data-type="entity-link" >AppConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BrandLogo.html" data-type="entity-link" >BrandLogo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommonEventProps.html" data-type="entity-link" >CommonEventProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CsvFileLoaderOptions.html" data-type="entity-link" >CsvFileLoaderOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorEventProps.html" data-type="entity-link" >ErrorEventProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventData.html" data-type="entity-link" >EventData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventData-1.html" data-type="entity-link" >EventData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileLoader.html" data-type="entity-link" >FileLoader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileLoaderDataEvent.html" data-type="entity-link" >FileLoaderDataEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileLoaderProgressEvent.html" data-type="entity-link" >FileLoaderProgressEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HraAnalyticsPluginConfig.html" data-type="entity-link" >HraAnalyticsPluginConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HraEventFilterPluginConfig.html" data-type="entity-link" >HraEventFilterPluginConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelChangeEventProps.html" data-type="entity-link" >ModelChangeEventProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageViewEventProps.html" data-type="entity-link" >PageViewEventProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderFeature.html" data-type="entity-link" >ProviderFeature</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/AppUrlPipe.html" data-type="entity-link" >AppUrlPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/AssetUrlPipe.html" data-type="entity-link" >AssetUrlPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/CssUrlPipe.html" data-type="entity-link" >CssUrlPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/PageUrlPipe.html" data-type="entity-link" >PageUrlPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/SlugifyPipe.html" data-type="entity-link" >SlugifyPipe</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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