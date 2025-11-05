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
                    <a href="index.html" data-type="index-link">Code Documentation for ccf-rui</a>
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
                                            'data-bs-target="#components-links-module-AppModule-d327cb06aa072e903279130833ff7b2933a73df84d7fd31b07d0f0408e51225bddef420a009d7d209deaaa90ac11cefbaf0978178ce2f5508987dada1961d4ac"' : 'data-bs-target="#xs-components-links-module-AppModule-d327cb06aa072e903279130833ff7b2933a73df84d7fd31b07d0f0408e51225bddef420a009d7d209deaaa90ac11cefbaf0978178ce2f5508987dada1961d4ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d327cb06aa072e903279130833ff7b2933a73df84d7fd31b07d0f0408e51225bddef420a009d7d209deaaa90ac11cefbaf0978178ce2f5508987dada1961d4ac"' :
                                            'id="xs-components-links-module-AppModule-d327cb06aa072e903279130833ff7b2933a73df84d7fd31b07d0f0408e51225bddef420a009d7d209deaaa90ac11cefbaf0978178ce2f5508987dada1961d4ac"' }>
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
                                            'data-bs-target="#components-links-module-BlockSizeInputModule-725248ef91271b387f300f9f93a9a857f4ffc8ceff570d9e04eaf9363d0ba6b5e62dfd11da0090ac14fdab444fca9e3cbe7551c16dad97a01aee4b8b361a06ca"' : 'data-bs-target="#xs-components-links-module-BlockSizeInputModule-725248ef91271b387f300f9f93a9a857f4ffc8ceff570d9e04eaf9363d0ba6b5e62dfd11da0090ac14fdab444fca9e3cbe7551c16dad97a01aee4b8b361a06ca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlockSizeInputModule-725248ef91271b387f300f9f93a9a857f4ffc8ceff570d9e04eaf9363d0ba6b5e62dfd11da0090ac14fdab444fca9e3cbe7551c16dad97a01aee4b8b361a06ca"' :
                                            'id="xs-components-links-module-BlockSizeInputModule-725248ef91271b387f300f9f93a9a857f4ffc8ceff570d9e04eaf9363d0ba6b5e62dfd11da0090ac14fdab444fca9e3cbe7551c16dad97a01aee4b8b361a06ca"' }>
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
                                            'data-bs-target="#components-links-module-ContentModule-c4a29242c7ea638cef4f4b5d81a480ea0e0146df71952038dccd53c6f5caf3fbda3d7dcf63c9236fa3d0951aed12822a16da64a9ab63877ff3b983b48607b27e"' : 'data-bs-target="#xs-components-links-module-ContentModule-c4a29242c7ea638cef4f4b5d81a480ea0e0146df71952038dccd53c6f5caf3fbda3d7dcf63c9236fa3d0951aed12822a16da64a9ab63877ff3b983b48607b27e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentModule-c4a29242c7ea638cef4f4b5d81a480ea0e0146df71952038dccd53c6f5caf3fbda3d7dcf63c9236fa3d0951aed12822a16da64a9ab63877ff3b983b48607b27e"' :
                                            'id="xs-components-links-module-ContentModule-c4a29242c7ea638cef4f4b5d81a480ea0e0146df71952038dccd53c6f5caf3fbda3d7dcf63c9236fa3d0951aed12822a16da64a9ab63877ff3b983b48607b27e"' }>
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
                                <a href="modules/LeftSidebarModule.html" data-type="entity-link" >LeftSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LeftSidebarModule-a767429bef6c4ac7d8782de7db8d4670548636e3bbc2ebcc2c259fdd3539974f0a746bfbcb1088063af41e922264014cea1552155d1fa4a11a19654eeb0751bd"' : 'data-bs-target="#xs-components-links-module-LeftSidebarModule-a767429bef6c4ac7d8782de7db8d4670548636e3bbc2ebcc2c259fdd3539974f0a746bfbcb1088063af41e922264014cea1552155d1fa4a11a19654eeb0751bd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeftSidebarModule-a767429bef6c4ac7d8782de7db8d4670548636e3bbc2ebcc2c259fdd3539974f0a746bfbcb1088063af41e922264014cea1552155d1fa4a11a19654eeb0751bd"' :
                                            'id="xs-components-links-module-LeftSidebarModule-a767429bef6c4ac7d8782de7db8d4670548636e3bbc2ebcc2c259fdd3539974f0a746bfbcb1088063af41e922264014cea1552155d1fa4a11a19654eeb0751bd"' }>
                                            <li class="link">
                                                <a href="components/LeftSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeftSidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisibilityMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisibilityMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewButtonModule.html" data-type="entity-link" >ReviewButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReviewButtonModule-fd2f0413b785592b5a8cec8b1a0c9ead8f0b9f14feab03970def5c7a2fc623a56a8d9f1adccdedc58ab27a90a14899703bc6c7d18f636884edc420b52511f980"' : 'data-bs-target="#xs-components-links-module-ReviewButtonModule-fd2f0413b785592b5a8cec8b1a0c9ead8f0b9f14feab03970def5c7a2fc623a56a8d9f1adccdedc58ab27a90a14899703bc6c7d18f636884edc420b52511f980"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewButtonModule-fd2f0413b785592b5a8cec8b1a0c9ead8f0b9f14feab03970def5c7a2fc623a56a8d9f1adccdedc58ab27a90a14899703bc6c7d18f636884edc420b52511f980"' :
                                            'id="xs-components-links-module-ReviewButtonModule-fd2f0413b785592b5a8cec8b1a0c9ead8f0b9f14feab03970def5c7a2fc623a56a8d9f1adccdedc58ab27a90a14899703bc6c7d18f636884edc420b52511f980"' }>
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
                                            'data-bs-target="#components-links-module-ReviewModalModule-58230fb445651d8ff07eefa8b7a4543e2062bb96a13cf75de753e6aa983a591854febd13180446a0e28639b1e8f6749e67bc8bfea55a531cf5a690a63b03d95a"' : 'data-bs-target="#xs-components-links-module-ReviewModalModule-58230fb445651d8ff07eefa8b7a4543e2062bb96a13cf75de753e6aa983a591854febd13180446a0e28639b1e8f6749e67bc8bfea55a531cf5a690a63b03d95a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReviewModalModule-58230fb445651d8ff07eefa8b7a4543e2062bb96a13cf75de753e6aa983a591854febd13180446a0e28639b1e8f6749e67bc8bfea55a531cf5a690a63b03d95a"' :
                                            'id="xs-components-links-module-ReviewModalModule-58230fb445651d8ff07eefa8b7a4543e2062bb96a13cf75de753e6aa983a591854febd13180446a0e28639b1e8f6749e67bc8bfea55a531cf5a690a63b03d95a"' }>
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
                                            'data-bs-target="#components-links-module-RightSidebarModule-33816d1d03cac95ca94a7fcf7981af15cc7e0a933d76f16f80c29e7234c09191a0e263dcff8316190c933ba4e894d3726b13df4830af1f754703bd2409a097ac"' : 'data-bs-target="#xs-components-links-module-RightSidebarModule-33816d1d03cac95ca94a7fcf7981af15cc7e0a933d76f16f80c29e7234c09191a0e263dcff8316190c933ba4e894d3726b13df4830af1f754703bd2409a097ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RightSidebarModule-33816d1d03cac95ca94a7fcf7981af15cc7e0a933d76f16f80c29e7234c09191a0e263dcff8316190c933ba4e894d3726b13df4830af1f754703bd2409a097ac"' :
                                            'id="xs-components-links-module-RightSidebarModule-33816d1d03cac95ca94a7fcf7981af15cc7e0a933d76f16f80c29e7234c09191a0e263dcff8316190c933ba4e894d3726b13df4830af1f754703bd2409a097ac"' }>
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
                                            'data-bs-target="#components-links-module-RotationSliderModule-c17e0de56b7131e1a895938ddd9fb7476f9c06bd4e80599982c9eb8f397997ded9c53578f633b524d3ae0b9b73313078ffe4117cf6c202aa79115dcb4e1ff802"' : 'data-bs-target="#xs-components-links-module-RotationSliderModule-c17e0de56b7131e1a895938ddd9fb7476f9c06bd4e80599982c9eb8f397997ded9c53578f633b524d3ae0b9b73313078ffe4117cf6c202aa79115dcb4e1ff802"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RotationSliderModule-c17e0de56b7131e1a895938ddd9fb7476f9c06bd4e80599982c9eb8f397997ded9c53578f633b524d3ae0b9b73313078ffe4117cf6c202aa79115dcb4e1ff802"' :
                                            'id="xs-components-links-module-RotationSliderModule-c17e0de56b7131e1a895938ddd9fb7476f9c06bd4e80599982c9eb8f397997ded9c53578f633b524d3ae0b9b73313078ffe4117cf6c202aa79115dcb4e1ff802"' }>
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
                                            'data-bs-target="#components-links-module-SlicesInputModule-5affdc1033d1d52b96d539aa46dce9bf9be3c80ee03a91b1566b149f77cc661e7312cc205b07dcf3cc795bef5898bdb53086c1c76c1609bbaa47041fe68ceb46"' : 'data-bs-target="#xs-components-links-module-SlicesInputModule-5affdc1033d1d52b96d539aa46dce9bf9be3c80ee03a91b1566b149f77cc661e7312cc205b07dcf3cc795bef5898bdb53086c1c76c1609bbaa47041fe68ceb46"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlicesInputModule-5affdc1033d1d52b96d539aa46dce9bf9be3c80ee03a91b1566b149f77cc661e7312cc205b07dcf3cc795bef5898bdb53086c1c76c1609bbaa47041fe68ceb46"' :
                                            'id="xs-components-links-module-SlicesInputModule-5affdc1033d1d52b96d539aa46dce9bf9be3c80ee03a91b1566b149f77cc661e7312cc205b07dcf3cc795bef5898bdb53086c1c76c1609bbaa47041fe68ceb46"' }>
                                            <li class="link">
                                                <a href="components/SlicesInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlicesInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SliderBoxModule.html" data-type="entity-link" >SliderBoxModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SliderBoxModule-b73514fef9263f7b57044197780677f055593694945f70684849187b42a05a3aaf77a33a2c4cc0f665a84c13a7201786a47c57e9c32a71971669ed069ac0ae21"' : 'data-bs-target="#xs-components-links-module-SliderBoxModule-b73514fef9263f7b57044197780677f055593694945f70684849187b42a05a3aaf77a33a2c4cc0f665a84c13a7201786a47c57e9c32a71971669ed069ac0ae21"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SliderBoxModule-b73514fef9263f7b57044197780677f055593694945f70684849187b42a05a3aaf77a33a2c4cc0f665a84c13a7201786a47c57e9c32a71971669ed069ac0ae21"' :
                                            'id="xs-components-links-module-SliderBoxModule-b73514fef9263f7b57044197780677f055593694945f70684849187b42a05a3aaf77a33a2c4cc0f665a84c13a7201786a47c57e9c32a71971669ed069ac0ae21"' }>
                                            <li class="link">
                                                <a href="components/SliderBoxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SliderBoxComponent</a>
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
                                            'data-bs-target="#components-links-module-TagListModule-f95c518265bafc49e010e391f3564a3daaedf82cdbcb47cb0c28666d49aae5c587c8941b54bb2d4b1f2cbded7270c1a2f19ac8990f822bbce46e0ef6ccb335f1"' : 'data-bs-target="#xs-components-links-module-TagListModule-f95c518265bafc49e010e391f3564a3daaedf82cdbcb47cb0c28666d49aae5c587c8941b54bb2d4b1f2cbded7270c1a2f19ac8990f822bbce46e0ef6ccb335f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagListModule-f95c518265bafc49e010e391f3564a3daaedf82cdbcb47cb0c28666d49aae5c587c8941b54bb2d4b1f2cbded7270c1a2f19ac8990f822bbce46e0ef6ccb335f1"' :
                                            'id="xs-components-links-module-TagListModule-f95c518265bafc49e010e391f3564a3daaedf82cdbcb47cb0c28666d49aae5c587c8941b54bb2d4b1f2cbded7270c1a2f19ac8990f822bbce46e0ef6ccb335f1"' }>
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
                                            'data-bs-target="#components-links-module-TagSearchModule-8638567f2aad4c990c37769f222dd9a4b96a52d9e2db3918323de127663077e56f584cfdb777fd10c9896452c67a06ba3671ef52fbf52bfc4350f08cd67aa519"' : 'data-bs-target="#xs-components-links-module-TagSearchModule-8638567f2aad4c990c37769f222dd9a4b96a52d9e2db3918323de127663077e56f584cfdb777fd10c9896452c67a06ba3671ef52fbf52bfc4350f08cd67aa519"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagSearchModule-8638567f2aad4c990c37769f222dd9a4b96a52d9e2db3918323de127663077e56f584cfdb777fd10c9896452c67a06ba3671ef52fbf52bfc4350f08cd67aa519"' :
                                            'id="xs-components-links-module-TagSearchModule-8638567f2aad4c990c37769f222dd9a4b96a52d9e2db3918323de127663077e56f584cfdb777fd10c9896452c67a06ba3671ef52fbf52bfc4350f08cd67aa519"' }>
                                            <li class="link">
                                                <a href="components/TagSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagSearchComponent</a>
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
                                <a href="components/FileUploadComponent.html" data-type="entity-link" >FileUploadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataAuthorFormComponent.html" data-type="entity-link" >MetadataAuthorFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataConfirmationDialogComponent.html" data-type="entity-link" >MetadataConfirmationDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataDonorFormComponent.html" data-type="entity-link" >MetadataDonorFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataHelpComponent.html" data-type="entity-link" >MetadataHelpComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataModalComponent.html" data-type="entity-link" >MetadataModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VisibilityMenuComponent.html" data-type="entity-link" >VisibilityMenuComponent</a>
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
                                    <a href="injectables/MetadataService.html" data-type="entity-link" >MetadataService</a>
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
                                <a href="interfaces/AuthorFormControls.html" data-type="entity-link" >AuthorFormControls</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlockSize.html" data-type="entity-link" >BlockSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Collision.html" data-type="entity-link" >Collision</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultIconDefinition.html" data-type="entity-link" >DefaultIconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentationContent.html" data-type="entity-link" >DocumentationContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DonorFormControls.html" data-type="entity-link" >DonorFormControls</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractionSet.html" data-type="entity-link" >ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractionSet-1.html" data-type="entity-link" >ExtractionSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileParseError.html" data-type="entity-link" >FileParseError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileTypeError.html" data-type="entity-link" >FileTypeError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConfig.html" data-type="entity-link" >GlobalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconDefinition.html" data-type="entity-link" >IconDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetaDataField.html" data-type="entity-link" >MetaDataField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetadataModalConfig.html" data-type="entity-link" >MetadataModalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetadataModalResult.html" data-type="entity-link" >MetadataModalResult</a>
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