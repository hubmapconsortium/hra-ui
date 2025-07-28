# Embedding HRA Organ Info

## Introduction

This component (`ccf-root-wc`) provides a visualization of a human reference atlas organ, supporting selection of side and biological sex, and highlighting structures based on data source input.

## Basic Usage

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>EUI Organ Info Web Component</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />
    <link href="https://cdn.humanatlas.io/ui/ccf-organ-info/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ccf-organ-info/wc.js" defer></script>
  </head>
  <body style="margin: 0">
    <ccf-organ-info base-href="https://cdn.humanatlas.io/ui/ccf-organ-info/" remote-api-endpoint="https://apps.humanatlas.io/api" organ-iri="http://purl.obolibrary.org/obo/UBERON_0002113" data-sources='["https://purl.humanatlas.io/collection/ds-graphs"]'> </ccf-organ-info>
  </body>
</html>
```

## Inputs

| **Attribute name**   | **Description**                                                       | **Data format**                    | **Default** |
| -------------------- | --------------------------------------------------------------------- | ---------------------------------- | ----------- |
| `organIri`           | Specifies the IRI of the organ to visualize.                          | `string`                           | None        |
| `sex`                | Indicates the biological sex for the model display.                   | `'Male'` \| `'Female'` \| `'Both'` | `'Female'`  |
| `side`               | Indicates which side of the organ to render.                          | `'Left'` \| `'Right'`              | `'Left'`    |
| `dataSources`        | One or more data source identifiers to fetch content from.            | `string` \| `string[]`             | None        |
| `highlightProviders` | One or more providers used to determine highlighted elements in view. | `string` \| `string[]`             | None        |
| `token`              | API token for authenticating remote data requests.                    | `string`                           | None        |
| `remoteApiEndpoint`  | Base URL for fetching remote organ info data.                         | `string`                           | None        |
| `donorLabel`         | Optional label to identify the donor or specimen.                     | `string`                           | None        |

## Outputs

| **Attribute name** | **Description**                                              | **Data format**        |
| ------------------ | ------------------------------------------------------------ | ---------------------- |
| `sexChange`        | Emitted when the user changes the model's biological sex.    | `'Male'` \| `'Female'` |
| `sideChange`       | Emitted when the user changes the organ side.                | `'Left'` \| `'Right'`  |
| `nodeClicked`      | Emitted when the user clicks on a node in the visualization. | `NodeClickEvent`       |
