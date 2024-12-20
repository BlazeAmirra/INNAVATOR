@echo off

setlocal

set DEPLOY_SUFFIX=-f0e9
set REGION=us-central1
set PROJECT_ID=innavator

rem Maybe for the same reason as client deployment (haven't checked), we also need to use call for gcloud
call gcloud builds submit --config provisioning/server.cloudbuild.yaml
call gcloud run jobs update migrate%DEPLOY_SUFFIX% --image us-docker.pkg.dev/%PROJECT_ID%/containers/server --region %REGION%
call gcloud run jobs execute migrate%DEPLOY_SUFFIX% --region %REGION% --wait
call gcloud run services update server%DEPLOY_SUFFIX% --image us-docker.pkg.dev/%PROJECT_ID%/containers/server --region %REGION%

endlocal
