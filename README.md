# profile
cs633 #1

# Tech stack

## Frontend
- HTML
- JavaScript
- CSS

## Backend
- Python (Flask)

## Deployment
- [Vercel](https://vercel.com/docs)
- Atlas Mongo

# Directory Structures

## app

- All backend-related code is managed under this folder

## static

- All static resources, including the following, but not limited to, are hosted here:
  - CSS
  - Assets
    - img
  - JavaScripts

## templates
- All HTML files

# Local Development

## Prerequisite
- Install Docker
  - [MacOS](https://docs.docker.com/desktop/setup/install/mac-install/)
  - [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)

## Get started

1. Run the web app and spin up the MongoDB
    - `docker compose up --build`
2. Checkout the website
    - http://localhost:5001
3. Code changes are reflected automatically without restarting

## Clean up

- Shut down the web app and DB
  - `docker compose down`

# Deploy to the preview environment

1. After local development, commit your changes and push commit to the remote branch
2. Raise a Pull Requset for your branch against the `main` branch
    - ![alt text](<docs/pull request.png>)
3. Click the **"Vist Preview"** under the **Preview** column
4. Verify the web app deployed by Vercel

# Deploy to production environment
1. If everything works in the preview environment, merge it to the `main` branch
2. Vercel will then deploy the web app to the production environment on [profile-cs633.vercel.app](https://profile-cs633.vercel.app)


## Troubleshoot

### Show errors when running `docker compose up --build`

`error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: `` `

> You should delete the line with credsStore from ~/.docker/config.json or rename credsStore to credStore.

# API

- Get a list of users
  - **GET** method 
    - Default `/api/users`
    - With params `/api/users/<start_index>/<amount of users>`
- Get a user by ID
  - **GET** method `/api/user/<user_id>`
- Create a user
  - **POST** method `/api/user`