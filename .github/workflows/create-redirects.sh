#!/bin/bash

REDIRECTS_CONTENT='/* /index.html 200'

for dir in ../../apps/*/
do
  if [ -d "$dir" ]; then
    APP_NAME=$(basename "$dir")

    DIST_DIR="../../dist/apps/${APP_NAME}"

    if [ ! -d "$DIST_DIR" ]; then
      #create directory if not present
      mkdir -p "$DIST_DIR"
    fi

    echo "$REDIRECTS_CONTENT" > "${DIST_DIR}/_redirects"
  fi
done
