# Task Blog Backend

## API Root URL

https://pacific-ridge-81267.herokuapp.com/

# OpenAPI Docs

## Swagger

https://pacific-ridge-81267.herokuapp.com/swagger

## Redoc

https://pacific-ridge-81267.herokuapp.com/redoc

## Run locally

- `blog_backend` must be the current folder

- Activate virtual env or create a new one (and activate it after)

  ```python
  python -m venv <virtual env path>   # create
  . ./env/bin/activate                # activate
  ```

- Install pip libraries

  ```
  pip install -r requirements.txt
  ```

- ### DB setup (first time only)
  ```
  python manage.py makemigrations
  python manage.py migrate
  ```
- Run server

  ```
  python manage.py runserver
  ```

- Test endpoints
  ```
  coverage run manage.py test
  ```

# DevOps

## Push to Heroku

- From root folder (task-blog)
  ```
  git subtree --prefix blog_backend push heroku master
  ```
