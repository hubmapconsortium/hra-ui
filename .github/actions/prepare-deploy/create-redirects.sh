#!/bin/bash
set -e

echo $PWD
echo $(ls deploy/apps/*)
touch deploy/_redirects
for dir in deploy/apps/*
do
  echo $dir
  if [ -d "$dir" ]; then
    APP="$(basename $dir)"
    echo "/apps/${APP}/* /apps/${APP}/index.html 200" >> deploy/_redirects
  fi
done

cat deploy/_redirects
