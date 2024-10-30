#!/bin/bash

cd server
cp .env.local .env
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata demo_config.yaml
python manage.py runserver
