#!/bin/bash

# Check if input string and DEPLOY_DIRECTORY are set
if [ -z "$1" ]; then
  echo "Usage: $0 from1:to1,from2:to2,..."
  exit 1
fi

if [ -z "$DEPLOY_DIRECTORY" ]; then
  echo "Environment variable DEPLOY_DIRECTORY is not set."
  exit 1
fi

# Split the input string by commas into an array
IFS=',' read -ra PAIRS <<< "$1"

# Process each from:to pair
for pair in "${PAIRS[@]}"; do
  IFS=':' read -r FROM TO <<< "$pair"

  if [ -z "$FROM" ] || [ -z "$TO" ]; then
    echo "Invalid pair: $pair"
    continue
  fi

  if [ ! -d "$FROM" ]; then
    echo "Source directory does not exist: $FROM"
    continue
  fi

  DEST="$DEPLOY_DIRECTORY/$TO"
  echo "Copying $FROM to $DEST..."
  mkdir -p "$(dirname "$DEST")"
  cp -r "$FROM" "$DEST"
done
