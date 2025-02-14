const euiEmbedTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>EUI Web Component</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet" />
    <link href="https://cdn.humanatlas.io/ui/ccf-eui/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui/ccf-eui/wc.js" defer></script>
  </head>
  <body style="margin: 0">
    <ccf-eui
      base-href="https://cdn.humanatlas.io/ui/ccf-eui/"
      remote-api-endpoint="https://apps.humanatlas.io/api"
      header="false"
      data-sources='["https://purl.humanatlas.io/collection/ds-graphs"]'
      filter='{"ontologyTerms": ["{{organ}}"]}'
    >
    </ccf-eui>
  </body>
</html>`;

export default euiEmbedTemplate;
