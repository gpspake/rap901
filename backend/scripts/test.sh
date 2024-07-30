#!/usr/bin/env bash

set -e
set -x

coverage run --source=app -m pytest # -k test_clean_db
coverage report --show-missing
coverage html --title "${@-coverage}"
