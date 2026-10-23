# Embedding _Cell Distance Explorer (CDE)_

## Basic Usage

The following code snippet can be used to get started with the _CDE_.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>CDE Visualization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <link href="https://cdn.humanatlas.io/ui/cde-visualization-wc/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/cde-visualization-wc/wc.js" type="module"></script>
  </head>
  <body>
    <cde-visualization id="cde" nodes="https://..."></cde-visualization>
  </body>
</html>
```

## Inputs

The _CDE_ has many inputs in different formats. Each input can be set using either HTML attributes:

```html
<cde-visualization nodes="https://..." color-map='{"t-cell": "blue"}'> </cde-visualization>
```

or through javascript:

```js
const cde = document.getElementById('cde');
cde.nodes = 'https://...';
// Note that inputs use camelCase in javascript instead of kebab-case
cde.colorMap = {
  't-cell': 'blue',
};
```

### Available inputs

| Attribute name         | Description                                    | Data format                           | Default       |
| ---------------------- | ---------------------------------------------- | ------------------------------------- | ------------- |
| _home-link_            | Url visited when the _CDE_ icon is clicked     | An url                                | `/`           |
| _nodes_                | Node data for each cell                        | A csv file url or an array of objects | None          |
| _node-keys_            | Nodes csv column configuration                 | A json file url or a mapping object   | None          |
| _node-target-selector_ | Value to determine whether a node is an anchor | A string                              | `Endothelial` |
| _edges_                | Edge data for connections between cells        | A csv file url or an array of objects | None          |
| _edge-keys_            | Edges csv column configuration                 | A json file url or a mapping object   | None          |
| _max-edge-distance_    | Maximum length of edges when auto generated    | A positive number                     | `1000`        |
| _color-map_            | Custom color map                               | A csv file url or an array of objects | None          |
| _color-map-keys_       | Color map csv column configuration             | A json file url or a mapping object   | None          |
| _metadata_             | Metadata object                                | An object                             | None          |
| _title_                | Dataset title                                  | A string                              | None          |
| _organ_                | Dataset organ                                  | A string                              | None          |
| _technology_           | Dataset imaging technology                     | A string                              | None          |
| _sex_                  | Dataset donor sex                              | A string                              | None          |
| _age_                  | Dataset donor age                              | A positive number                     | None          |
| _thickness_            | Thickness of dataset section in micrometers    | A positive number                     | None          |
| _pixel-size_           | Ratio of micrometers per pixel in the dataset  | A positive number                     | None          |
| _creation-timestamp_   | The number of milliseconds since 1/1/1970 UTC  | A positive integer                    | None          |
| _source-file-name_     | Dataset nodes file name                        | A string                              | None          |
| _color-map-file-name_  | Dataset color map file name                    | A string                              | None          |

### Nodes, edges, and color maps

The `nodes`, `edges`, and `color-map` inputs all accept an url to a csv file from which to load their data, i.e.

```html
<cde-visualization nodes="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-nodes.csv"> </cde-visualization>
```

They also accept data encoded directly in the html attribute as json, although this is less useful for larger datasets.

```html
<cde-visualization nodes='[{"Cell Type": "Endothelial", X: 100, Y: 200 }]'> </cde-visualization>
```

Alternatively the data can be set from javascript.

```js
cde.nodes = [{ 'Cell Type': 'Endothelial', X: 100, Y: 200 }];
```

<br />

`nodes`, `edges`, and `color-map` automatically tries to infer which columns to use from the data. However if further customization is required, for example when the data does not use the standard column names, it can be done by setting `node-keys`, `edge-keys`, and `color-map-keys` respectively.  
To customize the columns used provide an object mapping the each old column name to the new column name, i.e.

```html
<!-- Json encoded when provided as an html attribute! -->
<cde-visualization nodes-keys='{"Cell Type": "Other Column"}'> </cde-visualization>
```

Any columns not specified will be inferred as usual. The default column names and whether the column is required is summarized in the tables below.

#### Node keys

| Column name      | Description                     | Data format             | Required |
| ---------------- | ------------------------------- | ----------------------- | -------- |
| Cell Type        | Cell type name                  | String                  | Yes      |
| Cell Ontology ID | Ontology term for the cell type | _CURIE_ or _URI_ string | No       |
| X                | X-axis position                 | Number                  | Yes      |
| Y                | Y-axis position                 | Number                  | Yes      |
| Z                | Z-axis position                 | Number                  | No       |

#### Edge keys

| Column name | Description                                                      | Data format      | Required |
| ----------- | ---------------------------------------------------------------- | ---------------- | -------- |
| Cell ID     | Source node row index counting from 0 (not including the header) | Positive integer | Yes      |
| Target ID   | Target node row index counting from 0 (not including the header) | Positive integer | Yes      |
| X1          | Source X-axis position                                           | Number           | Yes      |
| Y1          | Source Y-axis position                                           | Number           | Yes      |
| Z1          | Source Z-axis position                                           | Number           | Yes      |
| X2          | Target X-axis position                                           | Number           | Yes      |
| Y2          | Target Y-axis position                                           | Number           | Yes      |
| Z2          | Target Z-axis position                                           | Number           | Yes      |

#### Color map keys

| Column name | Description                                  | Data format                                       | Required |
| ----------- | -------------------------------------------- | ------------------------------------------------- | -------- |
| Cell Type   | Cell type name                               | String                                            | Yes      |
| Cell Color  | Color of cells with the associated type name | Css color, ex. `red`, `#00ffff`, `rgb(255 0 100)` | Yes      |

