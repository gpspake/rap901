#!/usr/bin/env bash

set -e
set -x

coverage run --source=app -m pytest #-k test_release_labels.py -s
coverage report --show-missing
coverage html --title "${@-coverage}"
