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
                    <a href="index.html" data-type="index-link">ccf-rui</a>
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
                                            'data-bs-target="#components-links-module-AppModule-af19a5a60e23f4c9c12993a4207697f1b81146b58cc813ca44fa92eda2cf5c60d2de965d6644a5ec00e0abc364379d0a7ef5fe07cd2328327b6376dad4eae0ed"' : 'data-bs-target="#xs-components-links-module-AppModule-af19a5a60e23f4c9c12993a4207697f1b81146b58cc813ca44fa92eda2cf5c60d2de965d6644a5ec00e0abc364379d0a7ef5fe07cd2328327b6376dad4eae0ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-af19a5a60e23f4c9c12993a4207697f1b81146b58cc813ca44fa92eda2cf5c60d2de965d6644a5ec00e0abc364379d0a7ef5fe07cd2328327b6376dad4eae0ed"' :
                                            'id="xs-components-links-module-AppModule-af19a5a60e23f4c9c12993a4207697f1b81146b58cc813ca44fa92eda2cf5c60d2de965d6644a5ec00e0abc364379d0a7ef5fe07cd2328327b6376dad4eae0ed"' }>
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
                                <a href="modules/BlockSizeInputModule.html" data-type="entity-link" >BlockSizeInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BlockSizeInputModule-78edc5a58379a752bb43ab332e22e6767a91bd12cf3d5b4166003deaaee24ac28905908d551b0d64ac9a08db0cf325b0bd7df34239627b53b06d827657c71b1e"' : 'data-bs-target="#xs-components-links-module-BlockSizeInputModule-78edc5a58379a752bb43ab332e22e6767a91bd12cf3d5b4166003deaaee24ac28905908d551b0d64ac9a08db0cf325b0bd7df34239627b53b06d827657c71b1e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlockSizeInputModule-78edc5a58379a752bb43ab332e22e6767a91bd12cf3d5b4166003deaaee24ac28905908d551b0d64ac9a08db0cf325b0bd7df34239627b53b06d827657c71b1e"' :
                                            'id="xs-components-links-module-BlockSizeInputModule-78edc5a58379a752bb43ab332e22e6767a91bd12cf3d5b4166003deaaee24ac28905908d551b0d64ac9a08db0cf325b0bd7df34239627b53b06d827657c71b1e"' }>
                                            <li class="link">
                                                <a href="components/BlockSizeInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlockSizeInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContentModule.html" data-type="entity-link" >ContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ContentModule-45bca6aecb0bf6080f85c235c0732fb0a8fae3f76f367c3aeb82bc4c5c6a939bca0e01791cb2ef31a02e7d5f2bea7af9affba0df1e683a24ec01247e7efb9435"' : 'data-bs-target="#xs-components-links-module-ContentModule-45bca6aecb0bf6080f85c235c0732fb0a8fae3f76f367c3aeb82bc4c5c6a939bca0e01791cb2ef31a02e7d5f2bea7af9affba0df1e683a24ec01247e7efb9435"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentModule-45bca6aecb0bf6080f85c235c0732fb0a8fae3f76f367c3aeb82bc4c5c6a939bca0e01791cb2ef31a02e7d5f2bea7af9affba0df1e683a24ec01247e7efb9435"' :
                                            'id="xs-components-links-module-ContentModule-45bca6aecb0bf6080f85c235c0732fb0a8fae3f76f367c3aeb82bc4c5c6a939bca0e01791cb2ef31a02e7d5f2bea7af9affba0df1e683a24ec01247e7efb9435"' }>
                                            <li class="link">
                                                <a href="components/ContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DetailsLabelModule.html" data-type="entity-link" >DetailsLabelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DetailsLabelModule-06ce5ff8ffb8b7b690bde6afb48ecb3ae47aea9e2d3ce0d5e9f64de2840e65b69a639f1cba873cdf7d9d4a068619f593409a761fabf7016880dde1f6894f5350"' : 'data-bs-target="#xs-components-links-module-DetailsLabelModule-06ce5ff8ffb8b7b690bde6afb48ecb3ae47aea9e2d3ce0d5e9f64de2840e65b69a639f1cba873cdf7d9d4a068619f593409a761fabf7016880dde1f6894f5350"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DetailsLabelModule-06ce5ff8ffb8b7b690bde6afb48ecb3ae47aea9e2d3ce0d5e9f64de2840e65b69a639f1cba873cdf7d9d4a068619f593409a761fabf7016880dde1f6894f5350"' :
                                            'id="xs-components-links-module-DetailsLabelModule-06ce5ff8ffb8b7b690bde6afb48ecb3ae47aea9e2d3ce0d5e9f64de2840e65b69a639f1cba873cdf7d9d4a068619f593409a761fabf7016880dde1f6894f5350"' }>
                                            <li class="link">
                                                <a href="components/DetailsLabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailsLabelComponent</a>
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
                                <a href="modules/ExtractionSetDropdownModule.html" data-type="entity-link" >ExtractionSetDropdownModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExtractionSetDropdownModule-65eb935099099238e555300fe1028889305de43e7eed70fe803d2d1e49e8716bf65252b8b61c05a6e7419ab97faa03677b0bd243f5a7f2b22bc72df538075e70"' : 'data-bs-target="#xs-components-links-module-ExtractionSetDropdownModule-65eb935099099238e555300fe1028889305de43e7eed70fe803d2d1e49e8716bf65252b8b61c05a6e7419ab97faa03677b0bd243f5a7f2b22bc72df538075e70"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExtractionSetDropdownModule-65eb935099099238e555300fe1028889305de43e7eed70fe803d2d1e49e8716bf65252b8b61c05a6e7419ab97faa03677b0bd243f5a7f2b22bc72df538075e70"' :
                                            'id="xs-components-links-module-ExtractionSetDropdownModule-65eb935099099238e555300fe1028889305de43e7eed70fe803d2d1e49e8716bf65252b8b61c05a6e7419ab97faa03677b0bd243f5a7f2b22bc72df538075e70"' }>
                                            <li class="link">
                                                <a href="components/ExtractionSetDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExtractionSetDropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HeaderModule-ef3754309416ed152c411cb7c187252e8bceb40ff286c6c0f3dd5ba4bebb288e924d1827b75726c98927e78a4a1ef598de4d71875677f3a76c543b00190c0494"' : 'data-bs-target="#xs-components-links-module-HeaderModule-ef3754309416ed152c411cb7c187252e8bceb40ff286c6c0f3dd5ba4bebb288e924d1827b75726c98927e78a4a1ef598de4d71875677f3a76c543b00190c0494"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-ef3754309416ed152c411cb7c187252e8bceb40ff286c6c0f3dd5ba4bebb288e924d1827b75726c98927e78a4a1ef598de4d71875677f3a76c543b00190c0494"' :
                                            'id="xs-components-links-module-HeaderModule-ef3754309416ed152c411cb7c187252e8bceb40ff286c6c0f3dd5ba4bebb288e924d1827b75726c98927e78a4a1ef598de4d71875677f3a76c543b00190c0494"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JsonFileReaderModule.html" data-type="entity-link" >JsonFileReaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-JsonFileReaderModule-082f36e9949ba90f88dcc16d74fa06085ef45ad4e8060a6a058c23a3b664593f6b7e249ca99f6248de8a38cf9f657cca0a8ac0f19b6f202ebc81c5ec3c54c77d"' : 'data-bs-target="#xs-components-links-module-JsonFileReaderModule-082f36e9949ba90f88dcc16d74fa06085ef45ad4e8060a6a058c23a3b664593f6b7e249ca99f6248de8a38cf9f657cca0a8ac0f19b6f202ebc81c5ec3c54c77d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-JsonFileReaderModule-082f36e9949ba90f88dcc16d74fa06085ef45ad4e8060a6a058c23a3b664593f6b7e249ca99f6248de8a38cf9f657cca0a8ac0f19b6f202ebc81c5ec3c54c77d"' :
                                            'id="xs-components-links-module-JsonFileReaderModule-082f36e9949ba90f88dcc16d74fa06085ef45ad4e8060a6a058c23a3b664593f6b7e249ca99f6248de8a38cf9f657cca0a8ac0f19b6f202ebc81c5ec3c54c77d"' }>
                                            <li class="link">
                                                <a href="components/JsonFileReaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JsonFileReaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LabeledSlideToggleModule.html" data-type="entity-link" >LabeledSlideToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LabeledSlideToggleModule-01c7ab85926af77a0bc168e517029f5c968f99266fda07e90b3538dfe55c639b9f0fe97eed8401ab7f9ead02ff0eec61dc7f2729e7ae032c969597fa332c52dd"' : 'data-bs-target="#xs-components-links-module-LabeledSlideToggleModule-01c7ab85926af77a0bc168e517029f5c968f99266fda07e90b3538dfe55c639b9f0fe97eed8401ab7f9ead02ff0eec61dc7f2729e7ae032c969597fa332c52dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LabeledSlideToggleModule-01c7ab85926af77a0bc168e517029f5c968f99266fda07e90b3538dfe55c639b9f0fe97eed8401ab7f9ead02ff0eec61dc7f2729e7ae032c969597fa332c52dd"' :
                                            'id="xs-components-links-module-LabeledSlideToggleModule-01c7ab85926af77a0bc168e517029f5c968f99266fda07e90b3538dfe55c639b9f0fe97eed8401ab7f9ead02ff0eec61dc7f2729e7ae032c969597fa332c52dd"' }>
                                            <li class="link">
                                                <a href="components/LabeledSlideToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabeledSlideToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeftSidebarModule.html" data-type="entity-link" >LeftSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LeftSidebarModule-25e189193522d9618cf905709475fea79ab4e091f07d0947562c95ab88da136cbd47b929c211aa90d09cbff510519ee573ffb818ad22008641740797794b81ac"' : 'data-bs-target="#xs-components-links-module-LeftSidebarModule-25e189193522d9618cf905709475fea79ab4e091f07d0947562c95ab88da136cbd47b929c211aa90d09cbff510519ee573ffb818ad22008641740797794b81ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeftSidebarModule-25e189193522d9618cf905709475fea79ab4e091f07d0947562c95ab88da136cbd47b929c211aa90d09cbff510519ee573ffb818ad22008641740797794b81ac"' :
                                            'id="xs-components-links-module-LeftSidebarModule-25e189193522d9618cf905709475fea79ab4e091f07d0947562c95ab88da136cbd47b929c211aa90d09cbff510519ee573ffb818ad22008641740797794b81ac"' }>
                                            <li class="link">
                                                <a href="components/LeftSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeftSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NameInputModule.html" data-type="entity-link" >NameInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NameInputModule-687d1b936abc9fc2b19d5954b819d11cf48b3b664f548671bd0a748986f3b3ba62c69af04dc8683f504d8ca5399ed3e423376da864b5a45eb3f218bc8eebf1ac"' : 'data-bs-target="#xs-components-links-module-NameInputModule-687d1b936abc9fc2b19d5954b819d11cf48b3b664f548671bd0a748986f3b3ba62c69af04dc8683f504d8ca5399ed3e423376da864b5a45eb3f218bc8eebf1ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NameInputModule-687d1b936abc9fc2b19d5954b819d11cf48b3b664f548671bd0a748986f3b3ba62c69af04dc8683f504d8ca5399ed3e423376da864b5a45eb3f218bc8eebf1ac"' :
                                            'id="xs-components-links-module-NameInputModule-687d1b936abc9fc2b19d5954b819d11cf48b3b664f548671bd0a748986f3b3ba62c69af04dc8683f504d8ca5399ed3e423376da864b5a45eb3f218bc8eebf1ac"' }>
                                            <li class="link">
                                                <a href="components/NameInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NameInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationContentModule.html" data-type="entity-link" >RegistrationContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistrationContentModule-12ca81ab76483840827139a6c5193c51383cf7d8bf9510dbb103b004a5e2df174fd97ed570313ad936835d25b08b88acfc719b4dac65bbc4854d5c48e770af85"' : 'data-bs-target="#xs-components-links-module-RegistrationContentModule-12ca81ab76483840827139a6c5193c51383cf7d8bf9510dbb103b004a5e2df174fd97ed570313ad936835d25b08b88acfc719b4dac65bbc4854d5c48e770af85"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationContentModule-12ca81ab76483840827139a6c5193c51383cf7d8bf9510dbb103b004a5e2df174fd97ed570313ad936835d25b08b88acfc719b4dac65bbc4854d5c48e770af85"' :
                                            'id="xs-components-links-module-RegistrationContentModule-12ca81ab76483840827139a6c5193c51383cf7d8bf9510dbb103b004a5e2df174fd97ed570313ad936835d25b08b88acfc719b4dac65bbc4854d5c48e770af85"' }>
                                            <li class="link">
                                                <a href="components/RegistrationContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationMetadataModule.html" data-type="entity-link" >RegistrationMetadataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistrationMetadataModule-3d0dfea0f46ce6eec00835414f7bc5223ad5f4fada6332d3cb2736cdbe6e68ed463a54963050baee833de3cbfcf43f508ccd7585d9643ea33e0b552da561e27b"' : 'data-bs-target="#xs-components-links-module-RegistrationMetadataModule-3d0dfea0f46ce6eec00835414f7bc5223ad5f4fada6332d3cb2736cdbe6e68ed463a54963050baee833de3cbfcf43f508ccd7585d9643ea33e0b552da561e27b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationMetadataModule-3d0dfea0f46ce6eec00835414f7bc5223ad5f4fada6332d3cb2736cdbe6e68ed463a54963050baee833de3cbfcf43f508ccd7585d9643ea33e0b552da561e27b"' :
                                            'id="xs-components-links-module-RegistrationMetadataModule-3d0dfea0f46ce6eec00835414f7bc5223ad5f4fada6332d3cb2736cdbe6e68ed463a54963050baee833de3cbfcf43f508ccd7585d9643ea33e0b552da561e27b"' }>
                                            <li class="link">
                                                <a href="components/RegistrationMetadataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationMetadataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationModalModule.html" data-type="entity-link" >RegistrationModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistrationModalModule-26b37900311aa352c99a9befc79b17365d2cde777dbabdff65daff163e02e0b61b7d0e213eaba3e8b7ca831dc8ad0711051bc00426f33239ed81727f3d7d8616"' : 'data-bs-target="#xs-components-links-module-RegistrationModalModule-26b37900311aa352c99a9befc79b17365d2cde777dbabdff65daff163e02e0b61b7d0e213eaba3e8b7ca831dc8ad0711051bc00426f33239ed81727f3d7d8616"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationModalModule-26b37900311aa352c99a9befc79b17365d2cde777dbabdff65daff163e02e0b61b7d0e213eaba3e8b7ca831dc8ad0711051bc00426f33239ed81727f3d7d8616"' :
                                            'id="xs-components-links-module-RegistrationModalModule-26b37900311aa352c99a9befc79b17365d2cde777dbabdff65daff163e02e0b61b7d0e213eaba3e8b7ca831dc8ad0711051bc00426f33239ed81727f3d7d8616"' }>
                                            <li class="link">
                                                <a href="components/RegistrationModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewButtonModule.html" data-type="entity-link" >ReviewButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReviewButtonModule-3f6cbd694a557533a7c900057f4e8f8fe559a78cb060b2aeeffd12ef983fb6a393ce2c219cfe2ae41a16e1e23f224dc744a824fe504b3da248440616a6112eb0"' : 'data-bs-target="#xs-components-links-module-ReviewButtonModule-3f6cbd694a557533a7c900057f4e8f8fe559a78cb060b2aeeffd12ef983fb6a393ce2c219cfe2ae41a16e1e23f224dc744a824fe504b3da248440616a6112eb0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewButtonModule-3f6cbd694a557533a7c900057f4e8f8fe559a78cb060b2aeeffd12ef983fb6a393ce2c219cfe2ae41a16e1e23f224dc744a824fe504b3da248440616a6112eb0"' :
                                            'id="xs-components-links-module-ReviewButtonModule-3f6cbd694a557533a7c900057f4e8f8fe559a78cb060b2aeeffd12ef983fb6a393ce2c219cfe2ae41a16e1e23f224dc744a824fe504b3da248440616a6112eb0"' }>
                                            <li class="link">
                                                <a href="components/ReviewButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewModalModule.html" data-type="entity-link" >ReviewModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReviewModalModule-61a74755a2fbe6a6606fa5390be7866dcbc3814338da18e024f1e3550bf9ac580b40949beda075446438e5f78ed69b871b0b4348c2a0f0cb943fad50a8b5bf27"' : 'data-bs-target="#xs-components-links-module-ReviewModalModule-61a74755a2fbe6a6606fa5390be7866dcbc3814338da18e024f1e3550bf9ac580b40949beda075446438e5f78ed69b871b0b4348c2a0f0cb943fad50a8b5bf27"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewModalModule-61a74755a2fbe6a6606fa5390be7866dcbc3814338da18e024f1e3550bf9ac580b40949beda075446438e5f78ed69b871b0b4348c2a0f0cb943fad50a8b5bf27"' :
                                            'id="xs-components-links-module-ReviewModalModule-61a74755a2fbe6a6606fa5390be7866dcbc3814338da18e024f1e3550bf9ac580b40949beda075446438e5f78ed69b871b0b4348c2a0f0cb943fad50a8b5bf27"' }>
                                            <li class="link">
                                                <a href="components/ReviewModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RightSidebarModule.html" data-type="entity-link" >RightSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RightSidebarModule-dffd5790b0db67683df76b347ad6a788dbe042da7b35257b7496f7f4e61567f52532dc6af3995500bad0ba89544baa715b69f5363df4792cc0b4f699ad7468f6"' : 'data-bs-target="#xs-components-links-module-RightSidebarModule-dffd5790b0db67683df76b347ad6a788dbe042da7b35257b7496f7f4e61567f52532dc6af3995500bad0ba89544baa715b69f5363df4792cc0b4f699ad7468f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RightSidebarModule-dffd5790b0db67683df76b347ad6a788dbe042da7b35257b7496f7f4e61567f52532dc6af3995500bad0ba89544baa715b69f5363df4792cc0b4f699ad7468f6"' :
                                            'id="xs-components-links-module-RightSidebarModule-dffd5790b0db67683df76b347ad6a788dbe042da7b35257b7496f7f4e61567f52532dc6af3995500bad0ba89544baa715b69f5363df4792cc0b4f699ad7468f6"' }>
                                            <li class="link">
                                                <a href="components/RightSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RightSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RotationSliderModule.html" data-type="entity-link" >RotationSliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RotationSliderModule-5fa962f7af448d4e4132b531247eb63bb7f5c00898c1d5c5c2b350087ba4748f96c740602a58069edfc1016a0438f1ae00af44a6b85e1682b6423e896c9c4d41"' : 'data-bs-target="#xs-components-links-module-RotationSliderModule-5fa962f7af448d4e4132b531247eb63bb7f5c00898c1d5c5c2b350087ba4748f96c740602a58069edfc1016a0438f1ae00af44a6b85e1682b6423e896c9c4d41"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RotationSliderModule-5fa962f7af448d4e4132b531247eb63bb7f5c00898c1d5c5c2b350087ba4748f96c740602a58069edfc1016a0438f1ae00af44a6b85e1682b6423e896c9c4d41"' :
                                            'id="xs-components-links-module-RotationSliderModule-5fa962f7af448d4e4132b531247eb63bb7f5c00898c1d5c5c2b350087ba4748f96c740602a58069edfc1016a0438f1ae00af44a6b85e1682b6423e896c9c4d41"' }>
                                            <li class="link">
                                                <a href="components/RotationSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RotationSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SlicesInputModule.html" data-type="entity-link" >SlicesInputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SlicesInputModule-e43b7c93ace404d0c184fbbaf0cc78e78aeadd8c9675a36b41ed5b3f87d30c6f62a7fdcc2c9f8776bab11a9bbe606378fa367f50dc5de28070f4438bb211d3a9"' : 'data-bs-target="#xs-components-links-module-SlicesInputModule-e43b7c93ace404d0c184fbbaf0cc78e78aeadd8c9675a36b41ed5b3f87d30c6f62a7fdcc2c9f8776bab11a9bbe606378fa367f50dc5de28070f4438bb211d3a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlicesInputModule-e43b7c93ace404d0c184fbbaf0cc78e78aeadd8c9675a36b41ed5b3f87d30c6f62a7fdcc2c9f8776bab11a9bbe606378fa367f50dc5de28070f4438bb211d3a9"' :
                                            'id="xs-components-links-module-SlicesInputModule-e43b7c93ace404d0c184fbbaf0cc78e78aeadd8c9675a36b41ed5b3f87d30c6f62a7fdcc2c9f8776bab11a9bbe606378fa367f50dc5de28070f4438bb211d3a9"' }>
                                            <li class="link">
                                                <a href="components/SlicesInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlicesInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StageNavModule.html" data-type="entity-link" >StageNavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StageNavModule-6b1fcbe56c64bacd0b0cba6c647db220c2be5a3d3e242394535a48cb3b6839e5700f5401bcc747195255367a9bd429f386aa744f27e4aa87c3baf4e3bbf20daa"' : 'data-bs-target="#xs-components-links-module-StageNavModule-6b1fcbe56c64bacd0b0cba6c647db220c2be5a3d3e242394535a48cb3b6839e5700f5401bcc747195255367a9bd429f386aa744f27e4aa87c3baf4e3bbf20daa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StageNavModule-6b1fcbe56c64bacd0b0cba6c647db220c2be5a3d3e242394535a48cb3b6839e5700f5401bcc747195255367a9bd429f386aa744f27e4aa87c3baf4e3bbf20daa"' :
                                            'id="xs-components-links-module-StageNavModule-6b1fcbe56c64bacd0b0cba6c647db220c2be5a3d3e242394535a48cb3b6839e5700f5401bcc747195255367a9bd429f386aa744f27e4aa87c3baf4e3bbf20daa"' }>
                                            <li class="link">
                                                <a href="components/StageNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StageNavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TagListModule.html" data-type="entity-link" >TagListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TagListModule-26cb1e7e5e05e8094f600b60dd4a9f16eba8fb2049f6907ab9cb92376b55d55258b1a7fc1afbeb10d2c138b09f4756ac1d003a0d9098d53cf49dc3baf553dcac"' : 'data-bs-target="#xs-components-links-module-TagListModule-26cb1e7e5e05e8094f600b60dd4a9f16eba8fb2049f6907ab9cb92376b55d55258b1a7fc1afbeb10d2c138b09f4756ac1d003a0d9098d53cf49dc3baf553dcac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagListModule-26cb1e7e5e05e8094f600b60dd4a9f16eba8fb2049f6907ab9cb92376b55d55258b1a7fc1afbeb10d2c138b09f4756ac1d003a0d9098d53cf49dc3baf553dcac"' :
                                            'id="xs-components-links-module-TagListModule-26cb1e7e5e05e8094f600b60dd4a9f16eba8fb2049f6907ab9cb92376b55d55258b1a7fc1afbeb10d2c138b09f4756ac1d003a0d9098d53cf49dc3baf553dcac"' }>
                                            <li class="link">
                                                <a href="components/TagListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagSearchModule.html" data-type="entity-link" >TagSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TagSearchModule-349bab9e55e1fdfaf39d977ece643eefb84d62a142ddee62a609d443f0947796b3238deed47c2ad8b71de46e85b654fe4d3e14e117c6b52a75bcdf319882847f"' : 'data-bs-target="#xs-components-links-module-TagSearchModule-349bab9e55e1fdfaf39d977ece643eefb84d62a142ddee62a609d443f0947796b3238deed47c2ad8b71de46e85b654fe4d3e14e117c6b52a75bcdf319882847f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagSearchModule-349bab9e55e1fdfaf39d977ece643eefb84d62a142ddee62a609d443f0947796b3238deed47c2ad8b71de46e85b654fe4d3e14e117c6b52a75bcdf319882847f"' :
                                            'id="xs-components-links-module-TagSearchModule-349bab9e55e1fdfaf39d977ece643eefb84d62a142ddee62a609d443f0947796b3238deed47c2ad8b71de46e85b654fe4d3e14e117c6b52a75bcdf319882847f"' }>
                                            <li class="link">
                                                <a href="components/TagSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagSearchComponent</a>
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
                                <a href="modules/VideoModalLauncherModule.html" data-type="entity-link" >VideoModalLauncherModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VideoModalLauncherModule-ce1c507569f77acb4042f40ac54be1d580f8149630927232c88adb1e5d06263cacbfa51903ad9e2f185617f57278b3d408ba12a795f6ca2df0606ce0f0e02a98"' : 'data-bs-target="#xs-components-links-module-VideoModalLauncherModule-ce1c507569f77acb4042f40ac54be1d580f8149630927232c88adb1e5d06263cacbfa51903ad9e2f185617f57278b3d408ba12a795f6ca2df0606ce0f0e02a98"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VideoModalLauncherModule-ce1c507569f77acb4042f40ac54be1d580f8149630927232c88adb1e5d06263cacbfa51903ad9e2f185617f57278b3d408ba12a795f6ca2df0606ce0f0e02a98"' :
                                            'id="xs-components-links-module-VideoModalLauncherModule-ce1c507569f77acb4042f40ac54be1d580f8149630927232c88adb1e5d06263cacbfa51903ad9e2f185617f57278b3d408ba12a795f6ca2df0606ce0f0e02a98"' }>
                                            <li class="link">
                                                <a href="components/VideoModalLauncherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoModalLauncherComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoModalModule.html" data-type="entity-link" >VideoModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VideoModalModule-ae4400be79592726d3ea7e0e9f31b8af2d9eea1e7340dc2bdc455939f34d1ab45b4a70c5893648d1f273f70c518e15b79569d16d6f6abc32e12d5b8e9982cb5f"' : 'data-bs-target="#xs-components-links-module-VideoModalModule-ae4400be79592726d3ea7e0e9f31b8af2d9eea1e7340dc2bdc455939f34d1ab45b4a70c5893648d1f273f70c518e15b79569d16d6f6abc32e12d5b8e9982cb5f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VideoModalModule-ae4400be79592726d3ea7e0e9f31b8af2d9eea1e7340dc2bdc455939f34d1ab45b4a70c5893648d1f273f70c518e15b79569d16d6f6abc32e12d5b8e9982cb5f"' :
                                            'id="xs-components-links-module-VideoModalModule-ae4400be79592726d3ea7e0e9f31b8af2d9eea1e7340dc2bdc455939f34d1ab45b4a70c5893648d1f273f70c518e15b79569d16d6f6abc32e12d5b8e9982cb5f"' }>
                                            <li class="link">
                                                <a href="components/VideoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisibilityMenuModule.html" data-type="entity-link" >VisibilityMenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VisibilityMenuModule-485b56c83a173a2dbca4f1c2e5413d53157f4cd855fda70382b34bb0bfba9014755bef67e103889ce18f25d8f0b95bb9400d5eaba0704d8bcd35bdb8ac04e42e"' : 'data-bs-target="#xs-components-links-module-VisibilityMenuModule-485b56c83a173a2dbca4f1c2e5413d53157f4cd855fda70382b34bb0bfba9014755bef67e103889ce18f25d8f0b95bb9400d5eaba0704d8bcd35bdb8ac04e42e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisibilityMenuModule-485b56c83a173a2dbca4f1c2e5413d53157f4cd855fda70382b34bb0bfba9014755bef67e103889ce18f25d8f0b95bb9400d5eaba0704d8bcd35bdb8ac04e42e"' :
                                            'id="xs-components-links-module-VisibilityMenuModule-485b56c83a173a2dbca4f1c2e5413d53157f4cd855fda70382b34bb0bfba9014755bef67e103889ce18f25d8f0b95bb9400d5eaba0704d8bcd35bdb8ac04e42e"' }>
                                            <li class="link">
                                                <a href="components/VisibilityMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisibilityMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisibilityToggleModule.html" data-type="entity-link" >VisibilityToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VisibilityToggleModule-cd2a6824bcb5772f32daca34b643e2e740e756d36a3ac08f8670cd6115945dd81a0451a8c65cc8b1dd83fc0c086ce865a6e6205a6f821edfef546051801e491a"' : 'data-bs-target="#xs-components-links-module-VisibilityToggleModule-cd2a6824bcb5772f32daca34b643e2e740e756d36a3ac08f8670cd6115945dd81a0451a8c65cc8b1dd83fc0c086ce865a6e6205a6f821edfef546051801e491a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisibilityToggleModule-cd2a6824bcb5772f32daca34b643e2e740e756d36a3ac08f8670cd6115945dd81a0451a8c65cc8b1dd83fc0c086ce865a6e6205a6f821edfef546051801e491a"' :
                                            'id="xs-components-links-module-VisibilityToggleModule-cd2a6824bcb5772f32daca34b643e2e740e756d36a3ac08f8670cd6115945dd81a0451a8c65cc8b1dd83fc0c086ce865a6e6205a6f821edfef546051801e491a"' }>
                                            <li class="link">
                                                <a href="components/VisibilityToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisibilityToggleComponent</a>
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
                                <a href="components/ContentComponent-1.html" data-type="entity-link" >ContentComponent</a>
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
                                <a href="classes/InitializationState.html" data-type="entity-link" >InitializationState</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageChannel.html" data-type="entity-link" >MessageChannel</a>
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
                                    <a href="injectables/AnatomicalStructureTagState.html" data-type="entity-link" >AnatomicalStructureTagState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconRegistryState.html" data-type="entity-link" >IconRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelState.html" data-type="entity-link" >ModelState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageState.html" data-type="entity-link" >PageState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReferenceDataState.html" data-type="entity-link" >ReferenceDataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegistrationState.html" data-type="entity-link" >RegistrationState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneState.html" data-type="entity-link" >SceneState</a>
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
                                <a href="interfaces/AnatomicalStructureTagStateModel.html" data-type="entity-link" >AnatomicalStructureTagStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppOptions.html" data-type="entity-link" >AppOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlockSize.html" data-type="entity-link" >BlockSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Collision.html" data-type="entity-link" >Collision</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContentContainerChanged.html" data-type="entity-link" >ContentContainerChanged</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition.html" data-type="entity-link" >DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentationContent.html" data-type="entity-link" >DocumentationContent</a>
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
                                <a href="interfaces/ExtractionSet.html" data-type="entity-link" >ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConfig.html" data-type="entity-link" >GlobalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link" >IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageServiceConfig.html" data-type="entity-link" >MessageServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetaDataField.html" data-type="entity-link" >MetaDataField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelStateModel.html" data-type="entity-link" >ModelStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganConfig.html" data-type="entity-link" >OrganConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganData.html" data-type="entity-link" >OrganData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageStateModel.html" data-type="entity-link" >PageStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Person.html" data-type="entity-link" >Person</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReferenceDataStateModel.html" data-type="entity-link" >ReferenceDataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationStateModel.html" data-type="entity-link" >RegistrationStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReviewModalData.html" data-type="entity-link" >ReviewModalData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rotation.html" data-type="entity-link" >Rotation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel.html" data-type="entity-link" >SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesConfig.html" data-type="entity-link" >SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlicesConfig-1.html" data-type="entity-link" >SlicesConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagSearchResult.html" data-type="entity-link" >TagSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserName.html" data-type="entity-link" >UserName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisibilityItem.html" data-type="entity-link" >VisibilityItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XYZTriplet.html" data-type="entity-link" >XYZTriplet</a>
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