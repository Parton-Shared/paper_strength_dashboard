### FIRST STAGE - BUILD VUEXY APP

# get/use node image for the build env
FROM node:16-alpine AS build-env

# get bash for interactive shell
RUN apk add --no-cache bash

# define working directory as the home directory
WORKDIR /home/node

# copy dependency and config related files to the image
COPY    .browserslistrc \
        babel.config.js \
        jsconfig.json \
        package.json \
        postcss.config.js \
        themeConfig.js \
        vue.config.js \
        yarn.lock \
        ./

# install core-js
RUN npm install core-js

# install the project dependencies with yarn
RUN yarn install

# copy project files
COPY ./public ./public
COPY ./src ./src

# build the vue.js project
RUN yarn run build



### END STAGE - FINAL VUEXY APP SERVE IMAGE BUILD

# get/use nginx to serve built web app in final image
FROM nginx:stable-alpine AS final-image

# specify the port to be exposed
EXPOSE 80

# copy the built web app into the nginx default directory
COPY --from=build-env /home/node/dist /usr/share/nginx/html/