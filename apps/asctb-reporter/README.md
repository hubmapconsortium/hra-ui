### ASCT+B Reporter

The [CCF ASCT Reporter](https://hubmapconsortium.github.io/ccf-asct-reporter/) is a basic visualization tool for displaying the [flattened ASCT tables](https://docs.google.com/spreadsheets/u/1/d/1F7D0y7pNPVIR3W4LjjtIMGg7rKTOxwyjVKzS-iiffz4/edit#gid=2034682742) built using Angular 10.

### Overview

The [CCF ASCT+B Reporter](https://hubmapconsortium.github.io/ccf-asct-reporter/) includes a partonomy tree that presents relationships between various anatomical structures and substructures, that is combined with their respective cell types and biomarkers via a bimodal network. The reporter also presents an indented list tree for a more traditional look. Along with visualizing, the reporter has a report generator that enlists various meta data for the visualized ASCT table, which is download-able. There is also an in-house debug logger that lists any issues related to the data provided in the table. The reporter is also accompanied by a backend server, ASCT+B API.

### Links

- Production Site: <https://hubmapconsortium.github.io/ccf-asct-reporter/> ([staging](https://ccf-asct-reporter.netlify.app))
- Documentation: <https://hubmapconsortium.github.io/ccf-asct-reporter/docs> ([staging](https://ccf-asct-reporter.netlify.app/docs))
- ASCT+B API: <https://apps.humanatlas.io/asctb-api/> ([staging](https://apps.humanatlas.io/asctb-api--staging/))

### Usage

Use the following commands to lint, build and run the app

```shell
# lint
$ npx nx run asctb-reporter:lint

# build
$ npx nx run asctb-reporter:build

# serve
$ npx nx run asctb-reporter:serve
```

### Contribute

- To make a new change on the app, make the change [here](https://github.com/hubmapconsortium/hra-ui/tree/main/apps/asctb-reporter) and create a pull request.
