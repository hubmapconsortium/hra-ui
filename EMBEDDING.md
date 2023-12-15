# Embedding the HRA-UI

## Code

To embed _FTU-UI_ the following code snippet should be used.

```html (large web component)
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FTU Explorer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  </head>

  <body>
    <hra-ftu-wc id="ftu" links-yaml-url="assets/links.yml" resources-yaml-url="assets/resources.yml" dataset-url="assets/TEMP/ftu-datasets.jsonld" illustrations-url="assets/TEMP/2d-ftu-illustrations.jsonld" summaries-url="assets/TEMP/ftu-cell-summaries.jsonld"></hra-ftu-wc>
  </body>
</html>
```

## Configuration

```js
window.addEventListener('DOMContentLoaded', () => {
  const ftu = document.getElementById('ftu');
  const selectOrgan = (activeIri) => {
    console.log('selected organ', activeIri);
  };
  const selectNode = (selectedNode) => {
    console.log('selected node', selectedNode);
  };
  ftu.addEventListener('organSelected', selectOrgan);
  ftu.addEventListener('nodeClicked', selectNode);
});
```

(Note that variables are kebab-case, not camel-case)

Full FTU-UI Example (small web component)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FTU Small Web Component</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <style>
      .wc-content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    </style>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        const ftu = document.getElementById('ftu');
        const selectOrgan = (activeIri) => {
          console.log('selected organ', activeIri);
        };
        const selectNode = (selectedNode) => {
          console.log('selected node', selectedNode);
        };
        ftu.addEventListener('organSelected', selectOrgan);
        ftu.addEventListener('nodeClicked', selectNode);
      });
    </script>
  </head>

  <body>
    <div class="wc-content">
      <ftu-hra-small-wc id="ftu" base-href="https://cdn.jsdelivr.net/gh/hubmapconsortium/hra-ui@staging/apps/ftu-ui/" links-yaml-url="assets/links.yml" resources-yaml-url="assets/resources.yml" organ-iri="https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle" dataset-url="assets/TEMP/ftu-datasets.jsonld" illustrations-url="assets/TEMP/2d-ftu-illustrations.jsonld" summaries-url="assets/TEMP/ftu-cell-summaries.jsonld" (organSelected)="selectOrgan()" (nodeClicked)="selectNode()"></ftu-hra-small-wc>
    </div>
  </body>
</html>
```

The following options are available for configuration:

- `base-href` -Base URL (won't be used if an option is provided as a full url/iri)
- `links-yaml-url` -URL that points to a .yml file to load links
- `resources-yaml-url` -URL that points to a .yml file to load resources
- `organ-iri` -URL/IRI of the organ. Should be specified when the app is in embedded mode
- `dataset-url` -URL that points to a .jsonld file to load datasets
- `illustrations-url` -URL that points to a .jsonld file to load illustrations
- `summaries-url` -URL that points to a .jsonld file to load summaries
