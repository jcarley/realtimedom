#!/usr/bin/env bash
rethinkdb -d ./data --io-threads 15 --cache-size auto
