@echo off

pushd .
cd server

echo When interrupting with Ctrl-C or Ctrl-Break, choose N to ensure the directory traversal is cleaned up.
echo:

copy .env.local .env
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata demo_config.yaml
python manage.py runserver

popd
