#!/bin/bash
#
# Collects built artifacts and moves them to the specified directory
# Arguments:
#   Output directory
#   One or more input directories to search
# Outputs:
#   Writes an output for each input directory to github outputs
#   Each entry contains the name of the directory as the key and
#   a comma separated list of copied directories as the value

shopt -s extglob

#######################################
# Main logic
#######################################
out_dir="$1"
mkdir -p "${out_dir}"
shift

while (( "$#" )); do
  if [[ -d $1 ]]; then
    # Extract directory name (https://stackoverflow.com/a/1371283)
    dir_name="${1%%+(/)}"
    dir_name="${dir_name##*/}"
    dir_name="${dir_name:-/}"

    # Copy directory
    cp -r "$1" "${out_dir}"

    # List subdirectories as a comma separated list
    sub_dirs=$(echo "${out_dir}/${dir_name}"/*)
    sub_dirs="${sub_dirs[*]//$out_dir\/}"
    sub_dirs="${sub_dirs[*]//$' '/,}"

    # Write outputs
    echo "${dir_name}=${sub_dirs}" >> "${GITHUB_OUTPUT}"
  fi
  shift
done
