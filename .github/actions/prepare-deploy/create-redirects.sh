#!/bin/bash
set -e

touch deploy/_redirects
for dir in deploy/apps/*
do
  echo $dir
  if [ -d "$dir" ]; then
    APP="$(basename $dir)"
    echo "/apps/${APP}/* /apps/${APP}/index.html 200" >> deploy/_redirects
  fi
done
