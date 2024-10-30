@echo off

pushd .
cd client

echo When interrupting with Ctrl-C or Ctrl-Break, choose N to ensure the directory traversal is cleaned up.
echo:

rem NPM runs a batch script, so "call" has to be done, otherwise the termination of that script terminates this script
call npm i
call npm run start

popd
