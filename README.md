# BEAMIFY.ME: Project BEME
#### BACKEND

## Description
This is the backend of the project BEAMIFY.ME. It is a RESTful Microservice API that provides functionalities to a host of services, which are provided as **Solutions** to be used 
by a frontend application. Essentially the backend is a BaaS (Backend as a Service). Fully built using [Nest Js]().

You can see and use our [API](https://api.beamify.me), which is fully documented. You only need to activate your **Dev Account** to get access to the API. This will then give you 
access to the API documentation, which details how to use our API.

## Easy Deployment
It's easy enough to deploy and use the backend. First you will need to update the .env.example and save it as .env.

API ENV
```bash
cp apps/api/.env.example apps/api/.env
```
DISCORD ENV
```bash
cp apps/discord/.env.example apps/api/.env
```

Then update the .env file with the necessary environment variables for your environment.  
You can then 'Build' the docker image for each application.
```code
npm run docker:build:api
npm run docker:build:discord
```
And deploy the image to docker
```code
npm run docker:serve:api
npm run docker:serve:discord
```
If you use something like [Portainer]() for your docker management, you can easily deploy the images to your server, as we've provided a [Stack YML](config/yaml/stack.yml).

You can access the Swagger API documentation at [API](http://localhost:3021/v1), you must have the variable set to 'development' otherwise you can't use the swagger
documentation under 'production' and loads the production documentation.
