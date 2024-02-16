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
                    <a href="index.html" data-type="index-link">ccf-eui</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-21e91d8b35aa9092e06040555fe98eb57141f860903d59be8d17774c1f8335b906068c9ebcb699f18e057aa8604ffe3447f65b77266c7963b287580f8d47b89b"' : 'data-bs-target="#xs-components-links-module-AppModule-21e91d8b35aa9092e06040555fe98eb57141f860903d59be8d17774c1f8335b906068c9ebcb699f18e057aa8604ffe3447f65b77266c7963b287580f8d47b89b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-21e91d8b35aa9092e06040555fe98eb57141f860903d59be8d17774c1f8335b906068c9ebcb699f18e057aa8604ffe3447f65b77266c7963b287580f8d47b89b"' :
                                            'id="xs-components-links-module-AppModule-21e91d8b35aa9092e06040555fe98eb57141f860903d59be8d17774c1f8335b906068c9ebcb699f18e057aa8604ffe3447f65b77266c7963b287580f8d47b89b"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppWebComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppWebComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ButtonToggleModule.html" data-type="entity-link" >ButtonToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ButtonToggleModule-7f81871a4c0683ee82c1fdb6e1165bc5187f2e732d5b883224fde64491bc7889138ffa93de61350983cee70a8883f080781d47a7bf5c54832d7b9c6661959af9"' : 'data-bs-target="#xs-components-links-module-ButtonToggleModule-7f81871a4c0683ee82c1fdb6e1165bc5187f2e732d5b883224fde64491bc7889138ffa93de61350983cee70a8883f080781d47a7bf5c54832d7b9c6661959af9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ButtonToggleModule-7f81871a4c0683ee82c1fdb6e1165bc5187f2e732d5b883224fde64491bc7889138ffa93de61350983cee70a8883f080781d47a7bf5c54832d7b9c6661959af9"' :
                                            'id="xs-components-links-module-ButtonToggleModule-7f81871a4c0683ee82c1fdb6e1165bc5187f2e732d5b883224fde64491bc7889138ffa93de61350983cee70a8883f080781d47a7bf5c54832d7b9c6661959af9"' }>
                                            <li class="link">
                                                <a href="components/ButtonToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckboxModule.html" data-type="entity-link" >CheckboxModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CheckboxModule-7fd9e30872cb495244da1b8b830ba15b2fc6b2a1dda4ee36ad2996a30d3ca91214bb94225658f4b4e90bcace32c838c06c2192fbed91c2466ccdb0fa9882ccd2"' : 'data-bs-target="#xs-components-links-module-CheckboxModule-7fd9e30872cb495244da1b8b830ba15b2fc6b2a1dda4ee36ad2996a30d3ca91214bb94225658f4b4e90bcace32c838c06c2192fbed91c2466ccdb0fa9882ccd2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CheckboxModule-7fd9e30872cb495244da1b8b830ba15b2fc6b2a1dda4ee36ad2996a30d3ca91214bb94225658f4b4e90bcace32c838c06c2192fbed91c2466ccdb0fa9882ccd2"' :
                                            'id="xs-components-links-module-CheckboxModule-7fd9e30872cb495244da1b8b830ba15b2fc6b2a1dda4ee36ad2996a30d3ca91214bb94225658f4b4e90bcace32c838c06c2192fbed91c2466ccdb0fa9882ccd2"' }>
                                            <li class="link">
                                                <a href="components/CheckboxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DonorCardModule.html" data-type="entity-link" >DonorCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DonorCardModule-c5cef67f85e00c486537114438904a091bcf8d192971c107a6380783528afbc6d485fa8b31b9c82f83e9132cb9962226063247b16bb68be9408113c256e3cad5"' : 'data-bs-target="#xs-components-links-module-DonorCardModule-c5cef67f85e00c486537114438904a091bcf8d192971c107a6380783528afbc6d485fa8b31b9c82f83e9132cb9962226063247b16bb68be9408113c256e3cad5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DonorCardModule-c5cef67f85e00c486537114438904a091bcf8d192971c107a6380783528afbc6d485fa8b31b9c82f83e9132cb9962226063247b16bb68be9408113c256e3cad5"' :
                                            'id="xs-components-links-module-DonorCardModule-c5cef67f85e00c486537114438904a091bcf8d192971c107a6380783528afbc6d485fa8b31b9c82f83e9132cb9962226063247b16bb68be9408113c256e3cad5"' }>
                                            <li class="link">
                                                <a href="components/DonorCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DonorCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DrawerModule.html" data-type="entity-link" >DrawerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DrawerModule-310e3d4e74e4dbb8af071afc76ea5f835c5223a1527322273e4173befaea4d4eaf2c54153bf6afc517b1decb3a784002a74b0db63bc6451d97442020c9b22e5e"' : 'data-bs-target="#xs-components-links-module-DrawerModule-310e3d4e74e4dbb8af071afc76ea5f835c5223a1527322273e4173befaea4d4eaf2c54153bf6afc517b1decb3a784002a74b0db63bc6451d97442020c9b22e5e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DrawerModule-310e3d4e74e4dbb8af071afc76ea5f835c5223a1527322273e4173befaea4d4eaf2c54153bf6afc517b1decb3a784002a74b0db63bc6451d97442020c9b22e5e"' :
                                            'id="xs-components-links-module-DrawerModule-310e3d4e74e4dbb8af071afc76ea5f835c5223a1527322273e4173befaea4d4eaf2c54153bf6afc517b1decb3a784002a74b0db63bc6451d97442020c9b22e5e"' }>
                                            <li class="link">
                                                <a href="components/ContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToggleButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToggleButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DropdownModule.html" data-type="entity-link" >DropdownModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DropdownModule-f42559ac5c821a1e0c690d5e75bcfd5436622a185b8645d643d8f4ea8ea881dedbb06f5e9599e44cf3a7bf7c741d5ff9d90f487d83053977f4fc1bd3074724e7"' : 'data-bs-target="#xs-components-links-module-DropdownModule-f42559ac5c821a1e0c690d5e75bcfd5436622a185b8645d643d8f4ea8ea881dedbb06f5e9599e44cf3a7bf7c741d5ff9d90f487d83053977f4fc1bd3074724e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DropdownModule-f42559ac5c821a1e0c690d5e75bcfd5436622a185b8645d643d8f4ea8ea881dedbb06f5e9599e44cf3a7bf7c741d5ff9d90f487d83053977f4fc1bd3074724e7"' :
                                            'id="xs-components-links-module-DropdownModule-f42559ac5c821a1e0c690d5e75bcfd5436622a185b8645d643d8f4ea8ea881dedbb06f5e9599e44cf3a7bf7c741d5ff9d90f487d83053977f4fc1bd3074724e7"' }>
                                            <li class="link">
                                                <a href="components/DropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DualSliderModule.html" data-type="entity-link" >DualSliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DualSliderModule-59ed7ef03a0433a269a83c2696c44813c1182ea7fb6d93d8d051a9cf9f025ca141ca8a4438d0ea29bf7876999fe9d1eba60c2ae456d35437cd1d0eb8b113670b"' : 'data-bs-target="#xs-components-links-module-DualSliderModule-59ed7ef03a0433a269a83c2696c44813c1182ea7fb6d93d8d051a9cf9f025ca141ca8a4438d0ea29bf7876999fe9d1eba60c2ae456d35437cd1d0eb8b113670b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DualSliderModule-59ed7ef03a0433a269a83c2696c44813c1182ea7fb6d93d8d051a9cf9f025ca141ca8a4438d0ea29bf7876999fe9d1eba60c2ae456d35437cd1d0eb8b113670b"' :
                                            'id="xs-components-links-module-DualSliderModule-59ed7ef03a0433a269a83c2696c44813c1182ea7fb6d93d8d051a9cf9f025ca141ca8a4438d0ea29bf7876999fe9d1eba60c2ae456d35437cd1d0eb8b113670b"' }>
                                            <li class="link">
                                                <a href="components/DualSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DualSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersContentModule.html" data-type="entity-link" >FiltersContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FiltersContentModule-c1557ab63c34110dc37bdbe258cb83f0f140d746da7c6ec8310c71c920278b5597d655f95cd416de64f14d38719de6e85ab605aafa4052cafad388cbd6c09b73"' : 'data-bs-target="#xs-components-links-module-FiltersContentModule-c1557ab63c34110dc37bdbe258cb83f0f140d746da7c6ec8310c71c920278b5597d655f95cd416de64f14d38719de6e85ab605aafa4052cafad388cbd6c09b73"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersContentModule-c1557ab63c34110dc37bdbe258cb83f0f140d746da7c6ec8310c71c920278b5597d655f95cd416de64f14d38719de6e85ab605aafa4052cafad388cbd6c09b73"' :
                                            'id="xs-components-links-module-FiltersContentModule-c1557ab63c34110dc37bdbe258cb83f0f140d746da7c6ec8310c71c920278b5597d655f95cd416de64f14d38719de6e85ab605aafa4052cafad388cbd6c09b73"' }>
                                            <li class="link">
                                                <a href="components/FiltersContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltersContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltersPopoverModule.html" data-type="entity-link" >FiltersPopoverModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FiltersPopoverModule-9960a2e95ae069aec68cf2d59d42bec12b3b770eb6cfd5265af81fb4462da2edb4783ae7579e0b442014ae81fbc70c54980aa864a6dcb11d2dcf8d06b4faba2d"' : 'data-bs-target="#xs-components-links-module-FiltersPopoverModule-9960a2e95ae069aec68cf2d59d42bec12b3b770eb6cfd5265af81fb4462da2edb4783ae7579e0b442014ae81fbc70c54980aa864a6dcb11d2dcf8d06b4faba2d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltersPopoverModule-9960a2e95ae069aec68cf2d59d42bec12b3b770eb6cfd5265af81fb4462da2edb4783ae7579e0b442014ae81fbc70c54980aa864a6dcb11d2dcf8d06b4faba2d"' :
                                            'id="xs-components-links-module-FiltersPopoverModule-9960a2e95ae069aec68cf2d59d42bec12b3b770eb6cfd5265af81fb4462da2edb4783ae7579e0b442014ae81fbc70c54980aa864a6dcb11d2dcf8d06b4faba2d"' }>
                                            <li class="link">
                                                <a href="components/FiltersPopoverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltersPopoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HeaderModule-1e8c9a096719ce81bb3cf8e42743a44b4badb3cb52d4581ea3bf5a04bfd3d17dcfdee307957ae5d22bb5cf0b1e2745558aacd56e1edca01e6af349346057c188"' : 'data-bs-target="#xs-components-links-module-HeaderModule-1e8c9a096719ce81bb3cf8e42743a44b4badb3cb52d4581ea3bf5a04bfd3d17dcfdee307957ae5d22bb5cf0b1e2745558aacd56e1edca01e6af349346057c188"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-1e8c9a096719ce81bb3cf8e42743a44b4badb3cb52d4581ea3bf5a04bfd3d17dcfdee307957ae5d22bb5cf0b1e2745558aacd56e1edca01e6af349346057c188"' :
                                            'id="xs-components-links-module-HeaderModule-1e8c9a096719ce81bb3cf8e42743a44b4badb3cb52d4581ea3bf5a04bfd3d17dcfdee307957ae5d22bb5cf0b1e2745558aacd56e1edca01e6af349346057c188"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologyExplorationModule.html" data-type="entity-link" >OntologyExplorationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySearchModule.html" data-type="entity-link" >OntologySearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OntologySearchModule-99826fe886fa9e3ddb06db93eec9ed69442ce41e99bb0e63cda51da0a6803d77f2ea1db997055114865959be8efe07a7630394ff154df3607544696615fa3e12"' : 'data-bs-target="#xs-components-links-module-OntologySearchModule-99826fe886fa9e3ddb06db93eec9ed69442ce41e99bb0e63cda51da0a6803d77f2ea1db997055114865959be8efe07a7630394ff154df3607544696615fa3e12"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologySearchModule-99826fe886fa9e3ddb06db93eec9ed69442ce41e99bb0e63cda51da0a6803d77f2ea1db997055114865959be8efe07a7630394ff154df3607544696615fa3e12"' :
                                            'id="xs-components-links-module-OntologySearchModule-99826fe886fa9e3ddb06db93eec9ed69442ce41e99bb0e63cda51da0a6803d77f2ea1db997055114865959be8efe07a7630394ff154df3607544696615fa3e12"' }>
                                            <li class="link">
                                                <a href="components/OntologySearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologySearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologySelectionModule.html" data-type="entity-link" >OntologySelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OntologySelectionModule-5214f61076480b83c080df9b761bd0c6596b0d5a53bbeed983757f9b6ef0dc7fa874d875926f279505d84d8facfde6d29d2a1e7b92faca6ba71b97a72f1fcddb"' : 'data-bs-target="#xs-components-links-module-OntologySelectionModule-5214f61076480b83c080df9b761bd0c6596b0d5a53bbeed983757f9b6ef0dc7fa874d875926f279505d84d8facfde6d29d2a1e7b92faca6ba71b97a72f1fcddb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologySelectionModule-5214f61076480b83c080df9b761bd0c6596b0d5a53bbeed983757f9b6ef0dc7fa874d875926f279505d84d8facfde6d29d2a1e7b92faca6ba71b97a72f1fcddb"' :
                                            'id="xs-components-links-module-OntologySelectionModule-5214f61076480b83c080df9b761bd0c6596b0d5a53bbeed983757f9b6ef0dc7fa874d875926f279505d84d8facfde6d29d2a1e7b92faca6ba71b97a72f1fcddb"' }>
                                            <li class="link">
                                                <a href="components/OntologySelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologySelectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OntologyTreeModule.html" data-type="entity-link" >OntologyTreeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OntologyTreeModule-08a808589b8035f01caaffd32351b4eea960f372341d325cba7605811ec87d3bb9a56404b79ea547cc3e8adea48089f5128e129f209d0b6415c456a0691478a4"' : 'data-bs-target="#xs-components-links-module-OntologyTreeModule-08a808589b8035f01caaffd32351b4eea960f372341d325cba7605811ec87d3bb9a56404b79ea547cc3e8adea48089f5128e129f209d0b6415c456a0691478a4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OntologyTreeModule-08a808589b8035f01caaffd32351b4eea960f372341d325cba7605811ec87d3bb9a56404b79ea547cc3e8adea48089f5128e129f209d0b6415c456a0691478a4"' :
                                            'id="xs-components-links-module-OntologyTreeModule-08a808589b8035f01caaffd32351b4eea960f372341d325cba7605811ec87d3bb9a56404b79ea547cc3e8adea48089f5128e129f209d0b6415c456a0691478a4"' }>
                                            <li class="link">
                                                <a href="components/OntologyTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologyTreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResultsBrowserModule.html" data-type="entity-link" >ResultsBrowserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ResultsBrowserModule-2ea602ac07d87b86b7cfdd780b5deeeceb4ad0dada9e2c176cb6a1f42eee707064db2135ec3c7f9a00704324134520347d41df267a786675d386471c3aa5a1e6"' : 'data-bs-target="#xs-components-links-module-ResultsBrowserModule-2ea602ac07d87b86b7cfdd780b5deeeceb4ad0dada9e2c176cb6a1f42eee707064db2135ec3c7f9a00704324134520347d41df267a786675d386471c3aa5a1e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResultsBrowserModule-2ea602ac07d87b86b7cfdd780b5deeeceb4ad0dada9e2c176cb6a1f42eee707064db2135ec3c7f9a00704324134520347d41df267a786675d386471c3aa5a1e6"' :
                                            'id="xs-components-links-module-ResultsBrowserModule-2ea602ac07d87b86b7cfdd780b5deeeceb4ad0dada9e2c176cb6a1f42eee707064db2135ec3c7f9a00704324134520347d41df267a786675d386471c3aa5a1e6"' }>
                                            <li class="link">
                                                <a href="components/ResultsBrowserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultsBrowserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RunSpatialSearchModule.html" data-type="entity-link" >RunSpatialSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RunSpatialSearchModule-8dbcdc6520f698c151f284523dd844852c529fc160a357f2b37111bb7ad81f658ac059237a81f77d4d9d24d6c99b071b710579197822a185c8ea2b6e6fa22be8"' : 'data-bs-target="#xs-components-links-module-RunSpatialSearchModule-8dbcdc6520f698c151f284523dd844852c529fc160a357f2b37111bb7ad81f658ac059237a81f77d4d9d24d6c99b071b710579197822a185c8ea2b6e6fa22be8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RunSpatialSearchModule-8dbcdc6520f698c151f284523dd844852c529fc160a357f2b37111bb7ad81f658ac059237a81f77d4d9d24d6c99b071b710579197822a185c8ea2b6e6fa22be8"' :
                                            'id="xs-components-links-module-RunSpatialSearchModule-8dbcdc6520f698c151f284523dd844852c529fc160a357f2b37111bb7ad81f658ac059237a81f77d4d9d24d6c99b071b710579197822a185c8ea2b6e6fa22be8"' }>
                                            <li class="link">
                                                <a href="components/RunSpatialSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RunSpatialSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchConfigBehaviorModule.html" data-type="entity-link" >SpatialSearchConfigBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchConfigBehaviorModule-45125978f1103846469a8e14245ede1e5622634694b5b10679782800e4f7ea2f216e3a111b45e8e4ab8bf10dda8fd0c13f6eae55cdf6bc7db46aa6d334847eec"' : 'data-bs-target="#xs-components-links-module-SpatialSearchConfigBehaviorModule-45125978f1103846469a8e14245ede1e5622634694b5b10679782800e4f7ea2f216e3a111b45e8e4ab8bf10dda8fd0c13f6eae55cdf6bc7db46aa6d334847eec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchConfigBehaviorModule-45125978f1103846469a8e14245ede1e5622634694b5b10679782800e4f7ea2f216e3a111b45e8e4ab8bf10dda8fd0c13f6eae55cdf6bc7db46aa6d334847eec"' :
                                            'id="xs-components-links-module-SpatialSearchConfigBehaviorModule-45125978f1103846469a8e14245ede1e5622634694b5b10679782800e4f7ea2f216e3a111b45e8e4ab8bf10dda8fd0c13f6eae55cdf6bc7db46aa6d334847eec"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchConfigBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchConfigBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchConfigModule.html" data-type="entity-link" >SpatialSearchConfigModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchConfigModule-54c5f21cb5ab97053e2e6e7e67418fd3d795d9cf96523323caed7bf3440bad0556a865c994791075ae7a3cce8343c6366671f0f4e5fb930a63ff6e24ae3e0b45"' : 'data-bs-target="#xs-components-links-module-SpatialSearchConfigModule-54c5f21cb5ab97053e2e6e7e67418fd3d795d9cf96523323caed7bf3440bad0556a865c994791075ae7a3cce8343c6366671f0f4e5fb930a63ff6e24ae3e0b45"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchConfigModule-54c5f21cb5ab97053e2e6e7e67418fd3d795d9cf96523323caed7bf3440bad0556a865c994791075ae7a3cce8343c6366671f0f4e5fb930a63ff6e24ae3e0b45"' :
                                            'id="xs-components-links-module-SpatialSearchConfigModule-54c5f21cb5ab97053e2e6e7e67418fd3d795d9cf96523323caed7bf3440bad0556a865c994791075ae7a3cce8343c6366671f0f4e5fb930a63ff6e24ae3e0b45"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchConfigComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchConfigComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchUiBehaviorModule.html" data-type="entity-link" >SpatialSearchUiBehaviorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchUiBehaviorModule-bf3a7e58e3ce37b9deb4b1fc9abdbbe5b62b223843687f30ebbf2d711f34e3251db56d659603dda48a9f511b098532ba41398acc778c2349a421aeaef75f3586"' : 'data-bs-target="#xs-components-links-module-SpatialSearchUiBehaviorModule-bf3a7e58e3ce37b9deb4b1fc9abdbbe5b62b223843687f30ebbf2d711f34e3251db56d659603dda48a9f511b098532ba41398acc778c2349a421aeaef75f3586"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchUiBehaviorModule-bf3a7e58e3ce37b9deb4b1fc9abdbbe5b62b223843687f30ebbf2d711f34e3251db56d659603dda48a9f511b098532ba41398acc778c2349a421aeaef75f3586"' :
                                            'id="xs-components-links-module-SpatialSearchUiBehaviorModule-bf3a7e58e3ce37b9deb4b1fc9abdbbe5b62b223843687f30ebbf2d711f34e3251db56d659603dda48a9f511b098532ba41398acc778c2349a421aeaef75f3586"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchUiBehaviorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchUiBehaviorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpatialSearchUiModule.html" data-type="entity-link" >SpatialSearchUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpatialSearchUiModule-f48c691e0050b973bbdc2fce5da4a9591ca361f00972476e4dc9d69a0ab75f2c36e23c870959e9d23b091702b18d943743171e991cd4de05b872871be54e2e01"' : 'data-bs-target="#xs-components-links-module-SpatialSearchUiModule-f48c691e0050b973bbdc2fce5da4a9591ca361f00972476e4dc9d69a0ab75f2c36e23c870959e9d23b091702b18d943743171e991cd4de05b872871be54e2e01"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpatialSearchUiModule-f48c691e0050b973bbdc2fce5da4a9591ca361f00972476e4dc9d69a0ab75f2c36e23c870959e9d23b091702b18d943743171e991cd4de05b872871be54e2e01"' :
                                            'id="xs-components-links-module-SpatialSearchUiModule-f48c691e0050b973bbdc2fce5da4a9591ca361f00972476e4dc9d69a0ab75f2c36e23c870959e9d23b091702b18d943743171e991cd4de05b872871be54e2e01"' }>
                                            <li class="link">
                                                <a href="components/SpatialSearchUiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpatialSearchUiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpinnerOverlayModule.html" data-type="entity-link" >SpinnerOverlayModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpinnerOverlayModule-a49cbd5be4f87c77ad72a40a08e2da0a7ea4eadcbddbee0765cc89c5f9557f668ef1a7ff01656890a78b6e967960ad5464eec0119b42872b4055cbde78ba3029"' : 'data-bs-target="#xs-components-links-module-SpinnerOverlayModule-a49cbd5be4f87c77ad72a40a08e2da0a7ea4eadcbddbee0765cc89c5f9557f668ef1a7ff01656890a78b6e967960ad5464eec0119b42872b4055cbde78ba3029"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpinnerOverlayModule-a49cbd5be4f87c77ad72a40a08e2da0a7ea4eadcbddbee0765cc89c5f9557f668ef1a7ff01656890a78b6e967960ad5464eec0119b42872b4055cbde78ba3029"' :
                                            'id="xs-components-links-module-SpinnerOverlayModule-a49cbd5be4f87c77ad72a40a08e2da0a7ea4eadcbddbee0765cc89c5f9557f668ef1a7ff01656890a78b6e967960ad5464eec0119b42872b4055cbde78ba3029"' }>
                                            <li class="link">
                                                <a href="components/SpinnerOverlayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerOverlayComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TermOccurrenceListModule.html" data-type="entity-link" >TermOccurrenceListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TermOccurrenceListModule-8e1d8c9371dfb2b97a08575030ec5629b98fa8f48790932a8953ea343f39df806c67c36db70fb9560b8f16996b6aedc943da0f1b705a96e7ebc2bda9ffc07d3e"' : 'data-bs-target="#xs-components-links-module-TermOccurrenceListModule-8e1d8c9371dfb2b97a08575030ec5629b98fa8f48790932a8953ea343f39df806c67c36db70fb9560b8f16996b6aedc943da0f1b705a96e7ebc2bda9ffc07d3e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TermOccurrenceListModule-8e1d8c9371dfb2b97a08575030ec5629b98fa8f48790932a8953ea343f39df806c67c36db70fb9560b8f16996b6aedc943da0f1b705a96e7ebc2bda9ffc07d3e"' :
                                            'id="xs-components-links-module-TermOccurrenceListModule-8e1d8c9371dfb2b97a08575030ec5629b98fa8f48790932a8953ea343f39df806c67c36db70fb9560b8f16996b6aedc943da0f1b705a96e7ebc2bda9ffc07d3e"' }>
                                            <li class="link">
                                                <a href="components/TermOccurrenceListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermOccurrenceListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThemingModule.html" data-type="entity-link" >ThemingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ThemingModule-ac33900697f4fce0eff8177b9d970eaef010cfb35f98e20950bbf23ea6bdfe8f10bec73ee0f520057e4bf852d3a805f52fce579a9fd2d23bee473727b8e8afc8"' : 'data-bs-target="#xs-injectables-links-module-ThemingModule-ac33900697f4fce0eff8177b9d970eaef010cfb35f98e20950bbf23ea6bdfe8f10bec73ee0f520057e4bf852d3a805f52fce579a9fd2d23bee473727b8e8afc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ThemingModule-ac33900697f4fce0eff8177b9d970eaef010cfb35f98e20950bbf23ea6bdfe8f10bec73ee0f520057e4bf852d3a805f52fce579a9fd2d23bee473727b8e8afc8"' :
                                        'id="xs-injectables-links-module-ThemingModule-ac33900697f4fce0eff8177b9d970eaef010cfb35f98e20950bbf23ea6bdfe8f10bec73ee0f520057e4bf852d3a805f52fce579a9fd2d23bee473727b8e8afc8"' }>
                                        <li class="link">
                                            <a href="injectables/ThemingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThumbnailCarouselModule.html" data-type="entity-link" >ThumbnailCarouselModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ThumbnailCarouselModule-9cfe247af61351a993bb8ca3c69f12568f26be33a120ba4d3fae138dd6dd0c0f042b06f503dc3594c10c229ecbf41db45f747dc8a1b8f736b500beaa3e84e155"' : 'data-bs-target="#xs-components-links-module-ThumbnailCarouselModule-9cfe247af61351a993bb8ca3c69f12568f26be33a120ba4d3fae138dd6dd0c0f042b06f503dc3594c10c229ecbf41db45f747dc8a1b8f736b500beaa3e84e155"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThumbnailCarouselModule-9cfe247af61351a993bb8ca3c69f12568f26be33a120ba4d3fae138dd6dd0c0f042b06f503dc3594c10c229ecbf41db45f747dc8a1b8f736b500beaa3e84e155"' :
                                            'id="xs-components-links-module-ThumbnailCarouselModule-9cfe247af61351a993bb8ca3c69f12568f26be33a120ba4d3fae138dd6dd0c0f042b06f503dc3594c10c229ecbf41db45f747dc8a1b8f736b500beaa3e84e155"' }>
                                            <li class="link">
                                                <a href="components/ThumbnailCarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThumbnailCarouselComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueBlockListModule.html" data-type="entity-link" >TissueBlockListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TissueBlockListModule-60c0ae332ebc4c87679a6b3b66fdcbcc3fbc2aab3691aec0b128d8b82a4b3482c068375a97eb5830cd04ab20baafefdc6dc018c87873e3a0d8015988fa2e31cd"' : 'data-bs-target="#xs-components-links-module-TissueBlockListModule-60c0ae332ebc4c87679a6b3b66fdcbcc3fbc2aab3691aec0b128d8b82a4b3482c068375a97eb5830cd04ab20baafefdc6dc018c87873e3a0d8015988fa2e31cd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueBlockListModule-60c0ae332ebc4c87679a6b3b66fdcbcc3fbc2aab3691aec0b128d8b82a4b3482c068375a97eb5830cd04ab20baafefdc6dc018c87873e3a0d8015988fa2e31cd"' :
                                            'id="xs-components-links-module-TissueBlockListModule-60c0ae332ebc4c87679a6b3b66fdcbcc3fbc2aab3691aec0b128d8b82a4b3482c068375a97eb5830cd04ab20baafefdc6dc018c87873e3a0d8015988fa2e31cd"' }>
                                            <li class="link">
                                                <a href="components/TissueBlockListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TissueBlockListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueSectionVisModule.html" data-type="entity-link" >TissueSectionVisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TissueSectionVisModule-ab68c2de4e7b1c64fcc9c993088e0f0ff7aa7167b3ae7e24bf046608196e0eb036d755e4604708e8c7cf938d4a9cc1f58cc6edb3c380500e78b7f71333910ae2"' : 'data-bs-target="#xs-components-links-module-TissueSectionVisModule-ab68c2de4e7b1c64fcc9c993088e0f0ff7aa7167b3ae7e24bf046608196e0eb036d755e4604708e8c7cf938d4a9cc1f58cc6edb3c380500e78b7f71333910ae2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueSectionVisModule-ab68c2de4e7b1c64fcc9c993088e0f0ff7aa7167b3ae7e24bf046608196e0eb036d755e4604708e8c7cf938d4a9cc1f58cc6edb3c380500e78b7f71333910ae2"' :
                                            'id="xs-components-links-module-TissueSectionVisModule-ab68c2de4e7b1c64fcc9c993088e0f0ff7aa7167b3ae7e24bf046608196e0eb036d755e4604708e8c7cf938d4a9cc1f58cc6edb3c380500e78b7f71333910ae2"' }>
                                            <li class="link">
                                                <a href="components/TissueSectionVisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TissueSectionVisComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewerModule.html" data-type="entity-link" >ViewerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ViewerModule-760b86c3c92b1040c837db07af0ce77dc6a7c9c83cd16eaa9c6f16d787a33c1fa8846954512e2b6576a1c77643c74afad0dc8549c57a9b579cd4caa48cc85c5a"' : 'data-bs-target="#xs-components-links-module-ViewerModule-760b86c3c92b1040c837db07af0ce77dc6a7c9c83cd16eaa9c6f16d787a33c1fa8846954512e2b6576a1c77643c74afad0dc8549c57a9b579cd4caa48cc85c5a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewerModule-760b86c3c92b1040c837db07af0ce77dc6a7c9c83cd16eaa9c6f16d787a33c1fa8846954512e2b6576a1c77643c74afad0dc8549c57a9b579cd4caa48cc85c5a"' :
                                            'id="xs-components-links-module-ViewerModule-760b86c3c92b1040c837db07af0ce77dc6a7c9c83cd16eaa9c6f16d787a33c1fa8846954512e2b6576a1c77643c74afad0dc8549c57a9b579cd4caa48cc85c5a"' }>
                                            <li class="link">
                                                <a href="components/ViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/AddSearch.html" data-type="entity-link" >AddSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataStateSelectors.html" data-type="entity-link" >DataStateSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlatNode.html" data-type="entity-link" >FlatNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenerateSpatialSearch.html" data-type="entity-link" >GenerateSpatialSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitializationState.html" data-type="entity-link" >InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel.html" data-type="entity-link" >MessageChannel</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveToNode.html" data-type="entity-link" >MoveToNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReallyUpdateSpatialSearch.html" data-type="entity-link" >ReallyUpdateSpatialSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveSearch.html" data-type="entity-link" >RemoveSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPosition.html" data-type="entity-link" >ResetPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetRadius.html" data-type="entity-link" >ResetRadius</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetExecuteSearchOnGenerate.html" data-type="entity-link" >SetExecuteSearchOnGenerate</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetOrgan.html" data-type="entity-link" >SetOrgan</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetPosition.html" data-type="entity-link" >SetPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetRadius.html" data-type="entity-link" >SetRadius</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSelectedSearches.html" data-type="entity-link" >SetSelectedSearches</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSex.html" data-type="entity-link" >SetSex</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpatialSearchFilterSelectors.html" data-type="entity-link" >SpatialSearchFilterSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpatialSearchUiSelectors.html" data-type="entity-link" >SpatialSearchUiSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartSpatialSearchFlow.html" data-type="entity-link" >StartSpatialSearchFlow</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFilter.html" data-type="entity-link" >UpdateFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSpatialSearch.html" data-type="entity-link" >UpdateSpatialSearch</a>
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
                                    <a href="injectables/AppRootOverlayContainer.html" data-type="entity-link" >AppRootOverlayContainer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ColorAssignmentState.html" data-type="entity-link" >ColorAssignmentState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataState.html" data-type="entity-link" >DataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DelegateDataSourceService.html" data-type="entity-link" >DelegateDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState.html" data-type="entity-link" >IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListResultsState.html" data-type="entity-link" >ListResultsState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologySearchService.html" data-type="entity-link" >OntologySearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneState.html" data-type="entity-link" >SceneState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpatialSearchFilterState.html" data-type="entity-link" >SpatialSearchFilterState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpatialSearchUiState.html" data-type="entity-link" >SpatialSearchUiState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkerDataSourceService.html" data-type="entity-link" >WorkerDataSourceService</a>
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
                                <a href="interfaces/AppOptions.html" data-type="entity-link" >AppOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Color.html" data-type="entity-link" >Color</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorAssignmentStateModel.html" data-type="entity-link" >ColorAssignmentStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContentContainerChanged.html" data-type="entity-link" >ContentContainerChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataStateModel.html" data-type="entity-link" >DataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition.html" data-type="entity-link" >DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DelegateDataSourceOptions.html" data-type="entity-link" >DelegateDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerContainersChanged.html" data-type="entity-link" >DrawerContainersChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerInitialized.html" data-type="entity-link" >DrawerInitialized</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawerToggled.html" data-type="entity-link" >DrawerToggled</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link" >IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResult.html" data-type="entity-link" >ListResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResultsStateModel.html" data-type="entity-link" >ListResultsStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig.html" data-type="entity-link" >MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologySelection.html" data-type="entity-link" >OntologySelection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Position.html" data-type="entity-link" >Position</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RadiusSettings.html" data-type="entity-link" >RadiusSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel.html" data-type="entity-link" >SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link" >SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchFilterItem.html" data-type="entity-link" >SpatialSearchFilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchUiModel.html" data-type="entity-link" >SpatialSearchUiModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TermResult.html" data-type="entity-link" >TermResult</a>
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