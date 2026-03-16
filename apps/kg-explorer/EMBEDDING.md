# Embedding _Knowledge Graph_

The API endpoint and mirror url can be set as in this example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>HRA Knowledge Graph Explorer</title>
    <base href="https://cdn.humanatlas.io/ui/kg-explorer/" />
    <link href="https://cdn.humanatlas.io/ui/kg-explorer/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/kg-explorer/main.js" type="module"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />
  </head>
  <body>
    <hra-kg-explorer remote-api-endpoint="https://apps.humanatlas.io/api" mirror-url="https://cdn.humanatlas.io/digital-objects"></hra-kg-explorer>
  </body>
</html>
```
