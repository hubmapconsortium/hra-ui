# Embedding _Functional Tissue Unit Explorer (FTU)_

## Basic Usage

The following code snippet can be used to get started with the _FTU_.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>FTU Explorer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <base href="https://cdn.humanatlas.io/ui/ftu-ui/" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    <link href="https://cdn.humanatlas.io/ui/ftu-ui/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ftu-ui/polyfills.js" defer></script>
    <script src="https://cdn.humanatlas.io/ui/ftu-ui/main.js" defer></script>
  </head>
  <body>
    <hra-ftu-ui id="ftu" selected-illustration="https://..."></hra-ftu-ui>
  </body>
</html>
```

## Inputs

The _FTU_ has many inputs in different formats. Each input can be set using either HTML attributes:

```html
<ftu-ui selected-illustration="https://..."> </ftu-ui>
```

or through javascript:

```js
const ftu = document.getElementById('ftu');
// Note that inputs use camelCase in javascript instead of kebab-case
ftu.selectedIllustration = 'https://...';
```

### Available inputs

| Attribute name          | Description                                                           | Data format                         | Default                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| _selected-illustration_ | Active illustration                                                   | An id or object                     | None                                                                                                                                    |
| _illustrations_         | All available illustrations                                           | A json file url or a mapping object | [Default Illustrations](https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld) |
| _summaries_             | Summaries data                                                        | A json file url or a mapping object | None                                                                                                                                    |
| _datasets_              | Datasets metadata for each illustration                               | A json file url or a mapping object | None                                                                                                                                    |
| _base-href_             | Base url to fetch relative links. Must be set if `<base>` is not used | An url                              | None                                                                                                                                    |
| _app-links_             | **Advanced users**: Modify application links                          | A yaml file url                     | [Default Links](./src/assets/links.yml)                                                                                                 |
| _app-resources_         | **Advanced users**: Modify application content                        | A yaml file url                     | [Default Content](./src/assets/resources.yml)                                                                                           |

### Illustrations, summaries, and datasets

The `illustrations`, `summaries`, and `datasets` inputs all accept an url to a json file from which to load their data, i.e.

```html
<ftu-ui illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"> </ftu-ui>
```

Alternatively the data can be set from javascript.

```js
ftu.illustrations = {
  '@graph': [
    // Illustrations data
  ],
};
```

## Outputs

Outputs can be listened to using javascript.

```js
ftu.addEventListener('cell-click', (event) => {
  console.log('Cell clicked: ', event.detail);
});
```

_FTU_ fires the following events:

| Event name              | Description                           | Data format                            |
| ----------------------- | ------------------------------------- | -------------------------------------- |
| _illustration-selected_ | The id of the selected illustration   | A string                               |
| _cell-click_            | Data associated with the clicked cell | A `FtuIllustrationNode`                |
| _cell-hover_            | Data associated with the hovered cell | A `FtuIllustrationNode` or `undefined` |

A `FtuIllustrationNode` is a plain object with at least the following properties:

| Property name       | Description                                         | Data format |
| ------------------- | --------------------------------------------------- | ----------- |
| _label_             | User friendly description of the cell               | A string    |
| _svg_id_            | Css id of the cell element                          | A string    |
| _svg_group_id_      | Css id of the group containing all related elements | A string    |
| _representation_of_ | Purl id of the cell                                 | A string    |

## Full example

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>FTU Explorer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <base href="https://cdn.humanatlas.io/ui/ftu-ui/" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    <link href="https://cdn.humanatlas.io/ui/ftu-ui/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ftu-ui/polyfills.js" defer></script>
    <script src="https://cdn.humanatlas.io/ui/ftu-ui/main.js" defer></script>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        const ftu = document.getElementById('ftu');

        // Listen to events
        ftu.addEventListener('cell-click', (event) => {
          console.log('Cell clicked: ', event.detail);
        });
      });
    </script>
  </head>
  <body>
    <hra-ftu-ui id="ftu" selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle"> </hra-ftu-ui>
  </body>
</html>
```
