# Setup
How to setup the project

## Backend
` - cd backend
  - pip install pipenv
  - pipenv shell / .\venv\Scripts\activate
  - pipenv install
`

## Frontend
` - npm i
  - cd frontend
  - npm i
`

# Run the project
`
  - cd backend
  - python manage.py makemigrations
  - python manage.py migrate
  - python manage.py runserver
  - cd ..\frontend\
  - npm run dev
`

# Vite + React
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
