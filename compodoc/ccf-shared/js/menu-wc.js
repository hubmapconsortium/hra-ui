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
                    <a href="index.html" data-type="index-link">Code Documentation for ccf-shared</a>
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
                                <a href="modules/NumbersOnlyModule.html" data-type="entity-link" >NumbersOnlyModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-NumbersOnlyModule-c94659702ec4f8a8e6315f4cb5e6497ae6c0e2767e7a83409b9bfa2ebb83460fc836d2a957d7060f7da8028e285c3681f16def80e1bfda668798860f785bcd49"' : 'data-bs-target="#xs-directives-links-module-NumbersOnlyModule-c94659702ec4f8a8e6315f4cb5e6497ae6c0e2767e7a83409b9bfa2ebb83460fc836d2a957d7060f7da8028e285c3681f16def80e1bfda668798860f785bcd49"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NumbersOnlyModule-c94659702ec4f8a8e6315f4cb5e6497ae6c0e2767e7a83409b9bfa2ebb83460fc836d2a957d7060f7da8028e285c3681f16def80e1bfda668798860f785bcd49"' :
                                        'id="xs-directives-links-module-NumbersOnlyModule-c94659702ec4f8a8e6315f4cb5e6497ae6c0e2767e7a83409b9bfa2ebb83460fc836d2a957d7060f7da8028e285c3681f16def80e1bfda668798860f785bcd49"' }>
                                        <li class="link">
                                            <a href="directives/NumberDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchKeyboardUIBehaviorModule.html" data-type="entity-link" >SpatialSearchKeyboardUIBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchKeyboardUIBehaviorModule-9963c1eafaeb4b8ce7436959df9fd0d8c4482e03a108e5ff727d82ce6e9cab551029b74149609dd9ca2a2c20f04a7b0fff0cd069b00e6e549c8a7d62979abc3c"' : 'data-bs-target="#xs-components-links-module-SpatialSearchKeyboardUIBehaviorModule-9963c1eafaeb4b8ce7436959df9fd0d8c4482e03a108e5ff727d82ce6e9cab551029b74149609dd9ca2a2c20f04a7b0fff0cd069b00e6e549c8a7d62979abc3c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchKeyboardUIBehaviorModule-9963c1eafaeb4b8ce7436959df9fd0d8c4482e03a108e5ff727d82ce6e9cab551029b74149609dd9ca2a2c20f04a7b0fff0cd069b00e6e549c8a7d62979abc3c"' :
                                            'id="xs-components-links-module-SpatialSearchKeyboardUIBehaviorModule-9963c1eafaeb4b8ce7436959df9fd0d8c4482e03a108e5ff727d82ce6e9cab551029b74149609dd9ca2a2c20f04a7b0fff0cd069b00e6e549c8a7d62979abc3c"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchKeyboardUIBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchKeyboardUIBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchKeyboardUIModule.html" data-type="entity-link" >SpatialSearchKeyboardUIModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchKeyboardUIModule-a04f870a0a808f093f90150631f5b70a7a55924176075980beef1feaec0003b9c010ebccdf645d29c0bb73ee10d303593335c44b0a9f697d6e5d2d48253aeb3d"' : 'data-bs-target="#xs-components-links-module-SpatialSearchKeyboardUIModule-a04f870a0a808f093f90150631f5b70a7a55924176075980beef1feaec0003b9c010ebccdf645d29c0bb73ee10d303593335c44b0a9f697d6e5d2d48253aeb3d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchKeyboardUIModule-a04f870a0a808f093f90150631f5b70a7a55924176075980beef1feaec0003b9c010ebccdf645d29c0bb73ee10d303593335c44b0a9f697d6e5d2d48253aeb3d"' :
                                            'id="xs-components-links-module-SpatialSearchKeyboardUIModule-a04f870a0a808f093f90150631f5b70a7a55924176075980beef1feaec0003b9c010ebccdf645d29c0bb73ee10d303593335c44b0a9f697d6e5d2d48253aeb3d"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchKeyboardUIComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchKeyboardUIComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreDebugModule.html" data-type="entity-link" >StoreDebugModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StoreDebugModule-4e636a00739f10be33b000d149af16ee28b22390bb998313d94db9f393622bd9d2f43be47861238785101a2286fdcd4c22c31db10adf78833b01b4a430e36734"' : 'data-bs-target="#xs-components-links-module-StoreDebugModule-4e636a00739f10be33b000d149af16ee28b22390bb998313d94db9f393622bd9d2f43be47861238785101a2286fdcd4c22c31db10adf78833b01b4a430e36734"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StoreDebugModule-4e636a00739f10be33b000d149af16ee28b22390bb998313d94db9f393622bd9d2f43be47861238785101a2286fdcd4c22c31db10adf78833b01b4a430e36734"' :
                                            'id="xs-components-links-module-StoreDebugModule-4e636a00739f10be33b000d149af16ee28b22390bb998313d94db9f393622bd9d2f43be47861238785101a2286fdcd4c22c31db10adf78833b01b4a430e36734"' }>
                                            <li class="link">
                                                <a href="components/StoreDebugComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoreDebugComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/XYZPositionModule.html" data-type="entity-link" >XYZPositionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-XYZPositionModule-cb92392d0b0b675c501ca313ed38efc8049eed23ec0b0042a5558daedc5bdfcac5cac4c6d8e57cebe21b8bd5e4008305ec6109d158ad7cea2919620f0d91d9f3"' : 'data-bs-target="#xs-components-links-module-XYZPositionModule-cb92392d0b0b675c501ca313ed38efc8049eed23ec0b0042a5558daedc5bdfcac5cac4c6d8e57cebe21b8bd5e4008305ec6109d158ad7cea2919620f0d91d9f3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-XYZPositionModule-cb92392d0b0b675c501ca313ed38efc8049eed23ec0b0042a5558daedc5bdfcac5cac4c6d8e57cebe21b8bd5e4008305ec6109d158ad7cea2919620f0d91d9f3"' :
                                            'id="xs-components-links-module-XYZPositionModule-cb92392d0b0b675c501ca313ed38efc8049eed23ec0b0042a5558daedc5bdfcac5cac4c6d8e57cebe21b8bd5e4008305ec6109d158ad7cea2919620f0d91d9f3"' }>
                                            <li class="link">
                                                <a href="components/XYZPositionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >XYZPositionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="components/OpacitySliderComponent.html" data-type="entity-link" >OpacitySliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpatialSearchListComponent.html" data-type="entity-link" >SpatialSearchListComponent</a>
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
                                    <a href="directives/BaseWebComponent.html" data-type="entity-link" >BaseWebComponent</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConfigManager.html" data-type="entity-link" >ConfigManager</a>
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
                                    <a href="injectables/ApiEndpointDataSourceService.html" data-type="entity-link" >ApiEndpointDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataSourceService.html" data-type="entity-link" >DataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalConfigState.html" data-type="entity-link" >GlobalConfigState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalsService.html" data-type="entity-link" >GlobalsService</a>
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
                                <a href="interfaces/ApiEndpointDataSourceOptions.html" data-type="entity-link" >ApiEndpointDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseWebComponentOptions.html" data-type="entity-link" >BaseWebComponentOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigManagerOptions.html" data-type="entity-link" >ConfigManagerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSource.html" data-type="entity-link" >DataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultParams.html" data-type="entity-link" >DefaultParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterParams.html" data-type="entity-link" >FilterParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganInfo.html" data-type="entity-link" >OrganInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PluckUniqueOptions.html" data-type="entity-link" >PluckUniqueOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Position.html" data-type="entity-link" >Position</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchListItem.html" data-type="entity-link" >SpatialSearchListItem</a>
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