# Embedding Instructions

## Code

To embed _cde-visualization-wc_ the following code snippet should be used:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CDE Visualization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <link href="https://cdn.humanatlas.io/ui/cde-visualization-wc/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/cde-visualization-wc/main.js" type="module"></script>
  </head>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const cde = document.getElementById('cde');
    });
  </script>
  <body>
    <cde-visualization id="cde"></cde-visualization>
  </body>
</html>
```

## Configuration

_cde-visualization-wc_ can be customized in the following ways:

```js
window.addEventListener('DOMContentLoaded', () => {
  const cde = document.getElementById('cde');

  cde.homeLink = 'https://.....';
  cde.nodes = 'https://.....';
  cde.nodeTargetKey = 'Cell Type';
  cde.nodeTargetValue = 'Target Cell Type';
  cde.edges = 'https://.....';
  cde.maxEdgeDistance = 1000;
  cde.colorMap = 'https://.....';
  cde.colorMapKey = 'cell_type';
  cde.colorMapValueKey = 'cell_color';

  // Metadata object, most values can also be set at the top level
  cde.metadata = {
    sourceData: 'Source Data Filename',
    colorMap: 'Color Map Filename'
    title: 'Title',
    organ: 'Organ Name',
    technology: 'Technology',
    sex: 'Male',
    age: 30,
    thickness: 10,
    pixelSize: 5,
    creationTimestamp: 0,
  };

  // Individual metadata attributes
  cde.title = 'Title';
  cde.organ = 'Organ Name';
  cde.technology = 'Technology';
  cde.sex = 'Male';
  cde.age = 30;
  cde.thickness = 10;
  cde.pixelSize: 5;
  cde.creationTimestamp = 0;

  cde.addEventListener('nodeClick', (event) => console.log('Node click on ', event.detail));
  cde.addEventListener('nodeHover', (event) => console.log('Node hover on ', event?.detail));
  cde.addEventListener('edges', (event) => console.log('Edges ', event));
  cde.addEventListener('colorMap', (event) => console.log('Color map ', event));
});
```

The following format of configuration only works with certain data types, namely strings and booleans.
(Note that variables are kebab-case, not camel-case)

```html
<cde-visualization id="cde" home-link="https://....." nodes="https://....." node-target-key="Cell Type" node-target-value="Target Cell Type" edges="https://....." color-map="https://....." color-map-key="cell_type" color-map-value-key="cell_color" title="Title" organ="Organ Name" technology="Technology" sex="Male"> </cde-visualization>
```

Full CDE-VISUALIZATION-WC Example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CDE Visualization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <link href="https://cdn.humanatlas.io/ui/cde-visualization-wc/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/cde-visualization-wc/main.js" type="module"></script>
  </head>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const cde = document.getElementById('cde');
      cde.maxEdgeDistance = 1000;
      cde.metadata = {
        sourceData: 'CRC01002-nodes.csv',
        title: 'colon-cycif-sorgerlab / CRC01002 (483,936 cells)',
        organ: 'Colon',
        sex: 'Male',
        age: 30,
        thickness: 10,
        pixelSize: 5,
      };
      cde.addEventListener('nodeClick', (event) => console.log('Node click on ', event.detail));
      cde.addEventListener('nodeHover', (event) => console.log('Node hover on ', event?.detail));
      cde.addEventListener('edges', (event) => console.log('Edges ', event));
      cde.addEventListener('colorMap', (event) => console.log('Color map ', event));
    });
  </script>
  <body>
    <cde-visualization id="cde" home-link="https://apps.humanatlas.io/cde/" nodes="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-nodes.csv" node-target-key="Cell Type" node-target-value="Endothelial" edges="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-edges.csv"> </cde-visualization>
  </body>
</html>
```

The following options are available for configuration:

- `homeLink: string` - URL that the user will be redirected to when clicking the Cell Distance Explorer logo in the upper left corner of the app
- `nodes: string | NodeEntry[]` - Input nodes data, can be a url or array of node entries
  - NodeEntry = Node entry with spatial coordinates and dynamic target properties
    - `x: number` - Node X coordinate
    - `y: number` - Node Y coordinate
    - `z?: number` - Node optional Z coordinate
    - `[target: string]: string` - Dynamic property for node target values
- `nodeTargetKey: string` - Key for node target attribute
- `nodeTargetValue: string` - Value for node target attribute
- `edges: string | EdgeEntry[]` - Input edges data, can be a url or array of edge entries
  - EdgeEntry - Edge entry with coordinates for two points in 3D space
    - `sourceNodeIndex: number` - Index of the source node in node entries array
    - `x0: number` - Source X coordinate
    - `y0: number` - Source Y coordinate
    - `z0: number` - Source Z coordinate
    - `x1: number` - Target X coordinate
    - `y1: number` - Target Y coordinate
    - `z1: number` - Target Z coordinate
- `maxEdgeDistance: number` - Maximum edge distance
- `colorMap: string | ColorMapEntry[]` - Input color map data, can be a url or array of color map entries
  - ColorMapEntry - Color map entry with dynamic key and value names
    - `[key: string]: string` - Key for the type in the color map
    - `[value: string]: [red: number, green: number, blue: number]` - Key for the corresponding RGB color in the color map
- `colorMapKey: string` - Key for color map type attribute
- `colorMapValueKey: string` - Key for color map value attribute

- `metadata: string | Metadata` - Input metadata, can be a url or a metadata object
  - Metadata - Sample metadata
    - `sourceData?: string` - Name of the source file
    - `colorMap?: string` - Name of the colormap file
    - `title?: string` - Title of the visualization
    - `organ?: string` - Organ being visualized
    - `technology?: string` - Technology used in the visualization
    - `sex?: 'Both' | 'Female' | 'Male'` - Sex of the subject
    - `age?: number` - Age of the subject (years)
    - `thickness?: number` - Thickness of the sample (µm)
    - `pixelSize?: number` - Pixel size in the visualization (µm/pixel)
    - `creationTimestamp?: number` - Creation timestamp (ms since 1/1/1970 UTC); uses current time if blank
- `title: string` - Title of the visualization
- `organ: string` - Organ being visualized
- `technology: string` - Technology used in the visualization
- `sex: 'Both' | 'Female' | 'Male'` - Sex of the subject
- `age: number` - Age of the subject (years)
- `thickness: number` - Thickness of the sample (µm)
- `pixelSize: number` - Pixel size in the visualization (µm/pixel)
- `creationTimestamp: number` - Creation timestamp (ms since 1/1/1970 UTC)

The following events are available:

- `nodeClick: () => Event` - Emits a node click event containing details of a clicked node
- `nodeHover: () => Event` - Emits a node hover event containing details of a hovered node
- `edges: () => string | EdgeEntry[]` - Returns current edge data or edge url
- `colorMap: () => string | ColorMapEntry[]` - Return current color map or color map url
