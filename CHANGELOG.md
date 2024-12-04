# Changelog

Changelog for the Human Reference Atlas (HRA) User Interfaces

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
