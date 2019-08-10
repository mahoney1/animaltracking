#!/bin/bash

trap 'node ./EventFormat.js ; rm rawevents.json 2>/dev/null' SIGINT

echo "running Ev Listener ..."
node ./EventListener.js
