# Embedding _Knowledge Graph_

The API endpoint and mirror url can be set as in this example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>HRA Knowledge Graph Explorer</title>
    <base href="https://cdn.humanatlas.io/digital-objects" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <link rel="preload" href="media/nunito-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="media/metropolis-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="media/material-symbols-rounded-latin-fill-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="media/material-symbols-outlined-latin-fill-normal.woff2" as="font" type="font/woff2" crossorigin />
  </head>
  <body>
    <hra-kg-explorer remote-api-endpoint="https://apps.humanatlas.io/api" mirror-url="https://cdn.humanatlas.io/digital-objects"></hra-kg-explorer>
  </body>
</html>
```