### Metadata

Metadata can be set either as an object or as individual metadata attributes. Using an object is particularly useful when setting the metadata from javascript or a json file url. If both an metadata object and individual attributes are set at the same time the value from the attributes takes priority. The available metadata attributes are described the [inputs table](#available-inputs).

## Outputs

Outputs can be listened to using javascript.

```js
cde.addEventListener('nodeClick', (event) => {
  console.log('Node clicked: ', event.detail);
});
```

_CDE_ fires the following events:

| Event name | Description                                                      | Data format              |
| ---------- | ---------------------------------------------------------------- | ------------------------ |
| nodes      | Fired when the nodes have been loaded into the component         | An array of data objects |
| edges      | Fired when the edges have been loaded into the component         | An array of data objects |
| colorMap   | Fired when the color map have been loaded into the component     | An array of data objects |
| nodeClick  | Fired when the user clicks on a node in the main visualization   | `NodeEvent`              |
| nodeHover  | Fired when the user hovers over a node in the main visualization | `NodeEvent`              |

A `NodeEvent` is a plain object with the following properties:

| Property name | Description                                   | Data format        |
| ------------- | --------------------------------------------- | ------------------ |
| _index_       | Row index of the item                         | A positive integer |
| _clientX_     | Pointer X coordinate relative to the viewport | Number             |
| _clientY_     | Pointer Y coordinate relative to the viewport | Number             |
| _object_      | The associated data for the node              | Object             |

## Theming

The _CDE_ uses the HRA theme by default. Its colors, typography, and shapes come from Angular Material's system tokens (`--mat-sys-*` CSS custom properties), so you can restyle it by overriding those tokens.

Set your overrides on `.hra-app` in a stylesheet loaded after `styles.css`. The `cde-visualization` element and the overlay that holds its menus and tooltips both have this class, so the overrides reach both.

```html
<link href="https://cdn.humanatlas.io/ui/cde-visualization-wc/styles.css" rel="stylesheet" />
<style>
  .hra-app {
    --mat-sys-primary: #0b57d0;
    --mat-sys-on-primary: #ffffff;
    --mat-sys-surface-container-low: #f4f6fa;
  }
</style>
```

If your site is built with Angular Material, you can generate a complete set of tokens instead:

```scss
@use '@angular/material' as mat;

.hra-app {
  @include mat.theme(
    (
      color: mat.$azure-palette,
      typography: Inter,
    )
  );
}
```

Typography tokens come as a shorthand (for example `--mat-sys-label-medium`) and its parts (`--mat-sys-label-medium-font`, `-size`, `-weight`, `-line-height`, and `-tracking`). Override both. The default theme's fonts, Metropolis and Nunito Sans, are included in `styles.css`; load any other fonts yourself.

### Light and dark

Each default color token holds a light and a dark value, and the _CDE_ follows the page's [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme). It stays light unless the page opts in:

```css
/* Follow the system setting */
html {
  color-scheme: light dark;
}

/* Or always use dark colors */
html {
  color-scheme: dark;
}
```

A color override with a single value applies to both. To set each, use `light-dark()`, for example `--mat-sys-primary: light-dark(#0b57d0, #a8c7fa);`.

### Charts

The histogram and violin charts read these tokens, and update their colors when the system setting or the `color-scheme` of the `html` element changes:

| Token                             | Used for                                                                 |
| --------------------------------- | ------------------------------------------------------------------------ |
| `--mat-sys-surface-container-low` | Chart background                                                         |
| `--mat-sys-on-surface`            | Titles, violin outlines and box plots, and the default "All cells" color |
| `--mat-sys-on-surface-variant`    | Axis and cell type labels                                                |
| `--mat-sys-outline-variant`       | Grid lines                                                               |
| `--mat-sys-body-small`            | All chart text: font family, size, weight, and line height               |

The cell visualization keeps its black background. Set cell colors with the `color-map` input.

## Full example

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>CDE Visualization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <link href="https://cdn.humanatlas.io/ui/cde-visualization-wc/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/cde-visualization-wc/wc.js" type="module"></script>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        const cde = document.querySelector('#cde');

        // Set data from javascript
        cde.metadata = {
          title: 'colon-cycif-sorgerlab / CRC01002',
          organ: 'Large Intestine',
          technology: 'CyCIF',
          thickness: 5,
          pixelSize: 0.65,
          creationTimestamp: 1710399803000,
          sourceFileName: '2D Large Intestine Sample',
        };

        // Listen to events
        cde.addEventListener('nodeClick', (event) => {
          console.log('Node clicked: ', event.detail);
        });
      });
    </script>
  </head>
  <body>
    <cde-visualization id="cde" nodes="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-nodes.csv" edges="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-edges.csv"> </cde-visualization>
  </body>
</html>
```
