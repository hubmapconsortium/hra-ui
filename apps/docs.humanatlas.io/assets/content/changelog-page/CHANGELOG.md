# Changelog

Changelog for the Human Reference Atlas (HRA) User Interfaces

## Table of Contents

### Apps

- [@hra-ui/asctb-reporter](#hra-uiasctb-reporter)
- [@hra-ui/body-ui](#hra-uibody-ui)
- [@hra-ui/ccf-eui](#hra-uiccf-eui)
- [@hra-ui/ccf-organ-info](#hra-uiccf-organ-info)
- [@hra-ui/ccf-rui](#hra-uiccf-rui)
- [@hra-ui/cde-ui](#hra-uicde-ui)
- [@hra-ui/dashboard-ui](#hra-uidashboard-ui)
- [@hra-ui/ftu-ui](#hra-uiftu-ui)
- [@hra-ui/humanatlas.io](#hra-uihumanatlasio)
- [@hra-ui/medical-illustration](#hra-uimedical-illustration)

### Libraries

- [@hra-ui/ccf-body-ui](#hra-uiccf-body-ui)
- [@hra-ui/ccf-scene-utils](#hra-uiccf-scene-utils)
- [@hra-ui/ccf-shared](#hra-uiccf-shared)
- [@hra-ui/cde-visualization](#hra-uicde-visualization)
- [@hra-ui/cdk](#hra-uicdk)
- [@hra-ui/common](#hra-uicommon)
- [@hra-ui/components/atoms](#hra-uicomponentsatoms)
- [@hra-ui/components/behavioral](#hra-uicomponentsbehavioral)
- [@hra-ui/components/molecules](#hra-uicomponentsmolecules)
- [@hra-ui/components/organisms](#hra-uicomponentsorganisms)
- [@hra-ui/dashboard](#hra-uidashboard)
- [@hra-ui/design-system](#hra-uidesign-system)
- [@hra-ui/node-dist-vis](#hra-uinode-dist-vis)
- [@hra-ui/services](#hra-uiservices)
- [@hra-ui/state](#hra-uistate)
- [@hra-ui/theming](#hra-uitheming)
- [@hra-ui/utils](#hra-uiutils)
- [@hra-ui/webcomponents](#hra-uiwebcomponents)

# Apps

## @hra-ui/asctb-reporter

### 3.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-asct-reporter](https://github.com/hubmapconsortium/ccf-asct-reporter/)

### 2.7.0 and earlier

- See [changelog](https://github.com/hubmapconsortium/ccf-asct-reporter/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/body-ui

### 4.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-ui](https://github.com/hubmapconsortium/ccf-ui)

### 3.9.0 and earlier

- See [changelog](https://github.com/hubmapconsortium/ccf-ui/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/ccf-eui

### 4.1.0 - 2024-12-13

- Update to support HRA v2.2 (8th Release)

### 4.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-ui](https://github.com/hubmapconsortium/ccf-ui)

### 3.9.0 and earlier

- See [changelog](https://github.com/hubmapconsortium/ccf-ui/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/ccf-organ-info

### 4.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-ui](https://github.com/hubmapconsortium/ccf-ui)

### 3.9.0 and earlier

- See [changelog](https://github.com/hubmapconsortium/ccf-ui/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/ccf-rui

### 4.2.0 - 2025-02-21

- Add the ability to set `consortium` programmatically. Previously it could only be set and updated in the UI.
- Css styles are now scoped to the application to prevent them from interfering with the embedding environment's styles.

### 4.1.0 - 2024-12-13

- Updated UI to use [@hra-ui/design-system@1.0.0](#hra-uidesign-system)

#### Added

- Additional metadata can now be specified during registration. The following fields are available:
  - Email
  - Consortium
  - Publication DOI

### 4.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-ui](https://github.com/hubmapconsortium/ccf-ui)

### 3.9.0 and earlier

- See [changelog](https://github.com/hubmapconsortium/ccf-ui/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/dashboard-ui

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/cde-ui

### 1.0.0 - 2024-12-04

- Update UI to use [@hra-ui/design-system@1.0.0](#hra-uidesign-system)
- See [@hra-ui/cde-visualization@1.0.0](#hra-uicde-visualization) for changes on the visualization page

#### Added

- Added HuBMAP sidenav
- Added the ability for the user to select which columns to use when uploading a custom dataset

## @hra-ui/ftu-ui

### 0.5.0 - 2023-12-15

#### Added

- Added/updated illustration files
- Updated cell segmentation and labeling in illustrations
- Added gene biomarker data for the following illustrations:
  - loop of Henle ascending limb thin segment
  - cortical collecting duct
  - nephron
  - renal corpuscle
  - liver lobule
  - bronchus submucosal gland
  - alveolus of lung
- Enabled highlighting of cell types when hovering over gene biomarker table and illustration
- Various UI and styling improvements to better match specification
- Added keyboard navigation for tissue list
- Added base href support for all web components
- Improved Google Analytics tracking/telemetry
- Bug fixes

### 0.1.0 - 2023-08-09

#### Added

- Sprint 1 release of the FTU-UI
- Setup the base project scaffolding
- Added visual representation of the Functional Tissue Unit (FTU) for various FTUs
- Added biomarker table to display cell types and cell counts
- Added download options for different file formats

## @hra-ui/humanatlas.io

### 2.0.0 - 2024-12-04

- Finished migration from [cns-iu/humanatlas.io](https://github.com/cns-iu/humanatlas.io)

### 1.5.0 and earlier

- See [changelog](https://github.com/cns-iu/humanatlas.io/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/medical-illustration

### 1.0.0 - 2024-12-04

- Initial release

# Libraries

## @hra-ui/ccf-body-ui

### 4.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-ui](https://github.com/hubmapconsortium/ccf-ui)

### 3.9.0 and earlier

- See [changelog](https://github.com/hubmapconsortium/ccf-ui/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/ccf-scene-utils

### 4.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-ui](https://github.com/hubmapconsortium/ccf-ui)

### 3.9.0 and earlier

- Contains the scene utility functions previously part of [ccf-database](https://github.com/hubmapconsortium/ccf-ui/tree/main/projects/ccf-database)
- See [changelog](https://github.com/hubmapconsortium/ccf-ui/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/ccf-shared

### 4.0.0 - 2024-12-04

- Finished migration from [hubmapconsortium/ccf-ui](https://github.com/hubmapconsortium/ccf-ui)

### 3.9.0 and earlier

- See [changelog](https://github.com/hubmapconsortium/ccf-ui/blob/main/CHANGELOG.md) in previous reporitory

## @hra-ui/cde-visualization

### 1.0.0 - 2024-12-04

- Most changes are due to the migration of [@hra-ui/node-dist-vis@1.0.0](#hra-uinode-dist-vis) and the use of [@hra-ui/design-system@1.0.0](#hra-uidesign-system)
- Refactored all parts of the app with design system components to align the look and feel with the spec

#### Added

- Violin graph

#### Changed

- Most action buttons have been moved into menus and submenus

#### Known Issues

- In Firefox the selection tool has a noticeable delay between pressing the mouse button and moving the mouse ([#840](https://github.com/hubmapconsortium/hra-ui/issues/840))

## @hra-ui/cdk

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/common

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/components/atoms

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/components/behavioral

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/components/molecules

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/components/organisms

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/dashboard

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/design-system

### 1.0.0 - 2024-12-04

- First release of the design system
  - [Figma spec](https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2-841&node-type=canvas&t=7jz5ImmAN4qPxNF1-0)
  - [Storybook](https://cdn.humanatlas.io/ui/storybook/design-system/)

#### Added

- Configured fonts and colors to align with the spec
- Added the following design components and directives:
  - `apps-card`
  - `brand-logo`
  - `brandmark`
  - `breadcrumbs`
  - `color-picker`
  - `delete-file-button`
  - `dialog`
  - `error-indicator`
  - `expansion-panel`
  - `footer`
  - `fullscreen`
  - `info-modal`
  - `micro-tooltip`
  - `nav-header` and `nav-header-butons`
  - `product-logo`
  - `scrolling`
  - `snackbar`
  - `social-media-button`
  - `software-status-indicator`
  - `step-indicator`
  - `tooltip-card`
  - `workflow-card`
- Styled the following angular material components to align with the spec:
  - Buttons
  - Button toggles
  - Dividers
  - Icon buttons
  - Inputs
  - Menus
  - Select inputs
  - Tables
  - Trees

## @hra-ui/node-dist-vis

### 1.0.0 - 2024-12-04

- Migrated code from [@cns-iu/hra-node-dist-vis](https://github.com/cns-iu/hra-node-dist-vis)
- Migrated code to Angular+TS

#### Added

- Add `explore`, `inspect`, and `select` view modes
- All none primitive inputs now accept file urls, file objects, json encoded strings, or raw data as input
- Customize `nodes`, `edges`, and `colorMap` loading using the `nodeKeys`, `edgeKeys`, and `colorMapKeys` inputs, respectively
- `colorMap` colors can now specify any css color value in addition to json encoded rgb tuples
- Add advanced filtering with the `nodeFilter` input
- Add `colorMap` and `nodeSelectionChange` output events
- Add `resetOrbit()` method
- Add `clearSelection()` method
- Add `toBlob(type?, quality?)` method

#### Changed

- **Breaking:** Default column names for `nodes`, `edges`, and `colorMap` have changed
- **Breaking:** Events `nodeClicked` and `nodeHovering` have been renamed to `nodeClick` and `nodeHover`, respectively
- **Breaking:** Data emitted by `nodeClick` and `nodeHover` have changed to a `NodeEvent` object

#### Removed

- **Breaking:** Drop support of legacy edge format
- **Breaking:** Drop `toDataUrl()` method. Use `toBlob()` instead

#### Deprecated

- The following inputs have been deprecated:
  - `nodeTargetKey` and `nodeTargetValue`. Use `nodeKeys` and `nodeTargetSelector` instead
  - `colorMapKey` and `colorMapValue`. Use `colorMapKeys` instead
  - `selection`. Use `nodeFilter` instead

## @hra-ui/services

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/state

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/theming

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/utils

### 1.0.0 - 2024-12-04

- Initial release

## @hra-ui/webcomponents

### 1.0.0 - 2024-12-04

- Initial release
