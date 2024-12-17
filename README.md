# Innavator

## Testing

When testing, a local testing database is in use, not the cloud production database. This database's state is found in `server/db.sqlite3`, which if not found is created blank with just the table definitions, and persists across testing runs on the same machine unless tampered with by the user. As such, state changes like user registrations on the live site are not reflected on the test environment, nor vice versa.

### Setup Instructions (Windows):

[//]: # (1. Install Python - https://www.python.org/downloads/ - Seems to be taken care of by installing Node.js)
1. Install Node.js and make sure to also install the build tools - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    * Installing the build tools will include a portion which takes a while with no indication of progress. Continued activity can be monitored by viewing disk usage in Task Manager.
1. Install GitHub Desktop - https://desktop.github.com/download/
1. Clone this repository.
1. Open an administrator CMD terminal in `server` and execute `python -m pip install -r requirements.txt`

### Local Testing Instructions (Windows):

1. Open two CMD terminals in the repository root.
1. In one terminal, run `test_server`, and wait for the message `Quit the server with CTRL-BREAK.`
    * This server will automatically reload upon changes to server source (`server/**/*.py`). 
1. In the other terminal, run `test_client`. A browser tab should automatically open upon ready; if not, open `localhost:8081` in a web browser.
    * This server will automatically reload upon changes to client source (`client/**/*.js`) which is loaded by the Innavator shell.

## Deployment

Deployment to the existing project can only be performed by a Google account which is given the required permissions to do so.

### Setup Instructions (Windows):

1. Follow the above setup instructions for testing.
1. Install and set up the Firebase CLI by opening a CMD terminal and executing `npm install -g firebase-tools`, then `firebase login`
1. Install and configure the gcloud CLI - https://cloud.google.com/sdk/docs/install-sdk#windows

### Deployment Instructions (Windows):

1. Open a CMD terminal in the repository root.
1. If deploying a server software change, run `deploy_server` in that terminal.
    * If deploying both a server software change and a client software change, you can run `deploy_server && deploy_client` *in that order* and skip the next step.
1. If deploying a client software change, run `deploy_client` in that terminal.

## About the files

### `client/`

#### `client/api_test.html`

A page created early in the database and API design process to test the API endpoints. Has not been maintained, but should only require minor changes for use should a desire to do so arise.

#### Remainer of `client/`

A Firebase Web Hosting project primarily consisting of a JavaScript project which defines the code served to the client. The actual served code is within `client/404.html` (404 handler), `client/index.html` (app's containing page), and `client/src/` (app source). Written in the [Lit](https://lit.dev/) framework.

##### `client/src/components/`

Definitions for self-contained elements which do not encompass full pages, including script and render definition.

##### `client/src/pages/`

Definitions for self-contained elements which function as "pages" of the application, including script and render definition.

##### `client/src/innavator-shell.js`

The root of the application which is embedded into `client/index.html`.

##### `client/src/routes.js`

Mapping for routes for pages within the application, referenced within `client/src/innavator-shell.js`.

##### `client/src/innavator-api.js`

Definitions for all functional code pertinent to interfacing with the server.

##### `client/src/innavator-utils.js`

Utility code assisting with use of `client/src/innavator-api.js`.

##### `client/**/styles/`

Definitions for components' and pages' embedded stylesheets.

### `docs/`

Untouched documentation from the [original codebase](https://github.com/GoogleCloudPlatform/avocano).

### `OLD_FILES/`

Files which exist\[ed\] in a state prior to integration in the Google Cloud-suitable codebase.

### `provisioning/`

Stuff that shouldn't be touched without a deep familiarity with Google Cloud.

### `server/`

A Python project which defines the server database and the API used for clients to interact with that database. Written in the [Django](https://www.djangoproject.com/) framework and the [Django REST Framework (DRF)](https://www.django-rest-framework.org).

The most important of the code is documented below. Basic knowledge of the aforementioned frameworks, like by following their quickstart guides, is necessary especially for doing anything other than reading the model definitions.

#### `server/store/models.py`

The definitions for the database models, which the Django framework processes into SQL table definitions.

#### `server/store/views.py`, `server/store/urls.py`

The definitions for the API endpoint URLs, methods, and behaviors.

#### `server/store/permissions.py`

The classes used to define when API endpoint accesses are permitted.

#### `server/store/serializers.py`

The definitions for how models are serialized and deserialized to JSON.

#### `server/store/admin.py`

The definitions for what is included in the admin panel.

### `api_docs.txt`

Terse documentation for all intended API endpoints; `server/store/models.py` contains information regarding models which isn't detailed within.

### `.gcloudignore`

Like `.gitignore`, but the paths are ignored for any Google Cloud CLI uploads.
