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
                    <a href="index.html" data-type="index-link">humanatlas.io</a>
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
                                <a href="modules/AnnouncementCardModule.html" data-type="entity-link" >AnnouncementCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AnnouncementCardModule-92016bdeacad1db0661ebd8e9964f7f49cd5dcbc4f17f5d70fdba68ba829a65dbb1557af2653625fecb7a8e86a9495cb35f17ec53d6713a4e7cb684e07e92ce9"' : 'data-bs-target="#xs-components-links-module-AnnouncementCardModule-92016bdeacad1db0661ebd8e9964f7f49cd5dcbc4f17f5d70fdba68ba829a65dbb1557af2653625fecb7a8e86a9495cb35f17ec53d6713a4e7cb684e07e92ce9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AnnouncementCardModule-92016bdeacad1db0661ebd8e9964f7f49cd5dcbc4f17f5d70fdba68ba829a65dbb1557af2653625fecb7a8e86a9495cb35f17ec53d6713a4e7cb684e07e92ce9"' :
                                            'id="xs-components-links-module-AnnouncementCardModule-92016bdeacad1db0661ebd8e9964f7f49cd5dcbc4f17f5d70fdba68ba829a65dbb1557af2653625fecb7a8e86a9495cb35f17ec53d6713a4e7cb684e07e92ce9"' }>
                                            <li class="link">
                                                <a href="components/AnnouncementCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-25ea28f6f8ae4ea18fc10e19de1f05c8eb8b830187fe7a6cff9f1530497a9d64b85d0f38b26ebbb1da644709db57c1dad606b601b7e816f1662cb315ddfa2aa3"' : 'data-bs-target="#xs-components-links-module-AppModule-25ea28f6f8ae4ea18fc10e19de1f05c8eb8b830187fe7a6cff9f1530497a9d64b85d0f38b26ebbb1da644709db57c1dad606b601b7e816f1662cb315ddfa2aa3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-25ea28f6f8ae4ea18fc10e19de1f05c8eb8b830187fe7a6cff9f1530497a9d64b85d0f38b26ebbb1da644709db57c1dad606b601b7e816f1662cb315ddfa2aa3"' :
                                            'id="xs-components-links-module-AppModule-25ea28f6f8ae4ea18fc10e19de1f05c8eb8b830187fe7a6cff9f1530497a9d64b85d0f38b26ebbb1da644709db57c1dad606b601b7e816f1662cb315ddfa2aa3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BoardMembersModule.html" data-type="entity-link" >BoardMembersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BoardMembersModule-0c7a7630e139feec9873e25f4492cc29ca59dbf72c52d4b38104dee081adbffb6575fedf29b74ab32c1b90fe504a461ddf7a5f661e13b5136376158d5afd275e"' : 'data-bs-target="#xs-components-links-module-BoardMembersModule-0c7a7630e139feec9873e25f4492cc29ca59dbf72c52d4b38104dee081adbffb6575fedf29b74ab32c1b90fe504a461ddf7a5f661e13b5136376158d5afd275e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BoardMembersModule-0c7a7630e139feec9873e25f4492cc29ca59dbf72c52d4b38104dee081adbffb6575fedf29b74ab32c1b90fe504a461ddf7a5f661e13b5136376158d5afd275e"' :
                                            'id="xs-components-links-module-BoardMembersModule-0c7a7630e139feec9873e25f4492cc29ca59dbf72c52d4b38104dee081adbffb6575fedf29b74ab32c1b90fe504a461ddf7a5f661e13b5136376158d5afd275e"' }>
                                            <li class="link">
                                                <a href="components/BoardMembersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardMembersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BottomToolbarModule.html" data-type="entity-link" >BottomToolbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BottomToolbarModule-e71585be4164738220b29a8e8b5b5ed739ebe3ebc5eae049264c4ad67a192c379a245f4dd413dcf79839cb7bd596cd0b020b59f9ee708de07ce3f725ccf6e7bb"' : 'data-bs-target="#xs-components-links-module-BottomToolbarModule-e71585be4164738220b29a8e8b5b5ed739ebe3ebc5eae049264c4ad67a192c379a245f4dd413dcf79839cb7bd596cd0b020b59f9ee708de07ce3f725ccf6e7bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BottomToolbarModule-e71585be4164738220b29a8e8b5b5ed739ebe3ebc5eae049264c4ad67a192c379a245f4dd413dcf79839cb7bd596cd0b020b59f9ee708de07ce3f725ccf6e7bb"' :
                                            'id="xs-components-links-module-BottomToolbarModule-e71585be4164738220b29a8e8b5b5ed739ebe3ebc5eae049264c4ad67a192c379a245f4dd413dcf79839cb7bd596cd0b020b59f9ee708de07ce3f725ccf6e7bb"' }>
                                            <li class="link">
                                                <a href="components/BottomToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BottomToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardButtonLongModule.html" data-type="entity-link" >CardButtonLongModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardButtonLongModule-3a7122dd8d0a55f8f342835e9a8d8138c4d6adf89d79677098b9f05a2cfa0972e0fda26ed3c1710d5ba284b00865b3802d0709bf0c44996cd9eaebfd2a6e192a"' : 'data-bs-target="#xs-components-links-module-CardButtonLongModule-3a7122dd8d0a55f8f342835e9a8d8138c4d6adf89d79677098b9f05a2cfa0972e0fda26ed3c1710d5ba284b00865b3802d0709bf0c44996cd9eaebfd2a6e192a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardButtonLongModule-3a7122dd8d0a55f8f342835e9a8d8138c4d6adf89d79677098b9f05a2cfa0972e0fda26ed3c1710d5ba284b00865b3802d0709bf0c44996cd9eaebfd2a6e192a"' :
                                            'id="xs-components-links-module-CardButtonLongModule-3a7122dd8d0a55f8f342835e9a8d8138c4d6adf89d79677098b9f05a2cfa0972e0fda26ed3c1710d5ba284b00865b3802d0709bf0c44996cd9eaebfd2a6e192a"' }>
                                            <li class="link">
                                                <a href="components/CardButtonLongComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardButtonLongComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardWithHeaderModule.html" data-type="entity-link" >CardWithHeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardWithHeaderModule-0ae02c852c6ba0d1b7b4ee4b30d101304d5f79ea5b145e2fd06006942e8402ad2e46891793606c93e315966f514565e62d7624d4411636bb06fa9b010b75f99a"' : 'data-bs-target="#xs-components-links-module-CardWithHeaderModule-0ae02c852c6ba0d1b7b4ee4b30d101304d5f79ea5b145e2fd06006942e8402ad2e46891793606c93e315966f514565e62d7624d4411636bb06fa9b010b75f99a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardWithHeaderModule-0ae02c852c6ba0d1b7b4ee4b30d101304d5f79ea5b145e2fd06006942e8402ad2e46891793606c93e315966f514565e62d7624d4411636bb06fa9b010b75f99a"' :
                                            'id="xs-components-links-module-CardWithHeaderModule-0ae02c852c6ba0d1b7b4ee4b30d101304d5f79ea5b145e2fd06006942e8402ad2e46891793606c93e315966f514565e62d7624d4411636bb06fa9b010b75f99a"' }>
                                            <li class="link">
                                                <a href="components/CardWithHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardWithHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CarouselModule.html" data-type="entity-link" >CarouselModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CarouselModule-dbf569596b3584c7f0bc10dfa313287f018a5b9464cae7709a698f19fb53b47547dd03f565d076f02252c6c7debe088e42e9f5c35fc2bf08f960d77d4affdd48"' : 'data-bs-target="#xs-components-links-module-CarouselModule-dbf569596b3584c7f0bc10dfa313287f018a5b9464cae7709a698f19fb53b47547dd03f565d076f02252c6c7debe088e42e9f5c35fc2bf08f960d77d4affdd48"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CarouselModule-dbf569596b3584c7f0bc10dfa313287f018a5b9464cae7709a698f19fb53b47547dd03f565d076f02252c6c7debe088e42e9f5c35fc2bf08f960d77d4affdd48"' :
                                            'id="xs-components-links-module-CarouselModule-dbf569596b3584c7f0bc10dfa313287f018a5b9464cae7709a698f19fb53b47547dd03f565d076f02252c6c7debe088e42e9f5c35fc2bf08f960d77d4affdd48"' }>
                                            <li class="link">
                                                <a href="components/CarouselComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChooseVersionModule.html" data-type="entity-link" >ChooseVersionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChooseVersionModule-1da28a14b49fc96b89dbbc42d4b10720f8a24fc081cf41a3f68e06633aa5e747eedb654914fa4f0bae61af0ea4e8f3d188c6f58d5b85827ce1701e221d403381"' : 'data-bs-target="#xs-components-links-module-ChooseVersionModule-1da28a14b49fc96b89dbbc42d4b10720f8a24fc081cf41a3f68e06633aa5e747eedb654914fa4f0bae61af0ea4e8f3d188c6f58d5b85827ce1701e221d403381"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChooseVersionModule-1da28a14b49fc96b89dbbc42d4b10720f8a24fc081cf41a3f68e06633aa5e747eedb654914fa4f0bae61af0ea4e8f3d188c6f58d5b85827ce1701e221d403381"' :
                                            'id="xs-components-links-module-ChooseVersionModule-1da28a14b49fc96b89dbbc42d4b10720f8a24fc081cf41a3f68e06633aa5e747eedb654914fa4f0bae61af0ea4e8f3d188c6f58d5b85827ce1701e221d403381"' }>
                                            <li class="link">
                                                <a href="components/ChooseVersionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChooseVersionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContactCardModule.html" data-type="entity-link" >ContactCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ContactCardModule-769a584ce53e109b857708e8f956937bca2fa930481f8fd393e79d37e323d0ea00987b88e4eae017e2d47540c2765014de707546a83b105005e26aa7850b0e53"' : 'data-bs-target="#xs-components-links-module-ContactCardModule-769a584ce53e109b857708e8f956937bca2fa930481f8fd393e79d37e323d0ea00987b88e4eae017e2d47540c2765014de707546a83b105005e26aa7850b0e53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContactCardModule-769a584ce53e109b857708e8f956937bca2fa930481f8fd393e79d37e323d0ea00987b88e4eae017e2d47540c2765014de707546a83b105005e26aa7850b0e53"' :
                                            'id="xs-components-links-module-ContactCardModule-769a584ce53e109b857708e8f956937bca2fa930481f8fd393e79d37e323d0ea00987b88e4eae017e2d47540c2765014de707546a83b105005e26aa7850b0e53"' }>
                                            <li class="link">
                                                <a href="components/ContactCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CopyClipboardModule.html" data-type="entity-link" >CopyClipboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CopyClipboardModule-6afc75f683f43d97b82ce4495f7a721c322e11c9ae42d9c668a8219214c891641f74c4c22358113b1e0145f78d819898fc47e01f9b6eaf6e61f0be38ac39f579"' : 'data-bs-target="#xs-components-links-module-CopyClipboardModule-6afc75f683f43d97b82ce4495f7a721c322e11c9ae42d9c668a8219214c891641f74c4c22358113b1e0145f78d819898fc47e01f9b6eaf6e61f0be38ac39f579"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CopyClipboardModule-6afc75f683f43d97b82ce4495f7a721c322e11c9ae42d9c668a8219214c891641f74c4c22358113b1e0145f78d819898fc47e01f9b6eaf6e61f0be38ac39f579"' :
                                            'id="xs-components-links-module-CopyClipboardModule-6afc75f683f43d97b82ce4495f7a721c322e11c9ae42d9c668a8219214c891641f74c4c22358113b1e0145f78d819898fc47e01f9b6eaf6e61f0be38ac39f579"' }>
                                            <li class="link">
                                                <a href="components/CopyClipboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CopyClipboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CountInfoCardModule.html" data-type="entity-link" >CountInfoCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CountInfoCardModule-45580df8ca38b63d45c4b08de646d776d6b6083d6b7835cfb36063d9182386f1adf0c52d651901a44a628b8fad7b6c6cd3f27df494c353dedb59f6efd01f6af2"' : 'data-bs-target="#xs-components-links-module-CountInfoCardModule-45580df8ca38b63d45c4b08de646d776d6b6083d6b7835cfb36063d9182386f1adf0c52d651901a44a628b8fad7b6c6cd3f27df494c353dedb59f6efd01f6af2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CountInfoCardModule-45580df8ca38b63d45c4b08de646d776d6b6083d6b7835cfb36063d9182386f1adf0c52d651901a44a628b8fad7b6c6cd3f27df494c353dedb59f6efd01f6af2"' :
                                            'id="xs-components-links-module-CountInfoCardModule-45580df8ca38b63d45c4b08de646d776d6b6083d6b7835cfb36063d9182386f1adf0c52d651901a44a628b8fad7b6c6cd3f27df494c353dedb59f6efd01f6af2"' }>
                                            <li class="link">
                                                <a href="components/CountInfoCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountInfoCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DownloadFtuModule.html" data-type="entity-link" >DownloadFtuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DownloadFtuModule-314fa06f8af55bca9ad6ad75945eb334faf9f1091d5fe9cea8034aff340fc15dc51d7986118b7c5dd970ca3f21064fcdf54b90676f23da08d5c89647d251b43f"' : 'data-bs-target="#xs-components-links-module-DownloadFtuModule-314fa06f8af55bca9ad6ad75945eb334faf9f1091d5fe9cea8034aff340fc15dc51d7986118b7c5dd970ca3f21064fcdf54b90676f23da08d5c89647d251b43f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DownloadFtuModule-314fa06f8af55bca9ad6ad75945eb334faf9f1091d5fe9cea8034aff340fc15dc51d7986118b7c5dd970ca3f21064fcdf54b90676f23da08d5c89647d251b43f"' :
                                            'id="xs-components-links-module-DownloadFtuModule-314fa06f8af55bca9ad6ad75945eb334faf9f1091d5fe9cea8034aff340fc15dc51d7986118b7c5dd970ca3f21064fcdf54b90676f23da08d5c89647d251b43f"' }>
                                            <li class="link">
                                                <a href="components/DownloadFtuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DownloadFtuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MenuTreeModule.html" data-type="entity-link" >MenuTreeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MenuTreeModule-d362e73bd8f7095e68ad3f730d426e6a14eb2d9a5c5c99fb4c53220df218dbc07699a6c1a1b5b5188451255a74a3426e45ff311ff397e0b80816cf058b461651"' : 'data-bs-target="#xs-components-links-module-MenuTreeModule-d362e73bd8f7095e68ad3f730d426e6a14eb2d9a5c5c99fb4c53220df218dbc07699a6c1a1b5b5188451255a74a3426e45ff311ff397e0b80816cf058b461651"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MenuTreeModule-d362e73bd8f7095e68ad3f730d426e6a14eb2d9a5c5c99fb4c53220df218dbc07699a6c1a1b5b5188451255a74a3426e45ff311ff397e0b80816cf058b461651"' :
                                            'id="xs-components-links-module-MenuTreeModule-d362e73bd8f7095e68ad3f730d426e6a14eb2d9a5c5c99fb4c53220df218dbc07699a6c1a1b5b5188451255a74a3426e45ff311ff397e0b80816cf058b461651"' }>
                                            <li class="link">
                                                <a href="components/MenuTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuTreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganTabsModule.html" data-type="entity-link" >OrganTabsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OrganTabsModule-242ecdfbad132ceb0c6195aebed7eed28f7282b0924d827408e0b8594ebbcde17de23b56ae1e5081c6b5040e8acfe6a126fd67406dcfd23699a8f9db5cc6d7f2"' : 'data-bs-target="#xs-components-links-module-OrganTabsModule-242ecdfbad132ceb0c6195aebed7eed28f7282b0924d827408e0b8594ebbcde17de23b56ae1e5081c6b5040e8acfe6a126fd67406dcfd23699a8f9db5cc6d7f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganTabsModule-242ecdfbad132ceb0c6195aebed7eed28f7282b0924d827408e0b8594ebbcde17de23b56ae1e5081c6b5040e8acfe6a126fd67406dcfd23699a8f9db5cc6d7f2"' :
                                            'id="xs-components-links-module-OrganTabsModule-242ecdfbad132ceb0c6195aebed7eed28f7282b0924d827408e0b8594ebbcde17de23b56ae1e5081c6b5040e8acfe6a126fd67406dcfd23699a8f9db5cc6d7f2"' }>
                                            <li class="link">
                                                <a href="components/OrganTabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganTabsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganVersionModule.html" data-type="entity-link" >OrganVersionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OrganVersionModule-1b6133de6c1d1c6d7685f1ab36d82cdb7bd269ceb6015e5713219ce61e30b82d61027f37d96c0717dcf33193b2f3a589d762339939674c67a0aa242a6ec9a159"' : 'data-bs-target="#xs-components-links-module-OrganVersionModule-1b6133de6c1d1c6d7685f1ab36d82cdb7bd269ceb6015e5713219ce61e30b82d61027f37d96c0717dcf33193b2f3a589d762339939674c67a0aa242a6ec9a159"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganVersionModule-1b6133de6c1d1c6d7685f1ab36d82cdb7bd269ceb6015e5713219ce61e30b82d61027f37d96c0717dcf33193b2f3a589d762339939674c67a0aa242a6ec9a159"' :
                                            'id="xs-components-links-module-OrganVersionModule-1b6133de6c1d1c6d7685f1ab36d82cdb7bd269ceb6015e5713219ce61e30b82d61027f37d96c0717dcf33193b2f3a589d762339939674c67a0aa242a6ec9a159"' }>
                                            <li class="link">
                                                <a href="components/OrganVersionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganVersionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PageDataModule.html" data-type="entity-link" >PageDataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PageDataModule-26532e0a3c263462e57a19f30e819e394649544ea42b4e30a3aa0edee8458440ac50f0086e6854b7c1c795dfe3dea0f12332d4ad124a7ae1ea43018195210074"' : 'data-bs-target="#xs-components-links-module-PageDataModule-26532e0a3c263462e57a19f30e819e394649544ea42b4e30a3aa0edee8458440ac50f0086e6854b7c1c795dfe3dea0f12332d4ad124a7ae1ea43018195210074"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PageDataModule-26532e0a3c263462e57a19f30e819e394649544ea42b4e30a3aa0edee8458440ac50f0086e6854b7c1c795dfe3dea0f12332d4ad124a7ae1ea43018195210074"' :
                                            'id="xs-components-links-module-PageDataModule-26532e0a3c263462e57a19f30e819e394649544ea42b4e30a3aa0edee8458440ac50f0086e6854b7c1c795dfe3dea0f12332d4ad124a7ae1ea43018195210074"' }>
                                            <li class="link">
                                                <a href="components/PageDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageDataComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PageElementModule.html" data-type="entity-link" >PageElementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PageElementModule-f20cde6805b94f303334d99cce56efe6afe327fdb21009c2fbb53d91d6bff7e5fc4201f8e8f1cb0c2193e2430c4ed30265907d23ec891af084242454e8074a7a"' : 'data-bs-target="#xs-components-links-module-PageElementModule-f20cde6805b94f303334d99cce56efe6afe327fdb21009c2fbb53d91d6bff7e5fc4201f8e8f1cb0c2193e2430c4ed30265907d23ec891af084242454e8074a7a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PageElementModule-f20cde6805b94f303334d99cce56efe6afe327fdb21009c2fbb53d91d6bff7e5fc4201f8e8f1cb0c2193e2430c4ed30265907d23ec891af084242454e8074a7a"' :
                                            'id="xs-components-links-module-PageElementModule-f20cde6805b94f303334d99cce56efe6afe327fdb21009c2fbb53d91d6bff7e5fc4201f8e8f1cb0c2193e2430c4ed30265907d23ec891af084242454e8074a7a"' }>
                                            <li class="link">
                                                <a href="components/PageElementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageElementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PageHeaderModule.html" data-type="entity-link" >PageHeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PageHeaderModule-e7b1c7458d78bab42b8a3377ea907c044717a31d5adc903df53d4978587eec1ed23c6c4b63d12fd23d398eff958b0a3abee3eddedb433b23ef94e8ecf0bdfd6c"' : 'data-bs-target="#xs-components-links-module-PageHeaderModule-e7b1c7458d78bab42b8a3377ea907c044717a31d5adc903df53d4978587eec1ed23c6c4b63d12fd23d398eff958b0a3abee3eddedb433b23ef94e8ecf0bdfd6c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PageHeaderModule-e7b1c7458d78bab42b8a3377ea907c044717a31d5adc903df53d4978587eec1ed23c6c4b63d12fd23d398eff958b0a3abee3eddedb433b23ef94e8ecf0bdfd6c"' :
                                            'id="xs-components-links-module-PageHeaderModule-e7b1c7458d78bab42b8a3377ea907c044717a31d5adc903df53d4978587eec1ed23c6c4b63d12fd23d398eff958b0a3abee3eddedb433b23ef94e8ecf0bdfd6c"' }>
                                            <li class="link">
                                                <a href="components/PageHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PageModule.html" data-type="entity-link" >PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PageModule-37c11e7af9c20982aa0a5946551e3dac111d8c96cdf3eb9c9b80ff391cafc80ba03a3db3c783417174d726afffcaa51b3d87906a0a3021885f95416d96ac7b9b"' : 'data-bs-target="#xs-components-links-module-PageModule-37c11e7af9c20982aa0a5946551e3dac111d8c96cdf3eb9c9b80ff391cafc80ba03a3db3c783417174d726afffcaa51b3d87906a0a3021885f95416d96ac7b9b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PageModule-37c11e7af9c20982aa0a5946551e3dac111d8c96cdf3eb9c9b80ff391cafc80ba03a3db3c783417174d726afffcaa51b3d87906a0a3021885f95416d96ac7b9b"' :
                                            'id="xs-components-links-module-PageModule-37c11e7af9c20982aa0a5946551e3dac111d8c96cdf3eb9c9b80ff391cafc80ba03a3db3c783417174d726afffcaa51b3d87906a0a3021885f95416d96ac7b9b"' }>
                                            <li class="link">
                                                <a href="components/PageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PageRendererModule.html" data-type="entity-link" >PageRendererModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PageRendererModule-8755389dc84d373f5ea3cccd41bce5c15db1d5b46f32be583b79356306d2b4e28fe750abaeb27de7ded0d6429d6c7bff258f56f181bebc1d01744928e12868a1"' : 'data-bs-target="#xs-components-links-module-PageRendererModule-8755389dc84d373f5ea3cccd41bce5c15db1d5b46f32be583b79356306d2b4e28fe750abaeb27de7ded0d6429d6c7bff258f56f181bebc1d01744928e12868a1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PageRendererModule-8755389dc84d373f5ea3cccd41bce5c15db1d5b46f32be583b79356306d2b4e28fe750abaeb27de7ded0d6429d6c7bff258f56f181bebc1d01744928e12868a1"' :
                                            'id="xs-components-links-module-PageRendererModule-8755389dc84d373f5ea3cccd41bce5c15db1d5b46f32be583b79356306d2b4e28fe750abaeb27de7ded0d6429d6c7bff258f56f181bebc1d01744928e12868a1"' }>
                                            <li class="link">
                                                <a href="components/PageRendererComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageRendererComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrizeCardModule.html" data-type="entity-link" >PrizeCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PrizeCardModule-c3be54faf7e160220a10951755ef39476a55877f1fd3f5eff4f981a2434f2eff86f07097d11dee90c39b139934824daf71c4a965aafc4826e941f86e476b3cd0"' : 'data-bs-target="#xs-components-links-module-PrizeCardModule-c3be54faf7e160220a10951755ef39476a55877f1fd3f5eff4f981a2434f2eff86f07097d11dee90c39b139934824daf71c4a965aafc4826e941f86e476b3cd0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrizeCardModule-c3be54faf7e160220a10951755ef39476a55877f1fd3f5eff4f981a2434f2eff86f07097d11dee90c39b139934824daf71c4a965aafc4826e941f86e476b3cd0"' :
                                            'id="xs-components-links-module-PrizeCardModule-c3be54faf7e160220a10951755ef39476a55877f1fd3f5eff4f981a2434f2eff86f07097d11dee90c39b139934824daf71c4a965aafc4826e941f86e476b3cd0"' }>
                                            <li class="link">
                                                <a href="components/PrizeCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrizeCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SectionCardModule.html" data-type="entity-link" >SectionCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SectionCardModule-a0182fa2dfb61afac1b9deb36503c59c34e309c4d300c80dfa1daed665b366dd1b83d2daed0547936e6f6aab0fa46d05b5bd2b9e2a9cd8e6f6ae1c764f3d0954"' : 'data-bs-target="#xs-components-links-module-SectionCardModule-a0182fa2dfb61afac1b9deb36503c59c34e309c4d300c80dfa1daed665b366dd1b83d2daed0547936e6f6aab0fa46d05b5bd2b9e2a9cd8e6f6ae1c764f3d0954"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SectionCardModule-a0182fa2dfb61afac1b9deb36503c59c34e309c4d300c80dfa1daed665b366dd1b83d2daed0547936e6f6aab0fa46d05b5bd2b9e2a9cd8e6f6ae1c764f3d0954"' :
                                            'id="xs-components-links-module-SectionCardModule-a0182fa2dfb61afac1b9deb36503c59c34e309c4d300c80dfa1daed665b366dd1b83d2daed0547936e6f6aab0fa46d05b5bd2b9e2a9cd8e6f6ae1c764f3d0954"' }>
                                            <li class="link">
                                                <a href="components/SectionCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SectionCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SimpleImageModule.html" data-type="entity-link" >SimpleImageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SimpleImageModule-f09a6e4278e4a39e26bbdc57512aad37d252d5232167ed19a30c6906be7d9db0a3c183c160fd6186297ad5241275d5bc466a18a8a7b20026f4400892c196e0e1"' : 'data-bs-target="#xs-components-links-module-SimpleImageModule-f09a6e4278e4a39e26bbdc57512aad37d252d5232167ed19a30c6906be7d9db0a3c183c160fd6186297ad5241275d5bc466a18a8a7b20026f4400892c196e0e1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SimpleImageModule-f09a6e4278e4a39e26bbdc57512aad37d252d5232167ed19a30c6906be7d9db0a3c183c160fd6186297ad5241275d5bc466a18a8a7b20026f4400892c196e0e1"' :
                                            'id="xs-components-links-module-SimpleImageModule-f09a6e4278e4a39e26bbdc57512aad37d252d5232167ed19a30c6906be7d9db0a3c183c160fd6186297ad5241275d5bc466a18a8a7b20026f4400892c196e0e1"' }>
                                            <li class="link">
                                                <a href="components/SimpleImageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimpleImageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SimpleTileModule.html" data-type="entity-link" >SimpleTileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SimpleTileModule-70b5e1cefa32c8c816c08b3634dfbbd5099de3b9dcd0a2c312c5646ebf5f4bfc8a5873adaf228b20f96fa47839b5e8400e21a16993b35a80e6f182d5ab4adb30"' : 'data-bs-target="#xs-components-links-module-SimpleTileModule-70b5e1cefa32c8c816c08b3634dfbbd5099de3b9dcd0a2c312c5646ebf5f4bfc8a5873adaf228b20f96fa47839b5e8400e21a16993b35a80e6f182d5ab4adb30"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SimpleTileModule-70b5e1cefa32c8c816c08b3634dfbbd5099de3b9dcd0a2c312c5646ebf5f4bfc8a5873adaf228b20f96fa47839b5e8400e21a16993b35a80e6f182d5ab4adb30"' :
                                            'id="xs-components-links-module-SimpleTileModule-70b5e1cefa32c8c816c08b3634dfbbd5099de3b9dcd0a2c312c5646ebf5f4bfc8a5873adaf228b20f96fa47839b5e8400e21a16993b35a80e6f182d5ab4adb30"' }>
                                            <li class="link">
                                                <a href="components/SimpleTileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimpleTileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SopLinksModule.html" data-type="entity-link" >SopLinksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SopLinksModule-2537b540ba5b547f36502dc2cf7268acd9fe453e6221384f906b30d1219c9125819175588257c0880f477b7959d6a479fda8765c232f1c75166376513bd28095"' : 'data-bs-target="#xs-components-links-module-SopLinksModule-2537b540ba5b547f36502dc2cf7268acd9fe453e6221384f906b30d1219c9125819175588257c0880f477b7959d6a479fda8765c232f1c75166376513bd28095"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SopLinksModule-2537b540ba5b547f36502dc2cf7268acd9fe453e6221384f906b30d1219c9125819175588257c0880f477b7959d6a479fda8765c232f1c75166376513bd28095"' :
                                            'id="xs-components-links-module-SopLinksModule-2537b540ba5b547f36502dc2cf7268acd9fe453e6221384f906b30d1219c9125819175588257c0880f477b7959d6a479fda8765c232f1c75166376513bd28095"' }>
                                            <li class="link">
                                                <a href="components/SopLinksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SopLinksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SwiperModule.html" data-type="entity-link" >SwiperModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SwiperModule-53ffdb1c5f0b017cb24c1ade5489d72d5b37a570af9df117c1a73f774f8926cf0b91a6354a7de2fe944b46cfb4ff874204a73330c6a9d2be95707c1d83d40f08"' : 'data-bs-target="#xs-components-links-module-SwiperModule-53ffdb1c5f0b017cb24c1ade5489d72d5b37a570af9df117c1a73f774f8926cf0b91a6354a7de2fe944b46cfb4ff874204a73330c6a9d2be95707c1d83d40f08"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SwiperModule-53ffdb1c5f0b017cb24c1ade5489d72d5b37a570af9df117c1a73f774f8926cf0b91a6354a7de2fe944b46cfb4ff874204a73330c6a9d2be95707c1d83d40f08"' :
                                            'id="xs-components-links-module-SwiperModule-53ffdb1c5f0b017cb24c1ade5489d72d5b37a570af9df117c1a73f774f8926cf0b91a6354a7de2fe944b46cfb4ff874204a73330c6a9d2be95707c1d83d40f08"' }>
                                            <li class="link">
                                                <a href="components/SwiperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SwiperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableModule.html" data-type="entity-link" >TableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TableModule-d18c85ce11257dbac8cc9901b73149c127a8c4fde3f843941b7748a6285fded51c93fff47c6492f89825adab27cb0a8b8acfc9e67b3e2b62c227a1d7f1390b69"' : 'data-bs-target="#xs-components-links-module-TableModule-d18c85ce11257dbac8cc9901b73149c127a8c4fde3f843941b7748a6285fded51c93fff47c6492f89825adab27cb0a8b8acfc9e67b3e2b62c227a1d7f1390b69"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableModule-d18c85ce11257dbac8cc9901b73149c127a8c4fde3f843941b7748a6285fded51c93fff47c6492f89825adab27cb0a8b8acfc9e67b3e2b62c227a1d7f1390b69"' :
                                            'id="xs-components-links-module-TableModule-d18c85ce11257dbac8cc9901b73149c127a8c4fde3f843941b7748a6285fded51c93fff47c6492f89825adab27cb0a8b8acfc9e67b3e2b62c227a1d7f1390b69"' }>
                                            <li class="link">
                                                <a href="components/TableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableVersionModule.html" data-type="entity-link" >TableVersionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TableVersionModule-3d48e757bc21faab526d251edc83ff4c6677459446eba04858c1a972bb57303b02d187a78beaaa8321f1bdcb83865243b7d56a167cf3d64193630d5f39475aaa"' : 'data-bs-target="#xs-components-links-module-TableVersionModule-3d48e757bc21faab526d251edc83ff4c6677459446eba04858c1a972bb57303b02d187a78beaaa8321f1bdcb83865243b7d56a167cf3d64193630d5f39475aaa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableVersionModule-3d48e757bc21faab526d251edc83ff4c6677459446eba04858c1a972bb57303b02d187a78beaaa8321f1bdcb83865243b7d56a167cf3d64193630d5f39475aaa"' :
                                            'id="xs-components-links-module-TableVersionModule-3d48e757bc21faab526d251edc83ff4c6677459446eba04858c1a972bb57303b02d187a78beaaa8321f1bdcb83865243b7d56a167cf3d64193630d5f39475aaa"' }>
                                            <li class="link">
                                                <a href="components/TableVersionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableVersionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueInfoPageModule.html" data-type="entity-link" >TissueInfoPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TissueInfoPageModule-3463eb21abfb0b534c7b905b0e0f0025b2c5a76a5a2be2f9200aafab6c0f8d0c591f916bf49db1d4ae21d53584c8420afe8141264e22756b4dc757399e0e85c7"' : 'data-bs-target="#xs-components-links-module-TissueInfoPageModule-3463eb21abfb0b534c7b905b0e0f0025b2c5a76a5a2be2f9200aafab6c0f8d0c591f916bf49db1d4ae21d53584c8420afe8141264e22756b4dc757399e0e85c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueInfoPageModule-3463eb21abfb0b534c7b905b0e0f0025b2c5a76a5a2be2f9200aafab6c0f8d0c591f916bf49db1d4ae21d53584c8420afe8141264e22756b4dc757399e0e85c7"' :
                                            'id="xs-components-links-module-TissueInfoPageModule-3463eb21abfb0b534c7b905b0e0f0025b2c5a76a5a2be2f9200aafab6c0f8d0c591f916bf49db1d4ae21d53584c8420afe8141264e22756b4dc757399e0e85c7"' }>
                                            <li class="link">
                                                <a href="components/TissueInfoPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TissueInfoPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TissueInfoTableModule.html" data-type="entity-link" >TissueInfoTableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TissueInfoTableModule-a6be971f6ccb4fa2a814f7be5dbd9629650605e7122f102951dc543df17af6c0d4f35a7a5e188d4de59ec6a13f71196af5095a99059423dc0eb0e2bdc6ac9dc7"' : 'data-bs-target="#xs-components-links-module-TissueInfoTableModule-a6be971f6ccb4fa2a814f7be5dbd9629650605e7122f102951dc543df17af6c0d4f35a7a5e188d4de59ec6a13f71196af5095a99059423dc0eb0e2bdc6ac9dc7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TissueInfoTableModule-a6be971f6ccb4fa2a814f7be5dbd9629650605e7122f102951dc543df17af6c0d4f35a7a5e188d4de59ec6a13f71196af5095a99059423dc0eb0e2bdc6ac9dc7"' :
                                            'id="xs-components-links-module-TissueInfoTableModule-a6be971f6ccb4fa2a814f7be5dbd9629650605e7122f102951dc543df17af6c0d4f35a7a5e188d4de59ec6a13f71196af5095a99059423dc0eb0e2bdc6ac9dc7"' }>
                                            <li class="link">
                                                <a href="components/TissueInfoTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TissueInfoTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolbarModule.html" data-type="entity-link" >ToolbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ToolbarModule-9d72661d0f04398bdad9af5cb6af60769ec67a927fb90191a20b09d57825a08e3ed4f54c34e2c5c606d7b0e0234464951dc573eb7fd63691602d3804d1c06d62"' : 'data-bs-target="#xs-components-links-module-ToolbarModule-9d72661d0f04398bdad9af5cb6af60769ec67a927fb90191a20b09d57825a08e3ed4f54c34e2c5c606d7b0e0234464951dc573eb7fd63691602d3804d1c06d62"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolbarModule-9d72661d0f04398bdad9af5cb6af60769ec67a927fb90191a20b09d57825a08e3ed4f54c34e2c5c606d7b0e0234464951dc573eb7fd63691602d3804d1c06d62"' :
                                            'id="xs-components-links-module-ToolbarModule-9d72661d0f04398bdad9af5cb6af60769ec67a927fb90191a20b09d57825a08e3ed4f54c34e2c5c606d7b0e0234464951dc573eb7fd63691602d3804d1c06d62"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TwoDimImageModule.html" data-type="entity-link" >TwoDimImageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TwoDimImageModule-1cd465fa89437ac56ae657ad19ab53945263f4c1094d1055c447028d6cc44cca9fbe77a74648101b8619023394b457aef38d44d372938d718d22b179e28d9811"' : 'data-bs-target="#xs-components-links-module-TwoDimImageModule-1cd465fa89437ac56ae657ad19ab53945263f4c1094d1055c447028d6cc44cca9fbe77a74648101b8619023394b457aef38d44d372938d718d22b179e28d9811"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TwoDimImageModule-1cd465fa89437ac56ae657ad19ab53945263f4c1094d1055c447028d6cc44cca9fbe77a74648101b8619023394b457aef38d44d372938d718d22b179e28d9811"' :
                                            'id="xs-components-links-module-TwoDimImageModule-1cd465fa89437ac56ae657ad19ab53945263f4c1094d1055c447028d6cc44cca9fbe77a74648101b8619023394b457aef38d44d372938d718d22b179e28d9811"' }>
                                            <li class="link">
                                                <a href="components/TwoDimImageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoDimImageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UseButtonModule.html" data-type="entity-link" >UseButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UseButtonModule-df6b28e238545850ee9ad82daad5afeda0c3a778722df3b4c28929d21fb189c638a37362720ba9e7e2225f8df7d91fca3b331f4a1a06cd2363c7d7cbbc18e484"' : 'data-bs-target="#xs-components-links-module-UseButtonModule-df6b28e238545850ee9ad82daad5afeda0c3a778722df3b4c28929d21fb189c638a37362720ba9e7e2225f8df7d91fca3b331f4a1a06cd2363c7d7cbbc18e484"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UseButtonModule-df6b28e238545850ee9ad82daad5afeda0c3a778722df3b4c28929d21fb189c638a37362720ba9e7e2225f8df7d91fca3b331f4a1a06cd2363c7d7cbbc18e484"' :
                                            'id="xs-components-links-module-UseButtonModule-df6b28e238545850ee9ad82daad5afeda0c3a778722df3b4c28929d21fb189c638a37362720ba9e7e2225f8df7d91fca3b331f4a1a06cd2363c7d7cbbc18e484"' }>
                                            <li class="link">
                                                <a href="components/UseButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UseButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/YoutubeModelModule.html" data-type="entity-link" >YoutubeModelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-YoutubeModelModule-4800ee2a421fe25b79da28c1ee2405299e6316f15b0a538542180c421353445b55a8538af298fee06c9ec770db90dd9013fc7c7b8a8a6653719ddaa8ef6081ba"' : 'data-bs-target="#xs-components-links-module-YoutubeModelModule-4800ee2a421fe25b79da28c1ee2405299e6316f15b0a538542180c421353445b55a8538af298fee06c9ec770db90dd9013fc7c7b8a8a6653719ddaa8ef6081ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-YoutubeModelModule-4800ee2a421fe25b79da28c1ee2405299e6316f15b0a538542180c421353445b55a8538af298fee06c9ec770db90dd9013fc7c7b8a8a6653719ddaa8ef6081ba"' :
                                            'id="xs-components-links-module-YoutubeModelModule-4800ee2a421fe25b79da28c1ee2405299e6316f15b0a538542180c421353445b55a8538af298fee06c9ec770db90dd9013fc7c7b8a8a6653719ddaa8ef6081ba"' }>
                                            <li class="link">
                                                <a href="components/YoutubeModelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YoutubeModelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                    <a href="injectables/ContentService.html" data-type="entity-link" >ContentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileDownloadService.html" data-type="entity-link" >FileDownloadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableDataService.html" data-type="entity-link" >TableDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TissueInfoResolverService.html" data-type="entity-link" >TissueInfoResolverService</a>
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
                                <a href="interfaces/Announcement.html" data-type="entity-link" >Announcement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BoardMemberItems.html" data-type="entity-link" >BoardMemberItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Button.html" data-type="entity-link" >Button</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardBlock.html" data-type="entity-link" >CardBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardHeader.html" data-type="entity-link" >CardHeader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChooseVersion.html" data-type="entity-link" >ChooseVersion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContactCard.html" data-type="entity-link" >ContactCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CopyClipBoard.html" data-type="entity-link" >CopyClipBoard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountInfoCard.html" data-type="entity-link" >CountInfoCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Download.html" data-type="entity-link" >Download</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExternalButton.html" data-type="entity-link" >ExternalButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtraHeader.html" data-type="entity-link" >ExtraHeader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FtuData.html" data-type="entity-link" >FtuData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FtuVersionData.html" data-type="entity-link" >FtuVersionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderData.html" data-type="entity-link" >HeaderData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageData.html" data-type="entity-link" >ImageData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Links.html" data-type="entity-link" >Links</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LongCard.html" data-type="entity-link" >LongCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavItems.html" data-type="entity-link" >NavItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganData.html" data-type="entity-link" >OrganData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageDataItems.html" data-type="entity-link" >PageDataItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageDef.html" data-type="entity-link" >PageDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageHeaderItems.html" data-type="entity-link" >PageHeaderItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlainButton.html" data-type="entity-link" >PlainButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrizeCard.html" data-type="entity-link" >PrizeCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SectionCardItems.html" data-type="entity-link" >SectionCardItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SliderItems.html" data-type="entity-link" >SliderItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SopLinks.html" data-type="entity-link" >SopLinks</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableData.html" data-type="entity-link" >TableData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableDataWithColumns.html" data-type="entity-link" >TableDataWithColumns</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TileItems.html" data-type="entity-link" >TileItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueData.html" data-type="entity-link" >TissueData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissueTableInfo.html" data-type="entity-link" >TissueTableInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UseButton.html" data-type="entity-link" >UseButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserImage.html" data-type="entity-link" >UserImage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VersionOrgans.html" data-type="entity-link" >VersionOrgans</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Winner.html" data-type="entity-link" >Winner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/YoutubeModel.html" data-type="entity-link" >YoutubeModel</a>
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