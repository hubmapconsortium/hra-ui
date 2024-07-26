### Registration User Interface

An interactive tool for registering tissue blocks spatially and annotating them semantically using ASCT+B Table terms

### Overview

This Registration User Interface (RUI) supports the registration of three-dimensional (3D) tissue blocks within 3D reference organs. A first beta of the CCF RUI became available in October 2020. 3D reference organs are freely available on the HRA Portal in the 3D Reference Object Library, the ontology can be found on BioPortal, and the code is available on GitHub. The registration data is used in current versions of the Common Coordinate Framework and on the Exploration User Interface (EUI) developed within HuBMAP.

## Links

- Production URL: https://apps.humanatlas.io/rui/

### Usage

Use the following commands to lint, build and run the app

```sh
# lint
$ npx nx run ccf-rui:lint

# build
$ npx nx run ccf-rui:build

# serve
$ npx nx run ccf-rui:serve

#test
$ npx nx run ccf-rui:test
```

### Contribute

- To make a new change on the app, make the change [here](https://github.com/hubmapconsortium/hra-ui/tree/main/apps/ccf-rui) and create a pull request.
