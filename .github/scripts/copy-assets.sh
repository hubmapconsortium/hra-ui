#!/usr/bin/env bash
set -euo pipefail

# ----------------------------------------
# Usage: ./copy-assets.sh assets.json
# Copies directories defined in a JSON file
# Each entry: { "from": "src", "to": "dest" }
# ----------------------------------------

CONFIG_FILE="${1:-assets.json}"

if [[ ! -f "$CONFIG_FILE" ]]; then
  echo "Error: JSON config file '$CONFIG_FILE' not found."
  exit 1
fi

# Ensure jq is installed
if ! command -v jq &> /dev/null; then
  echo "Error: jq is required but not installed."
  echo "Install it with: sudo apt-get install jq"
  exit 1
fi

jq -c '.[]' "$CONFIG_FILE" | while read -r entry; do
  from=$(echo "$entry" | jq -r '.from')
  to=$(echo "$entry" | jq -r '.to')

  if [[ ! -d "$from" ]]; then
    echo "Skipping: source directory '$from' does not exist."
    continue
  fi

  echo "Copying '$from' to '$to' ..."
  mkdir -p "$to"
  cp -r "$from"/. "$to"/
done

echo "Assets copied successfully!"
