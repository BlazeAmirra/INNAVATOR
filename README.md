# Innavator

## Testing

#### Setup Instructions (Windows):

[//]: # (1. Install Python - https://www.python.org/downloads/ - Seems to be taken care of by installing Node.js)
1. Install Node.js - Make sure to also install the build tools. https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
1. Install GitHub Desktop - https://desktop.github.com/download/
1. Clone this repository.
1. Open an administrator CMD terminal in `server` and execute `python -m pip install -r requirements.txt`

#### Local Testing Instructions (Windows):

1. Ensure that in `client/src/innavator-api.js` the uncommented `INNAVATOR_API_URL` is that which contains `localhost:8000`.
    * When committing, ensure that the "real" `INNAVATOR_API_URL` is the one which is uncommented in the commit changes, such as by excluding the change in GitHub Desktop.
1. Open two CMD terminals in the repository root.
1. In one terminal, run `test_server`, and wait for the message `Quit the server with CTRL-BREAK.`
    * This server will automatically reload upon changes to server source (`server/**/*.py`). 
1. In the other terminal, run `test_client`. A browser tab should automatically open upon ready; if not, open `localhost:8081` in the 
    * This server will automatically reload upon changes to client source (`client/**/*.js`) which is loaded by the Innavator shell.

## Deployment

Deployment can only be performed by a Google account which is given the required permissions to do so.

#### Setup Instructions (Windows):

1. Follow the above setup instructions for testing.
1. Install and set up the Firebase CLI by opening a CMD terminal and executing `npm install -g firebase-tools`, then `firebase login`
1. Install and configure the gcloud CLI - https://cloud.google.com/sdk/docs/install-sdk#windows

#### Deployment Instructions (Windows):

1. Ensure that in `client/src/innavator-api.js` the uncommented `INNAVATOR_API_URL` is that which does not contain `localhost:8000`.
1. Open a CMD terminal in the repository root.
1. If deploying a server software change, run `deploy_server` in that terminal.
    * If deploying both a server software change and a client software change, you can run `deploy_server && deploy_client` *in that order* and skip the next step.
1. If deploying a client software change, run `deploy_client` in that terminal.
