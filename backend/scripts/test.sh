#!/usr/bin/env bash

set -e
set -x

coverage run --source=app -m pytest # -k test_create_artist_not_enough_permissions -s
coverage report --show-missing
coverage html --title "${@-coverage}"
