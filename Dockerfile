FROM node:lts-iron as react-build

WORKDIR /app

# captures argument
ARG APP_VERSION=v0.0.1
ARG API_URL=https://dev-apm-api-hisv3.sismedika.online
ARG BASE_URL=https://APM.com/$VITE_APP_PLATFORM_NAME/VITE_APP_HOSPITAL_NAME
ARG PLATFORM_NAME='Mandiri'
ARG HOSPITAL_NAME='Primaya Hospital'
ARG PUBLIC_KEY="INI PUB KEY"
ARG GIT_COMMIT=NA
# e.g. latest, development, production
ARG VERSION=development

# set environment variables
ENV NODE_ENV=$VERSION
ENV VITE_APP_VERSION=$APP_VERSION
ENV VITE_APP_API_HOST=$API_URL
ENV VITE_APP_URL_NAME=$BASE_URL
ENV VITE_APP_HOSPITAL_NAME=$HOSPITAL_NAME
ENV VITE_APP_PLATFORM_NAME=$PLATFORM_NAME
ENV VITE_APP_PUBLIC_KEY=$PUBLIC_KEY

RUN echo "set ARG: [APP_VERSION] as $APP_VERSION"
RUN echo "set ARG: [API_URL] as $API_URL"
RUN echo "set ARG: [URL_NAME] as $URL_NAME"
RUN echo "set ARG: [PLATFORM_NAME] as $PLATFORM_NAME"
RUN echo "set ARG: [HOSPITAL_NAME] as $HOSPITAL_NAME"
RUN echo "set ARG: [GIT_COMMIT] as $GIT_COMMIT"
RUN echo "set ARG: [VERSION] as $VERSION"

RUN echo "set ENV: [NODE_ENV] as $NODE_ENV"
RUN echo "set ENV: [VITE_APP_VERSION] as $VITE_APP_VERSION"
RUN echo "set ENV: [VITE_APP_URL_NAME] as $VITE_APP_URL_NAME"
RUN echo "set ENV: [VITE_APP_API_HOST] as $VITE_APP_API_HOST"
RUN echo "set ENV: [VITE_APP_HOSPITAL_NAME] as $VITE_APP_HOSPITAL_NAME"
RUN echo "set ENV: [VITE_APP_PLATFORM_NAME] as $VITE_APP_PLATFORM_NAME"
RUN echo "set ENV: [VITE_APP_PUBLIC_KEY] as $VITE_APP_PUBLIC_KEY"

# Copy files and folders
COPY . ./

# get current commit and create build number
# expects to echo only the first 8 chars of the git hash commit
RUN echo "${VERSION} -> ${GIT_COMMIT}" > BUILD.txt

# install
RUN npm install
RUN npm install -g vite

# Builds node application
RUN npm run build

# how to test: docker run --name apem-frontend --rm -it apem-frontend/1.0 bash

# ==== Final Image
FROM nginx:alpine

RUN apk add --no-cache tzdata
ENV TZ="Asia/Jakarta"

# how to test: docker run --name apem-frontend --rm apem-frontend/1.0 date
COPY --from=react-build /app/dist /usr/share/nginx/html
COPY --from=react-build /app/BUILD.txt /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
