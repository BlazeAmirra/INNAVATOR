@echo off

setlocal
pushd .
cd client

set DEPLOY_SUFFIX=-f0e9
set REGION=us-central1
set PROJECT_ID=innavator

rem NPM runs a batch script, so "call" has to be done, otherwise the termination of that script terminates this script
call npm i
call npm run build
call firebase deploy --project %PROJECT_ID% --only hosting

popd
endlocal
