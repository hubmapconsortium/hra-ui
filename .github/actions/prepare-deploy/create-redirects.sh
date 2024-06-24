#!/bin/bash
set -e

echo $PWD
echo $(ls dist/apps/*)
touch dist/_redirects
for dir in dist/apps/*
do
  echo $dir
  if [ -d "$dir" ]; then
    APP="$(basename $dir)"
    echo "/apps/${APP}/* /apps/${APP}/index.html 200" >> dist/_redirects
  fi
done

cat dist/_redirects
