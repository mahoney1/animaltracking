#!/bin/bash

trap 'node ./EventFormat.js' SIGINT

echo "running Ev Listener ..."
node ./EventListener_IBP.js
