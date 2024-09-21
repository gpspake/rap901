#!/usr/bin/env bash

set -e
set -x

coverage run --source=app -m pytest  -k seed -s
coverage report --show-missing
coverage html --title "${@-coverage}"
