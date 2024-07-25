FROM node:lts-iron as react-build

WORKDIR /app

# captures argument
ARG APP_VERSION=v0.0.1
ARG API_URL=http://localhost:8500
ARG CURRENCY=Rp.
ARG LOCALES=id-ID
ARG WEBSITE=https://sismedika.com/
ARG ABOUT_US="https://sismedika.com/#/about"
ARG GIT_COMMIT=NA
# e.g. latest, development, production
ARG VERSION=development

# set environment variables
ENV NODE_ENV=$VERSION
ENV VITE_APP_VERSION=$APP_VERSION
ENV VITE_API_URL=$API_URL
ENV VITE_CURRENCY=$CURRENCY
ENV VITE_LOCALES=$LOCALES
ENV VITE_WEBSITE=$WEBSITE
ENV VITE_ABOUT_US=$ABOUT_US

RUN echo "set ARG: [APP_VERSION] as $APP_VERSION"
RUN echo "set ARG: [API_URL] as $API_URL"
RUN echo "set ARG: [LOCALES] as $LOCALES"
RUN echo "set ARG: [WEBSITE] as $WEBSITE"
RUN echo "set ARG: [ABOUT_US] as $ABOUT_US"
RUN echo "set ARG: [GIT_COMMIT] as $GIT_COMMIT"
RUN echo "set ARG: [VERSION] as $VERSION"

RUN echo "set ENV: [NODE_ENV] as $NODE_ENV"
RUN echo "set ENV: [VITE_APP_VERSION] as $VITE_APP_VERSION"
RUN echo "set ENV: [VITE_API_URL] as $VITE_API_URL"
RUN echo "set ENV: [VITE_LOCALES] as $VITE_LOCALES"
RUN echo "set ENV: [VITE_WEBSITE] as $VITE_WEBSITE"
RUN echo "set ENV: [VITE_ABOUT_US] as $VITE_ABOUT_US"

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

# how to test: docker run --name farm-app --rm -it farm-app/1.0 bash

# ==== Final Image
FROM nginx:alpine

RUN apk add --no-cache tzdata
ENV TZ="Asia/Jakarta"

# how to test: docker run --name farm-app --rm farm-app/1.0 date
COPY --from=react-build /app/dist /usr/share/nginx/html
COPY --from=react-build /app/BUILD.txt /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
