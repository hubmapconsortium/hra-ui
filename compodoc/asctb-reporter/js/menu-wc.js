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
                    <a href="index.html" data-type="index-link">asctb-reporter</a>
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
                                <a href="modules/AnalyticsModule.html" data-type="entity-link" >AnalyticsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AnalyticsModule-37e4dd3ec00401e44df85c5cf95d49ac5bba407e7708f39409fa84b0707ef272278b9a5f9a2240781f4bd441ed4057ba7dd53be80c67fdfefa731df94ea09be5"' : 'data-bs-target="#xs-injectables-links-module-AnalyticsModule-37e4dd3ec00401e44df85c5cf95d49ac5bba407e7708f39409fa84b0707ef272278b9a5f9a2240781f4bd441ed4057ba7dd53be80c67fdfefa731df94ea09be5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnalyticsModule-37e4dd3ec00401e44df85c5cf95d49ac5bba407e7708f39409fa84b0707ef272278b9a5f9a2240781f4bd441ed4057ba7dd53be80c67fdfefa731df94ea09be5"' :
                                        'id="xs-injectables-links-module-AnalyticsModule-37e4dd3ec00401e44df85c5cf95d49ac5bba407e7708f39409fa84b0707ef272278b9a5f9a2240781f4bd441ed4057ba7dd53be80c67fdfefa731df94ea09be5"' }>
                                        <li class="link">
                                            <a href="injectables/ConsentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAnalyticsSyncService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAnalyticsSyncService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStorageSyncService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStorageSyncService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' : 'data-bs-target="#xs-components-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' :
                                            'id="xs-components-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' :
                                        'id="xs-injectables-links-module-AppModule-c531f09d2c15c048be591304fb7f95c41a1330252fa5d4d8f5b92c760d6d6a2155ef61179b82cf4c143c6bf3cfcc9c1075a808c1c60ddfffe822c0187dba4e72"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CompareModule.html" data-type="entity-link" >CompareModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CompareModule-7f8a80b8e6ba95bb822319ec3aab8bc5985e9d661e51cd65b07133a87d06a86f33b4afe3c45e8eba9cc66f913c5cc69b17a3f8cf057bda93c3dc4918c37befc0"' : 'data-bs-target="#xs-components-links-module-CompareModule-7f8a80b8e6ba95bb822319ec3aab8bc5985e9d661e51cd65b07133a87d06a86f33b4afe3c45e8eba9cc66f913c5cc69b17a3f8cf057bda93c3dc4918c37befc0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CompareModule-7f8a80b8e6ba95bb822319ec3aab8bc5985e9d661e51cd65b07133a87d06a86f33b4afe3c45e8eba9cc66f913c5cc69b17a3f8cf057bda93c3dc4918c37befc0"' :
                                            'id="xs-components-links-module-CompareModule-7f8a80b8e6ba95bb822319ec3aab8bc5985e9d661e51cd65b07133a87d06a86f33b4afe3c45e8eba9cc66f913c5cc69b17a3f8cf057bda93c3dc4918c37befc0"' }>
                                            <li class="link">
                                                <a href="components/CompareComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompareComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ControlPaneModule.html" data-type="entity-link" >ControlPaneModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ControlPaneModule-6268f4f49f5a17b9686af77ee19c5e1a05b1d32a94469398b9a1fc5e31f4c62d0d25746163d2a192cd52af4ecd3e56ed26fc4348109d35cd56c763bba7ab0e8c"' : 'data-bs-target="#xs-components-links-module-ControlPaneModule-6268f4f49f5a17b9686af77ee19c5e1a05b1d32a94469398b9a1fc5e31f4c62d0d25746163d2a192cd52af4ecd3e56ed26fc4348109d35cd56c763bba7ab0e8c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ControlPaneModule-6268f4f49f5a17b9686af77ee19c5e1a05b1d32a94469398b9a1fc5e31f4c62d0d25746163d2a192cd52af4ecd3e56ed26fc4348109d35cd56c763bba7ab0e8c"' :
                                            'id="xs-components-links-module-ControlPaneModule-6268f4f49f5a17b9686af77ee19c5e1a05b1d32a94469398b9a1fc5e31f4c62d0d25746163d2a192cd52af4ecd3e56ed26fc4348109d35cd56c763bba7ab0e8c"' }>
                                            <li class="link">
                                                <a href="components/ControlPaneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ControlPaneComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ControlsModule.html" data-type="entity-link" >ControlsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ControlsModule-9d12825b64ec91142d20813eaa001b1519f4361edf6085f8bafc997d75be851091fc69d28702bae10e2d01f2c985f40427b5aeb061bc1931392fe958be2f1289"' : 'data-bs-target="#xs-components-links-module-ControlsModule-9d12825b64ec91142d20813eaa001b1519f4361edf6085f8bafc997d75be851091fc69d28702bae10e2d01f2c985f40427b5aeb061bc1931392fe958be2f1289"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ControlsModule-9d12825b64ec91142d20813eaa001b1519f4361edf6085f8bafc997d75be851091fc69d28702bae10e2d01f2c985f40427b5aeb061bc1931392fe958be2f1289"' :
                                            'id="xs-components-links-module-ControlsModule-9d12825b64ec91142d20813eaa001b1519f4361edf6085f8bafc997d75be851091fc69d28702bae10e2d01f2c985f40427b5aeb061bc1931392fe958be2f1289"' }>
                                            <li class="link">
                                                <a href="components/VisControlsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisControlsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DebugLogsModule.html" data-type="entity-link" >DebugLogsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DebugLogsModule-31f436c652af8fa890de35ff36e5ca592d3ce21a2c0d807b12da93993e8963169cc6d475b03ef23c31ff23f6d5d97c9430446d0cb15076c3f11f4edc2b4b4367"' : 'data-bs-target="#xs-components-links-module-DebugLogsModule-31f436c652af8fa890de35ff36e5ca592d3ce21a2c0d807b12da93993e8963169cc6d475b03ef23c31ff23f6d5d97c9430446d0cb15076c3f11f4edc2b4b4367"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DebugLogsModule-31f436c652af8fa890de35ff36e5ca592d3ce21a2c0d807b12da93993e8963169cc6d475b03ef23c31ff23f6d5d97c9430446d0cb15076c3f11f4edc2b4b4367"' :
                                            'id="xs-components-links-module-DebugLogsModule-31f436c652af8fa890de35ff36e5ca592d3ce21a2c0d807b12da93993e8963169cc6d475b03ef23c31ff23f6d5d97c9430446d0cb15076c3f11f4edc2b4b4367"' }>
                                            <li class="link">
                                                <a href="components/DebugLogsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DebugLogsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocsModule.html" data-type="entity-link" >DocsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DocsModule-df55467b94c3ffe80c22f2de459e7b9decc9baaced9d19ea2e64f0b12d552e393cbe3f77a1ee613f5f94443c3693b7023aac78d47efa5cb0fcb96ba855b79a73"' : 'data-bs-target="#xs-components-links-module-DocsModule-df55467b94c3ffe80c22f2de459e7b9decc9baaced9d19ea2e64f0b12d552e393cbe3f77a1ee613f5f94443c3693b7023aac78d47efa5cb0fcb96ba855b79a73"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DocsModule-df55467b94c3ffe80c22f2de459e7b9decc9baaced9d19ea2e64f0b12d552e393cbe3f77a1ee613f5f94443c3693b7023aac78d47efa5cb0fcb96ba855b79a73"' :
                                            'id="xs-components-links-module-DocsModule-df55467b94c3ffe80c22f2de459e7b9decc9baaced9d19ea2e64f0b12d552e393cbe3f77a1ee613f5f94443c3693b7023aac78d47efa5cb0fcb96ba855b79a73"' }>
                                            <li class="link">
                                                <a href="components/DocsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocsNavModule.html" data-type="entity-link" >DocsNavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DocsNavModule-46e1b333cb23ee0ec981f543bb68fe3c052251ab32f780c72041f781393d033e50a988be5b0e9e32a0cd01e7682e210731bede949262c4250500e0da3b67c662"' : 'data-bs-target="#xs-components-links-module-DocsNavModule-46e1b333cb23ee0ec981f543bb68fe3c052251ab32f780c72041f781393d033e50a988be5b0e9e32a0cd01e7682e210731bede949262c4250500e0da3b67c662"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DocsNavModule-46e1b333cb23ee0ec981f543bb68fe3c052251ab32f780c72041f781393d033e50a988be5b0e9e32a0cd01e7682e210731bede949262c4250500e0da3b67c662"' :
                                            'id="xs-components-links-module-DocsNavModule-46e1b333cb23ee0ec981f543bb68fe3c052251ab32f780c72041f781393d033e50a988be5b0e9e32a0cd01e7682e210731bede949262c4250500e0da3b67c662"' }>
                                            <li class="link">
                                                <a href="components/DocsNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocsNavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DoiModule.html" data-type="entity-link" >DoiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DoiModule-ff99b30e1712d1e67e1d2d3d9382f02a4ab55dbb81a797a607ee7f7aaf5b52f49cda2234f2a4c44094a8918b562bed78f4438ee885fc2226b22e28991d192fc7"' : 'data-bs-target="#xs-components-links-module-DoiModule-ff99b30e1712d1e67e1d2d3d9382f02a4ab55dbb81a797a607ee7f7aaf5b52f49cda2234f2a4c44094a8918b562bed78f4438ee885fc2226b22e28991d192fc7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DoiModule-ff99b30e1712d1e67e1d2d3d9382f02a4ab55dbb81a797a607ee7f7aaf5b52f49cda2234f2a4c44094a8918b562bed78f4438ee885fc2226b22e28991d192fc7"' :
                                            'id="xs-components-links-module-DoiModule-ff99b30e1712d1e67e1d2d3d9382f02a4ab55dbb81a797a607ee7f7aaf5b52f49cda2234f2a4c44094a8918b562bed78f4438ee885fc2226b22e28991d192fc7"' }>
                                            <li class="link">
                                                <a href="components/DoiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DoiComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorModule.html" data-type="entity-link" >ErrorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ErrorModule-a55e956aaba18b6aaeadaf477924c7d7ae4dae9df7d7f3e59b01dc8c13a37b73354ec4e697c53ce2ff8f88a305f90b0f59dee982ba3c2e729c651a4f281e4b79"' : 'data-bs-target="#xs-components-links-module-ErrorModule-a55e956aaba18b6aaeadaf477924c7d7ae4dae9df7d7f3e59b01dc8c13a37b73354ec4e697c53ce2ff8f88a305f90b0f59dee982ba3c2e729c651a4f281e4b79"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorModule-a55e956aaba18b6aaeadaf477924c7d7ae4dae9df7d7f3e59b01dc8c13a37b73354ec4e697c53ce2ff8f88a305f90b0f59dee982ba3c2e729c651a4f281e4b79"' :
                                            'id="xs-components-links-module-ErrorModule-a55e956aaba18b6aaeadaf477924c7d7ae4dae9df7d7f3e59b01dc8c13a37b73354ec4e697c53ce2ff8f88a305f90b0f59dee982ba3c2e729c651a4f281e4b79"' }>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileUploadModule.html" data-type="entity-link" >FileUploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FileUploadModule-0b3ef27c5ab15ee94af3193386bc1991a198479212f72ce0e9f93e11be139b23de0d986d92822770933da34164a211c0430d7a1947f77f6e6043ac72e1ec154d"' : 'data-bs-target="#xs-components-links-module-FileUploadModule-0b3ef27c5ab15ee94af3193386bc1991a198479212f72ce0e9f93e11be139b23de0d986d92822770933da34164a211c0430d7a1947f77f6e6043ac72e1ec154d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FileUploadModule-0b3ef27c5ab15ee94af3193386bc1991a198479212f72ce0e9f93e11be139b23de0d986d92822770933da34164a211c0430d7a1947f77f6e6043ac72e1ec154d"' :
                                            'id="xs-components-links-module-FileUploadModule-0b3ef27c5ab15ee94af3193386bc1991a198479212f72ce0e9f93e11be139b23de0d986d92822770933da34164a211c0430d7a1947f77f6e6043ac72e1ec154d"' }>
                                            <li class="link">
                                                <a href="components/FileUploadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileUploadComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FooterModule.html" data-type="entity-link" >FooterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FooterModule-74787cfc0fa1ae7b8dbb8386a879967833a53b7754886ea0f613506fa100cb2c5a79ccdd608ba8b66bbaa0e7cbca97288d22c532460f88fc6486007a7a00725b"' : 'data-bs-target="#xs-components-links-module-FooterModule-74787cfc0fa1ae7b8dbb8386a879967833a53b7754886ea0f613506fa100cb2c5a79ccdd608ba8b66bbaa0e7cbca97288d22c532460f88fc6486007a7a00725b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FooterModule-74787cfc0fa1ae7b8dbb8386a879967833a53b7754886ea0f613506fa100cb2c5a79ccdd608ba8b66bbaa0e7cbca97288d22c532460f88fc6486007a7a00725b"' :
                                            'id="xs-components-links-module-FooterModule-74787cfc0fa1ae7b8dbb8386a879967833a53b7754886ea0f613506fa100cb2c5a79ccdd608ba8b66bbaa0e7cbca97288d22c532460f88fc6486007a7a00725b"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FunctionsModule.html" data-type="entity-link" >FunctionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FunctionsModule-dc7ec04b9c7f87411b6f97aa1b29a38e480754103125d3d5fcf0566d47393ce3330559549523a4776aea6e0ab8962131b651dff079f863048609e90f2eb982b6"' : 'data-bs-target="#xs-components-links-module-FunctionsModule-dc7ec04b9c7f87411b6f97aa1b29a38e480754103125d3d5fcf0566d47393ce3330559549523a4776aea6e0ab8962131b651dff079f863048609e90f2eb982b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FunctionsModule-dc7ec04b9c7f87411b6f97aa1b29a38e480754103125d3d5fcf0566d47393ce3330559549523a4776aea6e0ab8962131b651dff079f863048609e90f2eb982b6"' :
                                            'id="xs-components-links-module-FunctionsModule-dc7ec04b9c7f87411b6f97aa1b29a38e480754103125d3d5fcf0566d47393ce3330559549523a4776aea6e0ab8962131b651dff079f863048609e90f2eb982b6"' }>
                                            <li class="link">
                                                <a href="components/FunctionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FunctionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-17c8758c8f2ce5aafa41222accf8b00e0f3a081eb851f8d1c08d63cdeff26f086e951a1b20c0cf02baa8ccf7c8fe12f02247a6fbe1d6749ee8ac29b43bdcf0d1"' : 'data-bs-target="#xs-components-links-module-HomeModule-17c8758c8f2ce5aafa41222accf8b00e0f3a081eb851f8d1c08d63cdeff26f086e951a1b20c0cf02baa8ccf7c8fe12f02247a6fbe1d6749ee8ac29b43bdcf0d1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-17c8758c8f2ce5aafa41222accf8b00e0f3a081eb851f8d1c08d63cdeff26f086e951a1b20c0cf02baa8ccf7c8fe12f02247a6fbe1d6749ee8ac29b43bdcf0d1"' :
                                            'id="xs-components-links-module-HomeModule-17c8758c8f2ce5aafa41222accf8b00e0f3a081eb851f8d1c08d63cdeff26f086e951a1b20c0cf02baa8ccf7c8fe12f02247a6fbe1d6749ee8ac29b43bdcf0d1"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndentedListModule.html" data-type="entity-link" >IndentedListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IndentedListModule-c2eb67240fc8bb165c45b231e09ee913133c129d96d0d352501344b7e7cae969f90b4c0a69732573b1ee330e2b4d87ddee8d199acc56d0ae4759acdf2a2559b7"' : 'data-bs-target="#xs-components-links-module-IndentedListModule-c2eb67240fc8bb165c45b231e09ee913133c129d96d0d352501344b7e7cae969f90b4c0a69732573b1ee330e2b4d87ddee8d199acc56d0ae4759acdf2a2559b7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndentedListModule-c2eb67240fc8bb165c45b231e09ee913133c129d96d0d352501344b7e7cae969f90b4c0a69732573b1ee330e2b4d87ddee8d199acc56d0ae4759acdf2a2559b7"' :
                                            'id="xs-components-links-module-IndentedListModule-c2eb67240fc8bb165c45b231e09ee913133c129d96d0d352501344b7e7cae969f90b4c0a69732573b1ee330e2b4d87ddee8d199acc56d0ae4759acdf2a2559b7"' }>
                                            <li class="link">
                                                <a href="components/IndentedListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndentedListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoModule.html" data-type="entity-link" >InfoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InfoModule-093453e19ebd77b1dfd7400bd7f27651ab60e47d118e86eb9da6197db4f84eab52ff833c931cc19b8332a7f313d9a2f3b3f6b51263850b5e433457cd38405939"' : 'data-bs-target="#xs-components-links-module-InfoModule-093453e19ebd77b1dfd7400bd7f27651ab60e47d118e86eb9da6197db4f84eab52ff833c931cc19b8332a7f313d9a2f3b3f6b51263850b5e433457cd38405939"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InfoModule-093453e19ebd77b1dfd7400bd7f27651ab60e47d118e86eb9da6197db4f84eab52ff833c931cc19b8332a7f313d9a2f3b3f6b51263850b5e433457cd38405939"' :
                                            'id="xs-components-links-module-InfoModule-093453e19ebd77b1dfd7400bd7f27651ab60e47d118e86eb9da6197db4f84eab52ff833c931cc19b8332a7f313d9a2f3b3f6b51263850b5e433457cd38405939"' }>
                                            <li class="link">
                                                <a href="components/InfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LegendModule.html" data-type="entity-link" >LegendModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' : 'data-bs-target="#xs-components-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' :
                                            'id="xs-components-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' }>
                                            <li class="link">
                                                <a href="components/LegendComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LegendComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' : 'data-bs-target="#xs-pipes-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' :
                                            'id="xs-pipes-links-module-LegendModule-f3954442e0064402bd72346bbcaf562127a30c63e44365b158c86ed6ce1fcad8f3f103ce61b5ac87ee39103485c07671510cd3edbc4eb991dd1ca328cda6ee86"' }>
                                            <li class="link">
                                                <a href="pipes/OrderByPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderByPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoadingModule.html" data-type="entity-link" >LoadingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoadingModule-ed209e0ed53f4605244c4d4f4743ad90f513ce122aa5bfee5a69d87517de8c8c2b52a329a6a3e095c390e4c89381525f9253055d4cea6359edd9c9cc3c94e218"' : 'data-bs-target="#xs-components-links-module-LoadingModule-ed209e0ed53f4605244c4d4f4743ad90f513ce122aa5bfee5a69d87517de8c8c2b52a329a6a3e095c390e4c89381525f9253055d4cea6359edd9c9cc3c94e218"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoadingModule-ed209e0ed53f4605244c4d4f4743ad90f513ce122aa5bfee5a69d87517de8c8c2b52a329a6a3e095c390e4c89381525f9253055d4cea6359edd9c9cc3c94e218"' :
                                            'id="xs-components-links-module-LoadingModule-ed209e0ed53f4605244c4d4f4743ad90f513ce122aa5bfee5a69d87517de8c8c2b52a329a6a3e095c390e4c89381525f9253055d4cea6359edd9c9cc3c94e218"' }>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MousePositionTrackerModule.html" data-type="entity-link" >MousePositionTrackerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NavbarModule.html" data-type="entity-link" >NavbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NavbarModule-b9120d927611978b6bad7b42f31dd66bc58754b4bf7774ba610bfee71158b3cffc8b1920efe2bb7d4093e5e6a9208b4ba472dbae6af4aa3f76b13e0ce714449d"' : 'data-bs-target="#xs-components-links-module-NavbarModule-b9120d927611978b6bad7b42f31dd66bc58754b4bf7774ba610bfee71158b3cffc8b1920efe2bb7d4093e5e6a9208b4ba472dbae6af4aa3f76b13e0ce714449d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavbarModule-b9120d927611978b6bad7b42f31dd66bc58754b4bf7774ba610bfee71158b3cffc8b1920efe2bb7d4093e5e6a9208b4ba472dbae6af4aa3f76b13e0ce714449d"' :
                                            'id="xs-components-links-module-NavbarModule-b9120d927611978b6bad7b42f31dd66bc58754b4bf7774ba610bfee71158b3cffc8b1920efe2bb7d4093e5e6a9208b4ba472dbae6af4aa3f76b13e0ce714449d"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavItemModule.html" data-type="entity-link" >NavItemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NavItemModule-b9f261fe2dbd43cbfb716c97324a74615a04d829f34b483ad79850ad9d5223844ff1395026184643140b4ea4095c7063c2ccdf44098eb2d9a63ec96901eb09b0"' : 'data-bs-target="#xs-components-links-module-NavItemModule-b9f261fe2dbd43cbfb716c97324a74615a04d829f34b483ad79850ad9d5223844ff1395026184643140b4ea4095c7063c2ccdf44098eb2d9a63ec96901eb09b0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavItemModule-b9f261fe2dbd43cbfb716c97324a74615a04d829f34b483ad79850ad9d5223844ff1395026184643140b4ea4095c7063c2ccdf44098eb2d9a63ec96901eb09b0"' :
                                            'id="xs-components-links-module-NavItemModule-b9f261fe2dbd43cbfb716c97324a74615a04d829f34b483ad79850ad9d5223844ff1395026184643140b4ea4095c7063c2ccdf44098eb2d9a63ec96901eb09b0"' }>
                                            <li class="link">
                                                <a href="components/NavItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OmapControlsModule.html" data-type="entity-link" >OmapControlsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OmapControlsModule-0f4d28270cb228c4d53b0146190dc31ceb043ed7a67426bc3cb552ef7a7df16f113784183efb917fc9034ae5f70a3231f03fa8452ce476ab2c009de04a4dc8d5"' : 'data-bs-target="#xs-components-links-module-OmapControlsModule-0f4d28270cb228c4d53b0146190dc31ceb043ed7a67426bc3cb552ef7a7df16f113784183efb917fc9034ae5f70a3231f03fa8452ce476ab2c009de04a4dc8d5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OmapControlsModule-0f4d28270cb228c4d53b0146190dc31ceb043ed7a67426bc3cb552ef7a7df16f113784183efb917fc9034ae5f70a3231f03fa8452ce476ab2c009de04a4dc8d5"' :
                                            'id="xs-components-links-module-OmapControlsModule-0f4d28270cb228c4d53b0146190dc31ceb043ed7a67426bc3cb552ef7a7df16f113784183efb917fc9034ae5f70a3231f03fa8452ce476ab2c009de04a4dc8d5"' }>
                                            <li class="link">
                                                <a href="components/OmapControlsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OmapControlsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganTableSelectorModule.html" data-type="entity-link" >OrganTableSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OrganTableSelectorModule-1c77ae07c1b1af7e8a0828b6987abed396e1182f348438378b50a77317240a00f68e0e67747d5444a447d786194badbeab8a36639cd1053e26ba3ebfd5de58a8"' : 'data-bs-target="#xs-components-links-module-OrganTableSelectorModule-1c77ae07c1b1af7e8a0828b6987abed396e1182f348438378b50a77317240a00f68e0e67747d5444a447d786194badbeab8a36639cd1053e26ba3ebfd5de58a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganTableSelectorModule-1c77ae07c1b1af7e8a0828b6987abed396e1182f348438378b50a77317240a00f68e0e67747d5444a447d786194badbeab8a36639cd1053e26ba3ebfd5de58a8"' :
                                            'id="xs-components-links-module-OrganTableSelectorModule-1c77ae07c1b1af7e8a0828b6987abed396e1182f348438378b50a77317240a00f68e0e67747d5444a447d786194badbeab8a36639cd1053e26ba3ebfd5de58a8"' }>
                                            <li class="link">
                                                <a href="components/OrganTableSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganTableSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlaygroundModule.html" data-type="entity-link" >PlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PlaygroundModule-116b63cebd3ec842b1eeffc91c685e908b2d7f6cbb38b09b2797f20e3991b6a2891460977403072b6ad6cdb809c0836e442587aad74f3479fb305d327cf1a2df"' : 'data-bs-target="#xs-components-links-module-PlaygroundModule-116b63cebd3ec842b1eeffc91c685e908b2d7f6cbb38b09b2797f20e3991b6a2891460977403072b6ad6cdb809c0836e442587aad74f3479fb305d327cf1a2df"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlaygroundModule-116b63cebd3ec842b1eeffc91c685e908b2d7f6cbb38b09b2797f20e3991b6a2891460977403072b6ad6cdb809c0836e442587aad74f3479fb305d327cf1a2df"' :
                                            'id="xs-components-links-module-PlaygroundModule-116b63cebd3ec842b1eeffc91c685e908b2d7f6cbb38b09b2797f20e3991b6a2891460977403072b6ad6cdb809c0836e442587aad74f3479fb305d327cf1a2df"' }>
                                            <li class="link">
                                                <a href="components/PlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportModule.html" data-type="entity-link" >ReportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' : 'data-bs-target="#xs-components-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' :
                                            'id="xs-components-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' }>
                                            <li class="link">
                                                <a href="components/ReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' : 'data-bs-target="#xs-pipes-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' :
                                            'id="xs-pipes-links-module-ReportModule-afaf1019eb2a581cc1a2e154e56cea3910e6767766dcc728df00859529395795afe3bfe25573756994fa6149bd84c80eb960b4818e696fa670e9324c6a8091ac"' }>
                                            <li class="link">
                                                <a href="pipes/OrderByPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderByPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RootModule.html" data-type="entity-link" >RootModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RootModule-8481fd8c34e9cd2122ab81865c8c4ec1305f4d98702598c1e9ad53b1807b284f820ea175d9b5962e3c1f2306c4acdad3af71f76e93f15070ab5dec2bb7b27e03"' : 'data-bs-target="#xs-components-links-module-RootModule-8481fd8c34e9cd2122ab81865c8c4ec1305f4d98702598c1e9ad53b1807b284f820ea175d9b5962e3c1f2306c4acdad3af71f76e93f15070ab5dec2bb7b27e03"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RootModule-8481fd8c34e9cd2122ab81865c8c4ec1305f4d98702598c1e9ad53b1807b284f820ea175d9b5962e3c1f2306c4acdad3af71f76e93f15070ab5dec2bb7b27e03"' :
                                            'id="xs-components-links-module-RootModule-8481fd8c34e9cd2122ab81865c8c4ec1305f4d98702598c1e9ad53b1807b284f820ea175d9b5962e3c1f2306c4acdad3af71f76e93f15070ab5dec2bb7b27e03"' }>
                                            <li class="link">
                                                <a href="components/RootComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RootComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link" >SearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SearchModule-a5afc742abf16df179db35e1ec15d436b15716654047f6bba92b86b0715014d889d6627b582abe6c809dec07520e19b605d4d08b886cfd8eb3614a63d694f397"' : 'data-bs-target="#xs-components-links-module-SearchModule-a5afc742abf16df179db35e1ec15d436b15716654047f6bba92b86b0715014d889d6627b582abe6c809dec07520e19b605d4d08b886cfd8eb3614a63d694f397"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchModule-a5afc742abf16df179db35e1ec15d436b15716654047f6bba92b86b0715014d889d6627b582abe6c809dec07520e19b605d4d08b886cfd8eb3614a63d694f397"' :
                                            'id="xs-components-links-module-SearchModule-a5afc742abf16df179db35e1ec15d436b15716654047f6bba92b86b0715014d889d6627b582abe6c809dec07520e19b605d4d08b886cfd8eb3614a63d694f397"' }>
                                            <li class="link">
                                                <a href="components/SearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SidenavHeaderModule.html" data-type="entity-link" >SidenavHeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SidenavHeaderModule-75637c30b03ef62650a6dd5e653048480cb44447beba11ec191645bd418f2c1aafd09190e51714e718fe6b81248ded01b7ca3325de02bd3b157b2cb09c077282"' : 'data-bs-target="#xs-components-links-module-SidenavHeaderModule-75637c30b03ef62650a6dd5e653048480cb44447beba11ec191645bd418f2c1aafd09190e51714e718fe6b81248ded01b7ca3325de02bd3b157b2cb09c077282"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidenavHeaderModule-75637c30b03ef62650a6dd5e653048480cb44447beba11ec191645bd418f2c1aafd09190e51714e718fe6b81248ded01b7ca3325de02bd3b157b2cb09c077282"' :
                                            'id="xs-components-links-module-SidenavHeaderModule-75637c30b03ef62650a6dd5e653048480cb44447beba11ec191645bd418f2c1aafd09190e51714e718fe6b81248ded01b7ca3325de02bd3b157b2cb09c077282"' }>
                                            <li class="link">
                                                <a href="components/SidenavHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SidenavModule.html" data-type="entity-link" >SidenavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SidenavModule-7caf54f10c72802690c3966f5c367b7cb72d3093d082eeb063603c5f815489a299e31e4318102f0f124067645dbd49170bb9ff417a464681920ff8a5c07240ff"' : 'data-bs-target="#xs-components-links-module-SidenavModule-7caf54f10c72802690c3966f5c367b7cb72d3093d082eeb063603c5f815489a299e31e4318102f0f124067645dbd49170bb9ff417a464681920ff8a5c07240ff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidenavModule-7caf54f10c72802690c3966f5c367b7cb72d3093d082eeb063603c5f815489a299e31e4318102f0f124067645dbd49170bb9ff417a464681920ff8a5c07240ff"' :
                                            'id="xs-components-links-module-SidenavModule-7caf54f10c72802690c3966f5c367b7cb72d3093d082eeb063603c5f815489a299e31e4318102f0f124067645dbd49170bb9ff417a464681920ff8a5c07240ff"' }>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableNestedMenuModule.html" data-type="entity-link" >TableNestedMenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TableNestedMenuModule-05597525429222ad788666523d62e172d7775bfb77443eef8436da04ac4711997edc9b419fcd1b0be9fedfec1771259b8f860b2386cb513ace44d3e350e3af0a"' : 'data-bs-target="#xs-components-links-module-TableNestedMenuModule-05597525429222ad788666523d62e172d7775bfb77443eef8436da04ac4711997edc9b419fcd1b0be9fedfec1771259b8f860b2386cb513ace44d3e350e3af0a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableNestedMenuModule-05597525429222ad788666523d62e172d7775bfb77443eef8436da04ac4711997edc9b419fcd1b0be9fedfec1771259b8f860b2386cb513ace44d3e350e3af0a"' :
                                            'id="xs-components-links-module-TableNestedMenuModule-05597525429222ad788666523d62e172d7775bfb77443eef8436da04ac4711997edc9b419fcd1b0be9fedfec1771259b8f860b2386cb513ace44d3e350e3af0a"' }>
                                            <li class="link">
                                                <a href="components/TableNestedMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableNestedMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrackingPopupModule.html" data-type="entity-link" >TrackingPopupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TrackingPopupModule-722539131bf1687d499a325b8fef5eccc5b7805d0e13a5fe25812aee7af89752888b6f9dd86286e2b0209899b08e9c25860d4d50b8e032f39650f45c8de28d08"' : 'data-bs-target="#xs-components-links-module-TrackingPopupModule-722539131bf1687d499a325b8fef5eccc5b7805d0e13a5fe25812aee7af89752888b6f9dd86286e2b0209899b08e9c25860d4d50b8e032f39650f45c8de28d08"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrackingPopupModule-722539131bf1687d499a325b8fef5eccc5b7805d0e13a5fe25812aee7af89752888b6f9dd86286e2b0209899b08e9c25860d4d50b8e032f39650f45c8de28d08"' :
                                            'id="xs-components-links-module-TrackingPopupModule-722539131bf1687d499a325b8fef5eccc5b7805d0e13a5fe25812aee7af89752888b6f9dd86286e2b0209899b08e9c25860d4d50b8e032f39650f45c8de28d08"' }>
                                            <li class="link">
                                                <a href="components/TrackingPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrackingPopupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TreeModule.html" data-type="entity-link" >TreeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TreeModule-d798ebf4c3623e5b965783f89b5b223d58fa0620819537584f0e9ca2c7661f10bde568842f0aec2188a7d6ad11dda41b830c1705e38f01bc67c69a71995f7645"' : 'data-bs-target="#xs-components-links-module-TreeModule-d798ebf4c3623e5b965783f89b5b223d58fa0620819537584f0e9ca2c7661f10bde568842f0aec2188a7d6ad11dda41b830c1705e38f01bc67c69a71995f7645"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TreeModule-d798ebf4c3623e5b965783f89b5b223d58fa0620819537584f0e9ca2c7661f10bde568842f0aec2188a7d6ad11dda41b830c1705e38f01bc67c69a71995f7645"' :
                                            'id="xs-components-links-module-TreeModule-d798ebf4c3623e5b965783f89b5b223d58fa0620819537584f0e9ca2c7661f10bde568842f0aec2188a7d6ad11dda41b830c1705e38f01bc67c69a71995f7645"' }>
                                            <li class="link">
                                                <a href="components/TreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UploadModule-e48ff0caa2b32d69b99d3701980f8bd025886e04e2bcec3ce008be33bbc20f644c1fcac8c66ec8265a02a145fac484b005f6db205bb8478ad0b2e5daf50230c2"' : 'data-bs-target="#xs-components-links-module-UploadModule-e48ff0caa2b32d69b99d3701980f8bd025886e04e2bcec3ce008be33bbc20f644c1fcac8c66ec8265a02a145fac484b005f6db205bb8478ad0b2e5daf50230c2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UploadModule-e48ff0caa2b32d69b99d3701980f8bd025886e04e2bcec3ce008be33bbc20f644c1fcac8c66ec8265a02a145fac484b005f6db205bb8478ad0b2e5daf50230c2"' :
                                            'id="xs-components-links-module-UploadModule-e48ff0caa2b32d69b99d3701980f8bd025886e04e2bcec3ce008be33bbc20f644c1fcac8c66ec8265a02a145fac484b005f6db205bb8478ad0b2e5daf50230c2"' }>
                                            <li class="link">
                                                <a href="components/UploadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadComponent</a>
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
                                <a href="classes/BimodalMarkGroup.html" data-type="entity-link" >BimodalMarkGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/BMNode.html" data-type="entity-link" >BMNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cell.html" data-type="entity-link" >Cell</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearSheetLogs.html" data-type="entity-link" >ClearSheetLogs</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseBottomSheet.html" data-type="entity-link" >CloseBottomSheet</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseBottomSheetDOI.html" data-type="entity-link" >CloseBottomSheetDOI</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseCompare.html" data-type="entity-link" >CloseCompare</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseLoading.html" data-type="entity-link" >CloseLoading</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseRightSideNav.html" data-type="entity-link" >CloseRightSideNav</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseSearch.html" data-type="entity-link" >CloseSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/CloseSnackbar.html" data-type="entity-link" >CloseSnackbar</a>
                            </li>
                            <li class="link">
                                <a href="classes/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteCompareSheet.html" data-type="entity-link" >DeleteCompareSheet</a>
                            </li>
                            <li class="link">
                                <a href="classes/DiscrepencyId.html" data-type="entity-link" >DiscrepencyId</a>
                            </li>
                            <li class="link">
                                <a href="classes/DiscrepencyLabel.html" data-type="entity-link" >DiscrepencyLabel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DoSearch.html" data-type="entity-link" >DoSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/DuplicateId.html" data-type="entity-link" >DuplicateId</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchAllOrganData.html" data-type="entity-link" >FetchAllOrganData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchCompareData.html" data-type="entity-link" >FetchCompareData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchDataFromAssets.html" data-type="entity-link" >FetchDataFromAssets</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchInitialPlaygroundData.html" data-type="entity-link" >FetchInitialPlaygroundData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchPlaygroundUploadData.html" data-type="entity-link" >FetchPlaygroundUploadData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchSelectedOrganData.html" data-type="entity-link" >FetchSelectedOrganData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchSheetData.html" data-type="entity-link" >FetchSheetData</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchValidOmapProtiens.html" data-type="entity-link" >FetchValidOmapProtiens</a>
                            </li>
                            <li class="link">
                                <a href="classes/HasError.html" data-type="entity-link" >HasError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ILNode.html" data-type="entity-link" >ILNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/Legends.html" data-type="entity-link" >Legends</a>
                            </li>
                            <li class="link">
                                <a href="classes/Marker.html" data-type="entity-link" >Marker</a>
                            </li>
                            <li class="link">
                                <a href="classes/Marks.html" data-type="entity-link" >Marks</a>
                            </li>
                            <li class="link">
                                <a href="classes/MultiParentMarkGroup.html" data-type="entity-link" >MultiParentMarkGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoError.html" data-type="entity-link" >NoError</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenBottomSheet.html" data-type="entity-link" >OpenBottomSheet</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenBottomSheetDOI.html" data-type="entity-link" >OpenBottomSheetDOI</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenCompare.html" data-type="entity-link" >OpenCompare</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenLoading.html" data-type="entity-link" >OpenLoading</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenSearch.html" data-type="entity-link" >OpenSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenSnackbar.html" data-type="entity-link" >OpenSnackbar</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshData.html" data-type="entity-link" >RefreshData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportLog.html" data-type="entity-link" >ReportLog</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportMultiLog.html" data-type="entity-link" >ReportMultiLog</a>
                            </li>
                            <li class="link">
                                <a href="classes/Scales.html" data-type="entity-link" >Scales</a>
                            </li>
                            <li class="link">
                                <a href="classes/Signals.html" data-type="entity-link" >Signals</a>
                            </li>
                            <li class="link">
                                <a href="classes/TNode.html" data-type="entity-link" >TNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleBottomSheet.html" data-type="entity-link" >ToggleBottomSheet</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleControlPane.html" data-type="entity-link" >ToggleControlPane</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleDebugLogs.html" data-type="entity-link" >ToggleDebugLogs</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleIndentList.html" data-type="entity-link" >ToggleIndentList</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleReport.html" data-type="entity-link" >ToggleReport</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleShowAllAS.html" data-type="entity-link" >ToggleShowAllAS</a>
                            </li>
                            <li class="link">
                                <a href="classes/TreeMarkGroup.html" data-type="entity-link" >TreeMarkGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBimodal.html" data-type="entity-link" >UpdateBimodal</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBimodalConfig.html" data-type="entity-link" >UpdateBimodalConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBottomSheetData.html" data-type="entity-link" >UpdateBottomSheetData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBottomSheetDOI.html" data-type="entity-link" >UpdateBottomSheetDOI</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBottomSheetInfo.html" data-type="entity-link" >UpdateBottomSheetInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateConfig.html" data-type="entity-link" >UpdateConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateGetFromCache.html" data-type="entity-link" >UpdateGetFromCache</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateGraphWidth.html" data-type="entity-link" >UpdateGraphWidth</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLinksData.html" data-type="entity-link" >UpdateLinksData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLoadingText.html" data-type="entity-link" >UpdateLoadingText</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMode.html" data-type="entity-link" >UpdateMode</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOmapConfig.html" data-type="entity-link" >UpdateOmapConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlaygroundData.html" data-type="entity-link" >UpdatePlaygroundData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePrevSheet.html" data-type="entity-link" >UpdatePrevSheet</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReport.html" data-type="entity-link" >UpdateReport</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSelectedOrgansBeforeFilter.html" data-type="entity-link" >UpdateSelectedOrgansBeforeFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSheet.html" data-type="entity-link" >UpdateSheet</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVegaSpec.html" data-type="entity-link" >UpdateVegaSpec</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVegaView.html" data-type="entity-link" >UpdateVegaView</a>
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
                                    <a href="injectables/BimodalService.html" data-type="entity-link" >BimodalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsentService.html" data-type="entity-link" >ConsentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocsService.html" data-type="entity-link" >DocsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAnalyticsSyncService.html" data-type="entity-link" >GoogleAnalyticsSyncService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndentedListService.html" data-type="entity-link" >IndentedListService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LegendService.html" data-type="entity-link" >LegendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageSyncService.html" data-type="entity-link" >LocalStorageSyncService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsState.html" data-type="entity-link" >LogsState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link" >ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SheetService.html" data-type="entity-link" >SheetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SheetState.html" data-type="entity-link" >SheetState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreeService.html" data-type="entity-link" >TreeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreeState.html" data-type="entity-link" >TreeState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UIState.html" data-type="entity-link" >UIState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VegaService.html" data-type="entity-link" >VegaService</a>
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
                                <a href="interfaces/AnalyticsOptions.html" data-type="entity-link" >AnalyticsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AS.html" data-type="entity-link" >AS</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ASCTBConfig.html" data-type="entity-link" >ASCTBConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ASCTD.html" data-type="entity-link" >ASCTD</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/B.html" data-type="entity-link" >B</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Base.html" data-type="entity-link" >Base</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BimodalConfig.html" data-type="entity-link" >BimodalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BimodalData.html" data-type="entity-link" >BimodalData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BiomarkersCounts.html" data-type="entity-link" >BiomarkersCounts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BiomarkersNamesInReport.html" data-type="entity-link" >BiomarkersNamesInReport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BmCtPairings.html" data-type="entity-link" >BmCtPairings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CByOrgan.html" data-type="entity-link" >CByOrgan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompareData.html" data-type="entity-link" >CompareData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompareReport.html" data-type="entity-link" >CompareReport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompareReportData.html" data-type="entity-link" >CompareReportData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationOptions.html" data-type="entity-link" >ConfigurationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CT.html" data-type="entity-link" >CT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DD.html" data-type="entity-link" >DD</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Degree.html" data-type="entity-link" >Degree</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiscrepencyStructure.html" data-type="entity-link" >DiscrepencyStructure</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DOI.html" data-type="entity-link" >DOI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EntityWithNoOtherEntity.html" data-type="entity-link" >EntityWithNoOtherEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error.html" data-type="entity-link" >Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportVega.html" data-type="entity-link" >ExportVega</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FlatNode.html" data-type="entity-link" >FlatNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GaCompareInfo.html" data-type="entity-link" >GaCompareInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GaNodeInfo.html" data-type="entity-link" >GaNodeInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GaOrganInfo.html" data-type="entity-link" >GaOrganInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GaOrgansInfo.html" data-type="entity-link" >GaOrgansInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GEdge.html" data-type="entity-link" >GEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GNode.html" data-type="entity-link" >GNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Graph.html" data-type="entity-link" >Graph</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GraphData.html" data-type="entity-link" >GraphData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Legend.html" data-type="entity-link" >Legend</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Link.html" data-type="entity-link" >Link</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LinksASCTBData.html" data-type="entity-link" >LinksASCTBData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Loading.html" data-type="entity-link" >Loading</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Log.html" data-type="entity-link" >Log</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogEntry.html" data-type="entity-link" >LogEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Logs.html" data-type="entity-link" >Logs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogsStateModel.html" data-type="entity-link" >LogsStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Metadata.html" data-type="entity-link" >Metadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoreOption.html" data-type="entity-link" >MoreOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Node.html" data-type="entity-link" >Node</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OmapConfig.html" data-type="entity-link" >OmapConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpenBottomSheetData.html" data-type="entity-link" >OpenBottomSheetData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Organ.html" data-type="entity-link" >Organ</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganTableOnClose.html" data-type="entity-link" >OrganTableOnClose</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganTableSelect.html" data-type="entity-link" >OrganTableSelect</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaygroundSheetOptions.html" data-type="entity-link" >PlaygroundSheetOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Reference.html" data-type="entity-link" >Reference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Report.html" data-type="entity-link" >Report</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportData.html" data-type="entity-link" >ReportData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseData.html" data-type="entity-link" >ResponseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Row.html" data-type="entity-link" >Row</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchStructure.html" data-type="entity-link" >SearchStructure</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectedOrganBeforeFilter.html" data-type="entity-link" >SelectedOrganBeforeFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sheet.html" data-type="entity-link" >Sheet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SheetConfig.html" data-type="entity-link" >SheetConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SheetDetails.html" data-type="entity-link" >SheetDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SheetInfo.html" data-type="entity-link" >SheetInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SheetOptions.html" data-type="entity-link" >SheetOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SheetStateModel.html" data-type="entity-link" >SheetStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Snackbar.html" data-type="entity-link" >Snackbar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Structure.html" data-type="entity-link" >Structure</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreeStateModel.html" data-type="entity-link" >TreeStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UIStateModel.html" data-type="entity-link" >UIStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadForm.html" data-type="entity-link" >UploadForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Version.html" data-type="entity-link" >Version</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VersionDetail.html" data-type="entity-link" >VersionDetail</a>
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
                                    <a href="pipes/OrderByPipe.html" data-type="entity-link" >OrderByPipe</a>
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