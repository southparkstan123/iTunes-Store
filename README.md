# iTunes Store

## Overview
The SPA for fetching the free apps and recommended apps in iOS with searching feature. And support following languages:

1. English
2. Traditional Chinese (Hong Kong)
3. Japanese

## Skill Set

1. React
2. Vite
3. Typescript
4. TailwindCSS

## Setup the app locally

1. Clone the git repo
2. Run `yarn install` to install the dependencies for the app

### Start-up the app in development mode

1. Run `yarn run dev`
2. Open http://localhost:8000 in web browser

### Start-up the app in production mode

1. Run `yarn run build && yarn run preview`
2. Open http://localhost:8000 in web browser

## <i>Alternative</i> Setup the environment on Docker

### Build the Docker Container

1. Clone the git repo

2. Run the following command to build the image on your local machine and start the container:

```bash
docker-compose up --build --no-recreate -d
```

If the image on your local machine was built, run the following command to start the container:

```bash
docker-compose up -d
```

### Build and start the Application

1. Access to the container and then execute the commands

```bash
docker exec -it vite_docker sh
```

2. Install the node packages on the container by following command:

```bash
yarn install
```

<i>Troubleshooting</i> You may delete and reinstall the packages by:

```bash
rm -rf node_modules && yarn install
```

3. Start the app by the following command:

```bash
# For development mode
yarn run dev
```

or

```bash
# For production mode
yarn run build && yarn run preview
```

4. Open http://localhost:8000 in web browser

## Unit Test

TBC

## Fix lint problems

Run `yarn lint` 

## Type checking

Run `yarn tsc`

Happy coding :)