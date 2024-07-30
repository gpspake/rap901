#!/usr/bin/env bash

set -e
set -x

coverage run --source=app -m pytest # -k test_name -s
coverage report --show-missing
coverage html --title "${@-coverage}"
