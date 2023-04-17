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
                    <a href="index.html" data-type="index-link">cdk</a>
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
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DestroyHostComponent.html" data-type="entity-link" >DestroyHostComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/HoverDirective.html" data-type="entity-link" >HoverDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/LinkDirective.html" data-type="entity-link" >LinkDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Add.html" data-type="entity-link" >Add</a>
                            </li>
                            <li class="link">
                                <a href="classes/Add-1.html" data-type="entity-link" >Add</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddFromYaml.html" data-type="entity-link" >AddFromYaml</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddFromYaml-1.html" data-type="entity-link" >AddFromYaml</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddMany.html" data-type="entity-link" >AddMany</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddMany-1.html" data-type="entity-link" >AddMany</a>
                            </li>
                            <li class="link">
                                <a href="classes/Clear.html" data-type="entity-link" >Clear</a>
                            </li>
                            <li class="link">
                                <a href="classes/Delete.html" data-type="entity-link" >Delete</a>
                            </li>
                            <li class="link">
                                <a href="classes/LinkRegistrySelectors.html" data-type="entity-link" >LinkRegistrySelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadFromYaml.html" data-type="entity-link" >LoadFromYaml</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadFromYaml-1.html" data-type="entity-link" >LoadFromYaml</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadMarkdown.html" data-type="entity-link" >LoadMarkdown</a>
                            </li>
                            <li class="link">
                                <a href="classes/Navigate.html" data-type="entity-link" >Navigate</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResourceRegistrySelectors.html" data-type="entity-link" >ResourceRegistrySelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScopedDestructorSubject.html" data-type="entity-link" >ScopedDestructorSubject</a>
                            </li>
                            <li class="link">
                                <a href="classes/Set.html" data-type="entity-link" >Set</a>
                            </li>
                            <li class="link">
                                <a href="classes/SnapshotObserver.html" data-type="entity-link" >SnapshotObserver</a>
                            </li>
                            <li class="link">
                                <a href="classes/StorageSelectors.html" data-type="entity-link" >StorageSelectors</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LinkRegistryState.html" data-type="entity-link" >LinkRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceRegistryState.html" data-type="entity-link" >ResourceRegistryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageState.html" data-type="entity-link" >StorageState</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionConstructor.html" data-type="entity-link" >ActionConstructor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DestructorScope.html" data-type="entity-link" >DestructorScope</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HoverContext.html" data-type="entity-link" >HoverContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectOptions.html" data-type="entity-link" >SelectOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});