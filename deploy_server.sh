#!/bin/bash

export DEPLOY_SUFFIX="-f0e9"
export REGION=us-central1
export PROJECT_ID=innavator

gcloud builds submit --config provisioning/server.cloudbuild.yaml
gcloud run jobs update migrate${DEPLOY_SUFFIX} --image us-docker.pkg.dev/${PROJECT_ID}/containers/server --region $REGION
gcloud run jobs execute migrate${DEPLOY_SUFFIX} --region $REGION --wait
gcloud run services update server${DEPLOY_SUFFIX} --image us-docker.pkg.dev/${PROJECT_ID}/containers/server --region $REGION

