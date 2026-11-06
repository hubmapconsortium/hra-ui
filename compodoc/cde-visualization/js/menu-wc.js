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
                    <a href="index.html" data-type="index-link">Code Documentation for cde-visualization</a>
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
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link" >AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CdeVisualizationComponent.html" data-type="entity-link" >CdeVisualizationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CellTypesComponent.html" data-type="entity-link" >CellTypesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChartSkeletonComponent.html" data-type="entity-link" >ChartSkeletonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorPickerComponent.html" data-type="entity-link" >ColorPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorPickerLabelComponent.html" data-type="entity-link" >ColorPickerLabelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DownloadFileComponent.html" data-type="entity-link" >DownloadFileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DownloadsComponent.html" data-type="entity-link" >DownloadsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmptyStateComponent.html" data-type="entity-link" >EmptyStateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HistogramComponent.html" data-type="entity-link" >HistogramComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataComponent.html" data-type="entity-link" >MetadataComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NodeDistVisualizationComponent.html" data-type="entity-link" >NodeDistVisualizationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NodeDistVisualizationControlsComponent.html" data-type="entity-link" >NodeDistVisualizationControlsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NodeDistVisualizationMenuComponent.html" data-type="entity-link" >NodeDistVisualizationMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SkeletonComponent.html" data-type="entity-link" >SkeletonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToolbarComponent.html" data-type="entity-link" >ToolbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViolinComponent.html" data-type="entity-link" >ViolinComponent</a>
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
                                    <a href="injectables/ColorMapFileLoaderService.html" data-type="entity-link" >ColorMapFileLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileSaverService.html" data-type="entity-link" >FileSaverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeSwitchService.html" data-type="entity-link" >ThemeSwitchService</a>
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
                                <a href="interfaces/AboutContent.html" data-type="entity-link" >AboutContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AboutListContent.html" data-type="entity-link" >AboutListContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AboutSectionContent.html" data-type="entity-link" >AboutSectionContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CellTypeEntry.html" data-type="entity-link" >CellTypeEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartFont.html" data-type="entity-link" >ChartFont</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartTextConfig.html" data-type="entity-link" >ChartTextConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartTheme.html" data-type="entity-link" >ChartTheme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartTitleConfig.html" data-type="entity-link" >ChartTitleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorMapEntry.html" data-type="entity-link" >ColorMapEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DistanceEntry.html" data-type="entity-link" >DistanceEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadFileContent.html" data-type="entity-link" >DownloadFileContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadFormatContent.html" data-type="entity-link" >DownloadFormatContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadGroupContent.html" data-type="entity-link" >DownloadGroupContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadLinkContent.html" data-type="entity-link" >DownloadLinkContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadNoticeContent.html" data-type="entity-link" >DownloadNoticeContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadRequest.html" data-type="entity-link" >DownloadRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadsContent.html" data-type="entity-link" >DownloadsContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmptyStateContent.html" data-type="entity-link" >EmptyStateContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Metadata.html" data-type="entity-link" >Metadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModifiableHistogramSpec.html" data-type="entity-link" >ModifiableHistogramSpec</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModifiableViolinSpec.html" data-type="entity-link" >ModifiableViolinSpec</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SampleMetadataExtra.html" data-type="entity-link" >SampleMetadataExtra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemeableChartSpec.html" data-type="entity-link" >ThemeableChartSpec</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolbarContent.html" data-type="entity-link" >ToolbarContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolbarHelpLink.html" data-type="entity-link" >ToolbarHelpLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolbarItemContent.html" data-type="entity-link" >ToolbarItemContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolbarMenuItemContent.html" data-type="entity-link" >ToolbarMenuItemContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolbarPanelOption.html" data-type="entity-link" >ToolbarPanelOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToolbarThemeOption.html" data-type="entity-link" >ToolbarThemeOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnavailableDownloads.html" data-type="entity-link" >UnavailableDownloads</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnavailableDownloadsContent.html" data-type="entity-link" >UnavailableDownloadsContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateColorData.html" data-type="entity-link" >UpdateColorData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewModeOption.html" data-type="entity-link" >ViewModeOption</a>
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
                                    <a href="pipes/DefaultToPipe.html" data-type="entity-link" >DefaultToPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/WithoutProtocolPipe.html" data-type="entity-link" >WithoutProtocolPipe</a>
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