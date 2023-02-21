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
# List all subdirectories inside a directory
# Arguments:
#   Directory to search, a path
# Outputs:
#   Writes the directory paths to stdout
#######################################
function list_dirs() {
  local dir="${1%%+(/)}"
  local dirs=$([[ -d ${dir} ]] && ls -d ${dir}/*)
  echo "${dirs}"
}

#######################################
# Gets the directory name from a path
# Arguments:
#   Directory, a path
# Outputs:
#   Writes the directory name to stdout
#######################################
function dir_name() {
  local name="${1%%+(/)}"
  local name="${name##*/}"
  echo "${name}"
}

#######################################
# Copies multiple directories
# Arguments:
#   Base destination directory, a path
#   One or more source directories, paths
# Outputs:
#   Writes the output directory paths to stdout
#######################################
function copy_dirs() {
  local base_dir="$1"
  shift
  while (( "$#" )); do
    local out_dir="${base_dir}/$(dir_name $1)"
    cp -r "$1" "${out_dir}"
    echo "${out_dir}"
    shift
  done
}

#######################################
# Writes a key value pair to github outputs
# Arguments:
#   Key, a string
#   Value, any
#######################################
function output() {
  echo "${1}=${2}" >> "${GITHUB_OUTPUT}"
}


#######################################
# Main logic
#######################################
out_dir="$1"
mkdir -p "${out_dir}"
shift

while (( "$#" )); do
  if [[ -d $1 ]]; then
    name=$(dir_name "$1")
    dirs=$(list_dirs "$1")
    out_dirs=$(copy_dirs "${out_dir}" ${dirs[@]})
    output "${name}" "${dirs[*]//$'\n'/,}"
  fi
  shift
done
