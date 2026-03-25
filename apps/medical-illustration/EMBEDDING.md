# Embedding _Medical Illustration_

## Basic Usage

The following code snippet can be used to get started with the _Medical Illustration_.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>Medical Illustration</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <link href="https://cdn.humanatlas.io/ui/medical-illustration/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/medical-illustration/wc.js" defer></script>
  </head>
  <body>
    <hra-medical-illustration id="illustration" selected-illustration="https://..." illustrations="https://..."></hra-medical-illustration>
  </body>
</html>
```

## Inputs

The _Medical Illustration_ has many inputs in different formats. Each input can be set using either HTML attributes:

```html
<hra-medical-illustration selected-illustration="https://..."> </hra-medical-illustration>
```

or through javascript:

```js
const illustration = document.getElementById('illustration');
// Note that inputs use camelCase in javascript instead of kebab-case
illustration.selectedIllustration = 'https://...';
```

### Available inputs

| Attribute name          | Description                             | Data format                         | Default                                             |
| ----------------------- | --------------------------------------- | ----------------------------------- | --------------------------------------------------- |
| _selected-illustration_ | Active illustration                     | An id or object                     | None                                                |
| _illustrations_         | All available illustrations             | A json file url or a mapping object | https://apps.humanatlas.io/api/v1/ftu-illustrations |
| _highlight_             | Groups of cells to highlight            | One or more purl ids                | None                                                |
| _base-href_             | Base url used to resolve relative links | An url                              | None                                                |

## Outputs

Outputs can be listened to using javascript.

```js
illustration.addEventListener('cell-click', (event) => {
  console.log('Cell clicked: ', event.detail);
});
```

_Medical Illustration_ fires the following events:

| Event name   | Description                           | Data format                            |
| ------------ | ------------------------------------- | -------------------------------------- |
| _cell-click_ | Data associated with the clicked cell | A `FtuIllustrationNode`                |
| _cell-hover_ | Data associated with the hovered cell | A `FtuIllustrationNode` or `undefined` |

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
    <title>Medical Illustration</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <link href="https://cdn.humanatlas.io/ui/medical-illustration/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/medical-illustration/wc.js" defer></script>

    <!-- Customize inputs and event handling -->
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        const illustration = document.getElementById('illustration');

        // Highlight cells
        illustration.highlight = [
          //  Centroacinar cells
          'http://purl.obolibrary.org/obo/CL_0002080'
          // Ductal epithelial cells
          'http://purl.obolibrary.org/obo/CL_1001433'
        ];

        // Listen to events
        illustration.addEventListener('cell-click', (event) => {
          console.log('Cell clicked: ', event.detail);
        });
      });
    </script>

    <!-- Medical illustration will scale to fit its container. Customize as you see fit -->
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <hra-medical-illustration id="illustration" selected-illustration="https://purl.humanatlas.io/2d-ftu/pancreas-intercalated-duct"> </hra-medical-illustration>
  </body>
</html>
```
