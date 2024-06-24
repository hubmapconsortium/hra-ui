#!/bin/bash
set -e

touch dist/_redirects
for dir in dist/apps/*
do
  if [ -d "$dir" ]; then
    APP="$(basename $dir)"
    echo "/apps/${APP}/* /apps/${APP}/index.html 200" >> dist/_redirects
  fi
done
