#!/bin/bash

REDIRECTS_CONTENT='/* /index.html 200'

for dir in ../../dist/apps/*
do
  if [ -d "$dir" ]; then
    echo "$REDIRECTS_CONTENT" > "${dir}/_redirects"
  fi
done
