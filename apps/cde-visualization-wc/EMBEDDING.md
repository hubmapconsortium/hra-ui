# Embedding Instructions

## Code

To embed _CDE-VISUALIZATION-WC_ the following code snippet should be used:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CDE Visualization</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  </head>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const cde = document.getElementById('cde');
      cde.addEventListener('nodeClick', (event) => console.log('Node click on ', event.detail));
      cde.addEventListener('nodeHover', (event) => console.log('Node hover on ', event?.detail));
    });
  </script>
  <body>
    <cde-visualization id="cde"></cde-visualization>
  </body>
</html>
```

## Configuration

_CDE-VISUALIZATION-WC_ can be customized in the following ways:

```js
window.addEventListener('DOMContentLoaded', () => {
  const cde = document.getElementById('cde');
  cde.homeLink = 'https://.....';
  cde.nodes = 'https://.....';
  cde.nodeTargetKey = 'Cell Type';
  cde.nodeTargetValue = 'Endothelial';
  cde.edges = 'https://.....';
  cde.maxEdgeDistance = 1000;
  cde.colorMap = 'https://.....';
  cde.colorMapKey = 'cell_type';
  cde.colorMapValueKey = 'cell_color';

  // Metadata object, some values can be set individually
  cde.metadata = {
    title: 'Title',
    technology: 'Technology',
    organ: 'Organ Name',
    sex: 'Male',
    age: 30,
    thickness: 10,
    pixelSize: 5,
    creationTimestamp: 0,
    sourceData: 'Source Data Filename',
    colorMap: 'Color Map Filename',
    sampleExtra: {
      type: '2D',
      organ: 'Organ',
      sampleUrl: 'https://.....',
      sourceDataUrl: 'https://.....'
    }
  };
  cde.title = 'Title';
  cde.technology = 'Technology';
  cde.organ = 'Organ Name';
  cde.sex = 'Male';
  cde.age = 30;
  cde.thickness = 10;
  cde.pixelSize: 5;
  cde.creationTimestamp = 0;

  cde.addEventListener('nodeClick', (event) => console.log('Node click on ', event.detail));
  cde.addEventListener('nodeHover', (event) => console.log('Node hover on ', event?.detail));
});
```

This format of configuration only works with certain data types, namely strings and booleans.
(Note that variables are kebab-case, not camel-case)

```html
<cde-visualization id="cde" home-link="https://....." nodes="https://....." node-target-key="Cell Type" node-target-value="Endothelial" edges="https://....." color-map="https://....." color-map-key="cell_type" color-map-value-key="cell_color" title="Title" technology="Technology" organ="Organ Name" sex="Male"> </cde-visualization>
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
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  </head>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const cde = document.getElementById('cde');
      cde.metadata = {
        title: 'colon-cycif-sorgerlab / CRC01002 (483,936 cells)',
        sourceData: 'CRC01002-nodes.csv',
        organ: 'Colon',
        sex: 'Male',
        age: 30,
        thickness: 10,
        pixelSize: 5,
      };
      cde.maxEdgeDistance = 1000;
      cde.addEventListener('nodeClick', (event) => console.log('Node click on ', event.detail));
      cde.addEventListener('nodeHover', (event) => console.log('Node hover on ', event?.detail));
    });
  </script>
  <style>
    .wc-content {
      min-width: 1280px;
      min-height: 832px;
      height: 100%;
    }
  </style>
  <body>
    <div class="wc-content">
      <cde-visualization id="cde" home-link="https://apps.humanatlas.io/cde/" nodes="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-nodes.csv" node-target-key="Cell Type" node-target-value="Endothelial" edges="https://cdn.humanatlas.io/image-store/vccf-data-cell-nodes/published/colon-cycif-sorgerlab/CRC01002-edges.csv"> </cde-visualization>
    </div>
  </body>
</html>
```

The following options are available for configuration:

- `homeLink: string` - URL that the user will be redirected to when clicking the Cell Distance Explorer logo in the upper left corner of the app
- `nodes: string | NodeEntry[]` - Input nodes data, can be a url or array of node entries
  - `NodeEntry: { x: number, y: number, z?: number, [target: string]: string }`
- `nodeTargetKey: string` - Key for node target attribute
- `nodeTargetValue: string` - Value for node target attribute
- `edges: string | EdgeEntry[]` - Input edges data, can be a url or array of edge entries
  - `EdgeEntry: { sourceNodeIndex: number, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number }`
- `maxEdgeDistance: number` - Maximum edge distance
- `colorMap: string | ColorMapEntry[]` - Input color map data, can be a url or array of color map entries
  - `ColorMapEntry: { [key: string]: string, [value: string]: [number, number, number] }`
- `colorMapKey: string` - Key for color map type attribute
- `colorMapValueKey: string` - Key for color map value attribute

- `metadata: string | Metadata` - Input metadata, can be a url or a metadata object
  - `Metadata: { title?: string, sourceData?: string, colorMap?: string, organ?: string, technology?: string, sex?: string, age?: number, thickness?: number, pixelSize?: number, creationTimestamp?: number, sampleExtra: { type: string, organ: string, sampleUrl: string, sourceDataUrl: string } }`
- `title: string` - Title of the visualization
- `technology: string` - Technology used in the visualization
- `organ: string` - Organ being visualized
- `sex: 'Both' | 'Female' | 'Male'` - Sex of the subject
- `age: number` - Age of the subject (years)
- `thickness: number` - Thickness of the sample (µm)
- `pixelSize: number` - Pixel size in the visualization (µm/pixel)
- `creationTimestamp: number` - Creation timestamp (ms since 1/1/1970 UTC)

The following events are available:

- `nodeClick: () => Event` - Emits a node click event containing details of a clicked node
- `nodeHover: () => Event` - Emits a node hover event containing details of a hovered node
