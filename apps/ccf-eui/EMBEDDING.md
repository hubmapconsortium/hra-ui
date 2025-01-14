# Embedding _CCF Exploration User Interface (CCF-EUI)_

## Basic Usage

The following code snippet can be used to get started with the _CCF-EUI_.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>HuBMAP CCF Exploration User Interface (CCF-EUI)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <base href="https://cdn.humanatlas.io/ui/ccf-eui/" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />
    <link href="https://cdn.humanatlas.io/ui/ccf-eui/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ccf-eui/wc.js" type="module"></script>
  </head>
  <body>
    <ccf-eui id="eui"></ccf-eui>
  </body>
</html>
```

## Inputs

The _CCF-EUI_ has many inputs in different formats. Each input can be set using either HTML attributes:

```html
<ccf-eui token="..."> </ccf-eui>
```

or through javascript:

```js
const eui = document.getElementById('eui');
eui.token = '...';
```

### Available inputs

| Attribute name        | Description                                                           | Data format         | Default                                |
| --------------------- | --------------------------------------------------------------------- | ------------------- | -------------------------------------- |
| _data-sources_        | Data sources from which data is queried                               | An array of strings | None                                   |
| _selected-organs_     | The initially enabled organs                                          | An array of strings | None                                   |
| _remote-api-endpoint_ | The api endpoint from which data is queried                           | An url              | `https://apps.humanatlas.io/api`       |
| _token_               | Api token passed during data queries                                  | A string            | None                                   |
| _filter_              | Initial data filter                                                   | A `Filter` object   | None                                   |
| _theme_               | Application theme                                                     | A string            | None                                   |
| _header_              | Whether to show the header bar                                        | A boolean           | `true`                                 |
| _login-disabled_      | Whether login is disabled                                             | A boolean           | `false`                                |
| _home-url_            | Url visited when the user clicks the EUI logo                         | An url              | `https://portal.hubmapconsortium.org/` |
| _logo-tooltip_        | Tooltip displayed when the user hover over the logo                   | A string            | `Human BioMolecular Atlas Project`     |
| _base-href_           | Base url to fetch relative links. Must be set if `<base>` is not used | An url              | None                                   |

A `Filter` is a plain object with the following **optional** properties:

| Property name     | Description                                 | Data format                      |
| ----------------- | ------------------------------------------- | -------------------------------- |
| _sex_             | Filter data by sex                          | `Both`, `Female`, or `Male`      |
| _ageRange_        | Filter data by a range of ages              | A two number tuple, `[from, to]` |
| _bmiRange_        | Filter data by a range of bmis              | A two number tuple, `[from, to]` |
| _consortiums_     | Filter data by one or more consortiums      | An array of strings              |
| _tmc_             | Filter data by one or more tmcs             | An array of strings              |
| _technologies_    | Filter data by one or more technologies     | An array of strings              |
| _ontologyTerms_   | Filter data by one or more ontology terms   | An array of strings              |
| _cellTypeTerms_   | Filter data by one or more cell type terms  | An array of strings              |
| _biomarkerTerms_  | Filter data by one or more biomarker terms  | An array of strings              |
| _spatialSearches_ | Filter data by one or more spatial searches | An array of `SpatialSearch`      |

A `SpatialSearch` is a plain object with the following properties:

| Property name | Description   | Data format |
| ------------- | ------------- | ----------- |
| _x_           | X coordinate  | A number    |
| _y_           | Y coordinate  | A number    |
| _z_           | Z coordinate  | A number    |
| _radius_      | Search radius | A number    |
| _target_      | Search target | A string    |

## Outputs

This application does not emit any output events.

## Full example

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>HuBMAP CCF Exploration User Interface (CCF-EUI)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <base href="https://cdn.humanatlas.io/ui/ccf-eui/" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />
    <link href="https://cdn.humanatlas.io/ui/ccf-eui/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ccf-eui/wc.js" type="module"></script>
  </head>
  <body>
    <ccf-eui id="eui"></ccf-eui>
  </body>
</html>
```
