#!/usr/bin/env bash

set -e
set -x

poetry run python scripts/seed_db.py
