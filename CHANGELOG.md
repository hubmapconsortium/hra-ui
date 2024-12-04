# Changelog

Changelog for the Human Reference Atlas (HRA) User Interfaces

## cde-ui@1.0.0

- Update UI to use [@hra-ui/design-system@1.0.0](#hra-uidesign-system100---2024-12-04)
- See [@hra-ui/cde-visualization@1.0.0](#hra-uicde-visualization100---2024-12-04) for changes on the visualization page

### Added

- Added HuBMAP sidenav
- Added the ability for the user to select which columns to use when uploading a custom dataset

## @hra-ui/cde-visualization@1.0.0 - 2024-12-04

- Most changes are due to the migration of [@hra-ui/node-dist-vis@1.0.0](#hra-uinode-dist-vis100---2024-12-04) and the use of [@hra-ui/design-system@1.0.0](#hra-uidesign-system100---2024-12-04)
- Refactored all parts of the app with design system components to align the look and feel with the spec

### Added

- Violin graph

### Changed

- Most action buttons have been moved into menus and submenus

### Known Issues

- In Firefox the selection tool has a noticeable delay between pressing the mouse button and moving the mouse ([#840](https://github.com/hubmapconsortium/hra-ui/issues/840))

## @hra-ui/design-system@1.0.0 - 2024-12-04

- First release of the design system
  - [Figma spec](https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2-841&node-type=canvas&t=7jz5ImmAN4qPxNF1-0)
  - [Storybook](https://cdn.humanatlas.io/ui/storybook/design-system/)

### Added

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

## @hra-ui/node-dist-vis@1.0.0 - 2024-12-04

- Migrated code from [@cns-iu/hra-node-dist-vis](https://github.com/cns-iu/hra-node-dist-vis)
- Migrated code to Angular+TS

### Added

- Add `explore`, `inspect`, and `select` view modes
- All none primitive inputs now accept file urls, file objects, json encoded strings, or raw data as input
- Customize `nodes`, `edges`, and `colorMap` loading using the `nodeKeys`, `edgeKeys`, and `colorMapKeys` inputs, respectively
- `colorMap` colors can now specify any css color value in addition to json encoded rgb tuples
- Add advanced filtering with the `nodeFilter` input
- Add `colorMap` and `nodeSelectionChange` output events
- Add `resetOrbit()` method
- Add `clearSelection()` method
- Add `toBlob(type?, quality?)` method

### Changed

- **Breaking:** Default column names for `nodes`, `edges`, and `colorMap` have changed
- **Breaking:** Events `nodeClicked` and `nodeHovering` have been renamed to `nodeClick` and `nodeHover`, respectively
- **Breaking:** Data emitted by `nodeClick` and `nodeHover` have changed to a `NodeEvent` object

### Removed

- **Breaking:** Drop support of legacy edge format
- **Breaking:** Drop `toDataUrl()` method. Use `toBlob()` instead

### Deprecated

- The following inputs have been deprecated:
  - `nodeTargetKey` and `nodeTargetValue`. Use `nodeKeys` and `nodeTargetSelector` instead
  - `colorMapKey` and `colorMapValue`. Use `colorMapKeys` instead
  - `selection`. Use `nodeFilter` instead

## 0.5.0 - 2023-12-15

### Added in 0.5.0

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

## 0.1.0 - 2023-08-09

### Added in 0.1.0

- Sprint 1 release of the FTU-UI
- Setup the base project scaffolding
- Added visual representation of the Functional Tissue Unit (FTU) for various FTUs
- Added biomarker table to display cell types and cell counts
- Added download options for different file formats
