#!/bin/bash

# Recreate config file
rm -rf ./public/env.js
touch ./public/env.js

# Add assignment
ENVS="window._env_ = {"

# Read React env vars and transfer to env.js to support env vars at runtime
for var in $(printenv); do
  if [[ ${var:0:10} == "REACT_APP_" ]]; then
    key=`echo ${var} | awk 'BEGIN {FS = "="}; {print $1}'`
    value=`echo ${var} | awk 'BEGIN {FS = "="} ; {print $2}'`

    # only append vars that are not empty
    if [[ ! -z "$value" ]]; then
      ENVS="${ENVS} ${key:10}:'${value}',"
    fi
  fi
done

echo "${ENVS} }" > "./public/env.js"
