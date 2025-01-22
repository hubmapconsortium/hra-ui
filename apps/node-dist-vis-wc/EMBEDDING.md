# Embedding _Node Distance Visualization_

## Basic Usage

The following code snippet can be used to get started with the _Node Distance Visualization_.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>Node Distance Visualization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <script src="https://cdn.humanatlas.io/ui/node-dist-vis-wc/wc.js" type="module"></script>
  </head>
  <body>
    <hra-node-dist-vis id="vis" nodes="https://..." edges="https://..."> </hra-node-dist-vis>
  </body>
</html>
```

## Inputs

The _Node Distance Visualization_ has many inputs in different formats. Each input can be set using either HTML attributes:

```html
<hra-node-dist-vis nodes="https://..." color-map='{"t-cell": "blue"}'> </hra-node-dist-vis>
```

or through javascript:

```js
const vis = document.getElementById('vis');
vis.nodes = 'https://...';
// Note that inputs use camelCase in javascript instead of kebab-case
vis.colorMap = {
  't-cell': 'blue',
};
```

### Available inputs

| Attribute name         | Description                                        | Data format                           | Default       |
| ---------------------- | -------------------------------------------------- | ------------------------------------- | ------------- |
| _mode_                 | [Interaction mode](#mode)                          | `explore`, `inspect`, or `select`     | `explore`     |
| _nodes_                | Node data for each cell                            | A csv file url or an array of objects | None          |
| _node-keys_            | Nodes csv column configuration                     | A json file url or a mapping object   | None          |
| _node-target-selector_ | Value to determine whether a node is an anchor     | A string                              | `Endothelial` |
| _node-target-key_      | **Deprecated**: Use _node-keys_ instead            | A string                              | None          |
| _node-target-value_    | **Deprecated**: Use _node-target-selector_ instead | A string                              | None          |
| _edges_                | Edge data for connections between cells            | A csv file url or an array of objects | None          |
| _edge-keys_            | Edges csv column configuration                     | A json file url or a mapping object   | None          |
| _edges-disabled_       | Disable the display of edges                       | A boolean                             | `false`       |
| _max-edge-distance_    | Maximum length of edges when auto generated        | A positive number                     | `1000`        |
| _color-map_            | Custom color map                                   | A csv file url or an array of objects | None          |
| _color-map-keys_       | Color map csv column configuration                 | A json file url or a mapping object   | None          |
| _color-map-key_        | **Deprecated**: Use _color-map-keys_ instead       | A string                              | None          |
| _color-map-value_      | **Deprecated**: Use _color-map-keys_ instead       | A string                              | None          |
| _node-filter_          | Filter nodes by index and/or type                  | A json file url or a filter object    | None          |
| _selection_            | **Deprecated**: Use _node-filter_ instead          | An array of strings                   | None          |

### Mode

Mode controls both the look and feel of the visualization as well as the interactions available to the user.
There are currently 3 modes to choose from:

- #### explore (default mode)

  In this mode the visualization can be zoomed, panned, and rotated freely by the user.

- #### inspect

  This mode has the same interactions as the explore mode.
  The difference is that each node is made larger to make it easier to hover or click on individual nodes.

- #### select
  In this mode rotations are disabled.
  Instead the user is able to select one or more nodes by drawing a lasso around the nodes they wish to select.

### Nodes, edges, and color maps

The `nodes`, `edges`, and `color-map` inputs all accept an url to a csv file from which to load their data, i.e.

```html
<hra-node-dist-vis nodes="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-nodes.csv"> </hra-node-dist-vis>
```

They also accept data encoded directly in the html attribute as json, although this is less useful for larger datasets.

```html
<hra-node-dist-vis nodes='[{"Cell Type": "Endothelial", X: 100, Y: 200 }]'> </hra-node-dist-vis>
```

Alternatively the data can be set from javascript.

```js
vis.nodes = [{ 'Cell Type': 'Endothelial', X: 100, Y: 200 }];
```

<br />

`nodes`, `edges`, and `color-map` automatically tries to infer which columns to use from the data. However if further customization is required, for example when the data does not use the standard column names, it can be done by setting `node-keys`, `edge-keys`, and `color-map-keys` respectively.  
To customize the columns used provide an object mapping the each old column name to the new column name, i.e.

```html
<!-- Json encoded when provided as an html attribute! -->
<hra-node-dist-vis nodes-keys='{"Cell Type": "Other Column"}'> </hra-node-dist-vis>
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

### Node filtering

Nodes can be filtered by both inclusion and exclusion based on individual node indices or node types. Ex:

```js
vis.nodeFilter = {
  // Include nodes with type 't-cell' and the node at index 1000
  include: ['t-cell', 1000],
  // Exclude nodes at index 100 and 101
  exclude: [100, 101],
};
```

Note that setting `include` to an empty array will cause the visualization to become empty.
Instead either exclude the `include` property or set it to `undefined`, i.e.

```js
vis.nodeFilter = {
  // No include property
  exclude: [...]
}

// Or

vis.nodeFilter = {
  // Set to undefined
  include: undefined
  exclude: [...]
}
```

## Outputs

Outputs can be listened to using javascript.

```js
vis.addEventListener('nodeClick', (event) => {
  console.log('Node clicked: ', event.detail);
});
```

_Node Distance Visualization_ fires the following events:

| Event name          | Description                                                  | Data format              |
| ------------------- | ------------------------------------------------------------ | ------------------------ |
| nodes               | Fired when the nodes have been loaded into the component     | An array of data objects |
| edges               | Fired when the edges have been loaded into the component     | An array of data objects |
| colorMap            | Fired when the color map have been loaded into the component | An array of data objects |
| nodeClick           | Fired when the user clicks on a node                         | `NodeEvent`              |
| nodeHover           | Fired when the user hovers over a node                       | `NodeEvent`              |
| nodeSelectionChange | Fired when the user selects one or more nodes                | Array of `NodeEvent`     |

A `NodeEvent` is a plain object with the following properties:

| Property name | Description                                   | Data format        |
| ------------- | --------------------------------------------- | ------------------ |
| _index_       | Row index of the item                         | A positive integer |
| _clientX_     | Pointer X coordinate relative to the viewport | Number             |
| _clientY_     | Pointer Y coordinate relative to the viewport | Number             |
| _object_      | The associated data for the node              | Object             |

## Full example

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>Node Distance Visualization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <script src="https://cdn.humanatlas.io/ui/node-dist-vis-wc/wc.js" type="module"></script>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        const vis = document.querySelector('#vis');

        // Listen to events
        vis.addEventListener('nodeClick', (event) => {
          console.log('Node clicked: ', event.detail);
        });
      });
    </script>
    <style>
      /* Node distance visualization fills its container so make sure the container has its width and height set */
      body {
        width: 100vw;
        height: 100vh;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <hra-node-dist-vis id="vis" nodes="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-nodes.csv" edges="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-edges.csv"> </hra-node-dist-vis>
  </body>
</html>
```
