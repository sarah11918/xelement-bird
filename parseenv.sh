#!/bin/bash

set -euET;

# List the env variables to target
_env_vars=(
	
    EBIRD_API_KEY
)
_modified_files=();

# Temporarily swap the ${process.env.ENV_KEY} strings with actual env var value
echo "[%%%] Temporarily swapping the variables";
for _env_var in "${_env_vars[@]}"; do {
	if test ! -v "$_env_var"; then {
		echo "[!!!] Error: $_env_var env var is not defined";
		exit 1;
	} fi
	mapfile -t _found_files < <(grep "\${process.env.${_env_var}\}" -lr "$PWD/src/");
	for _file in "${_found_files[@]}"; do {
		sed -i "s|\${process.env.${_env_var}\}|${!_env_var}|g" "$_file";
		echo "[%%%] Modifed $_file";
		_modified_files+=("${_file}::${_env_var}");
		unset _file;
	} done
	unset _found_files;
} done

function revert() {

	echo "[%%%] Reverting back the changes";
	for _file in "${_modified_files[@]}"; do {
		_var_name="${_file##*::}";
		_file_path="${_file%%::*}";
		sed -i "s|${!_var_name}|\${process.env.${_var_name}\}|g" "$_file_path";
		echo "[%%%] Reverted $_file_path";
		unset _var_name _file_path;
	} done
	exit;
}

trap 'revert' SIGHUP SIGINT SIGTERM SIGKILL;

# Run job and wait for it to exit;
echo "[%%%] Running command: $@";
"$@";

# Revert back the changes
revert;