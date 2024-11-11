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

- Run the web app and spin up the MongoDB
  - `docker compose up --bulid`
- Checkout the website
  - http://localhost:5001
- Changes are reflected automatically without restarting

## Clean up

- Shut down the web app and DB
  - `docker compose down`

# Deploy to the preview environment

1. 

## Troubleshoot

### Show errors when running `docker compose up --build`

`error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: `` `

> You should delete the line with credsStore from ~/.docker/config.json or rename credsStore to credStore.