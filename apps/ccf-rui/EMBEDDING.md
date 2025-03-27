# Embedding _CCF Registration User Interface (CCF-RUI)_

## Basic Usage

The following code snippet can be used to get started with the _CCF-RUI_.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>HuBMAP CCF Registration User Interface (CCF-RUI)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <base href="https://cdn.humanatlas.io/ui/ccf-rui/" />
    <link href="https://cdn.humanatlas.io/ui/ccf-rui/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ccf-rui/wc.js" type="module"></script>
  </head>
  <body>
    <ccf-rui id="rui"></ccf-rui>
  </body>
</html>
```

## Inputs

The _CCF-RUI_ has many inputs in different formats. Each input can be set using either HTML attributes:

```html
<ccf-rui user='{ "firstName": "bob", "lastName": "the dragon" }'> </ccf-rui>
```

or through javascript:

```js
const rui = document.getElementById('rui');
rui.user = {
  firstName: 'bob',
  lastName: 'the dragon',
};
```

### Available inputs

| Attribute name                      | Description                                                                        | Data format                                 | Default                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| _user_                              | Prepopulated user                                                                  | An `User` object                            |                                                        |
| _organ_                             | Prepopulated organ                                                                 | An `Organ` object                           |                                                        |
| _consortium_                        | Prepopulated consortium                                                            | A string                                    | None                                                   |
| _view_                              | Initial view mode                                                                  | `register` or `3d`                          | `register`                                             |
| _view-side_                         | Initial view side in `register` mode                                               | `left`, `right`, `anterior`, or `posterior` | `anterior`                                             |
| _use-download_                      | Whether to download the registration on review                                     | A boolean                                   | `false`                                                |
| _skip-unsaved-changes-confirmation_ | Whether to disable the unsaved changes prompt when the user leaves the application | A boolean                                   | `false`                                                |
| _edit-registration_                 | Prepopulated registration                                                          | A `SpatialEntityJsonLd` object              | None                                                   |
| _fetch-previous-registrations_      | A callback to fetch previous registrations                                         | A function                                  | None                                                   |
| _register_                          | Callback that recieves the registration on review                                  | A function                                  | None                                                   |
| _cancel-registration_               | Callback when the user leaves the application                                      | A function                                  | None                                                   |
| _reference-data_                    | Reference data api endpoint                                                        | An url                                      | `https://apps.humanatlas.io/api/v1/rui-reference-data` |
| _collision-endpoint_                | Collision query api endpoint                                                       | An url                                      | `https://apps.humanatlas.io/api/v1/collisions`         |
| _organ-options_                     | A list of enabled organs                                                           | An array of strings                         | None                                                   |
| _home-url_                          | Url visited when the user clicks the RUI logo                                      | An url                                      | `https://apps.humanatlas.io/rui/`                      |
| _base-href_                         | Base url to fetch relative links. Must be set if `<base>` is not used              | An url                                      | None                                                   |

A `User` is a plain object with the following properties:

| Property name | Description          | Data format |
| ------------- | -------------------- | ----------- |
| _firstName_   | User's first name    | A string    |
| _lastName_    | User's last name     | A string    |
| _email_       | User's email address | A string    |

A `Organ` is a plain object with the following properties:

| Property name | Description | Data format        | Required |
| ------------- | ----------- | ------------------ | -------- |
| _name_        | Organ name  | A string           | `yes`    |
| _ontologyId_  | Organ id    | A string           | `no`     |
| _sex_         | Organ sex   | `female` or `male` | `no`     |
| _side_        | Organ side  | `left` or `right`  | `no`     |

## Outputs

This application does not emit any output events.

## Full example

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Regular metadata. Customize as you see fit -->
    <meta charset="utf-8" />
    <title>HuBMAP CCF Registration User Interface (CCF-RUI)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- The important bits -->
    <base href="https://cdn.humanatlas.io/ui/ccf-rui/" />
    <link href="https://cdn.humanatlas.io/ui/ccf-rui/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ccf-rui/wc.js" type="module"></script>
  </head>
  <body>
    <ccf-rui id="rui"></ccf-rui>
  </body>
</html>
```
