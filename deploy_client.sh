#!/bin/bash

export DEPLOY_SUFFIX="-f0e9"
export REGION=us-central1
export PROJECT_ID=innavator

cd client
npm i
npm run build
firebase deploy --project $PROJECT_ID --only hosting
