FROM node:lts-iron as build

WORKDIR /app

# captures argument
ARG APP_VERSION=v0.0.1
ARG API_URL=https://link-dev-apm-api-hisv3/api/v1
ARG APP_API_HOST_REST=https://link-dev-api-rest-hisv3/api/v1/birt
ARG APP_PUBLIC_KEY="---"
ARG CURRENCY=Rp.
ARG LOCALES=id-ID
ARG WEBSITE=https://link/
ARG ABOUT_US="https://link/#/about"
ARG GIT_COMMIT
ARG BUILD_TIME
ARG AUTHOR
ARG VERSION
ARG TAG

# set environment variables
ENV NODE_ENV=$VERSION
ENV VITE_APP_VERSION=$APP_VERSION
ENV VITE_APP_API_HOST=$API_URL
ENV VITE_APP_API_HOST_REST=$APP_API_HOST_REST
ENV VITE_CURRENCY=$CURRENCY
ENV VITE_LOCALES=$LOCALES
ENV VITE_WEBSITE=$WEBSITE
ENV VITE_ABOUT_US=$ABOUT_US
ENV VITE_APP_PUBLIC_KEY=$APP_PUBLIC_KEY
ENV GIT_COMMIT=$GIT_COMMIT
ENV BUILD_TIME=$BUILD_TIME
ENV AUTHOR=$AUTHOR
ENV VERSION=$VERSION
ENV VITE_APP_VERSION=$TAG

RUN echo "set ARG: [APP_VERSION] as $APP_VERSION"
RUN echo "set ARG: [API_URL] as $API_URL"
RUN echo "set ARG: [APP_API_HOST_REST] as $APP_API_HOST_REST"
RUN echo "set ARG: [LOCALES] as $LOCALES"
RUN echo "set ARG: [WEBSITE] as $WEBSITE"
RUN echo "set ARG: [ABOUT_US] as $ABOUT_US"
RUN echo "set ARG: [GIT_COMMIT] as $GIT_COMMIT"
RUN echo "set ARG: [VERSION] as $VERSION"
RUN echo "set ARG: [AUTHOR] as $AUTHOR"
RUN echo "set ARG: [BUILD_TIME] as $BUILD_TIME"
RUN echo "set ARG VITE_APP_VERSION=$TAG"

RUN echo "set ENV: [NODE_ENV] as $NODE_ENV"
RUN echo "set ENV: [VITE_APP_VERSION] as $VITE_APP_VERSION"
RUN echo "set ENV: [VITE_APP_API_HOST] as $VITE_APP_API_HOST"
RUN echo "set ENV: [VITE_LOCALES] as $VITE_LOCALES"
RUN echo "set ENV: [VITE_WEBSITE] as $VITE_WEBSITE"
RUN echo "set ENV: [VITE_ABOUT_US] as $VITE_ABOUT_US"
RUN echo "set ENV: [VITE_APP_PUBLIC_KEY]=$VITE_APP_PUBLIC_KEY"

# Copy files and folders
RUN echo "Commit: $GIT_COMMIT" > RELEASE \
    && echo "Build time: $BUILD_TIME" >> RELEASE \
    && echo "Author: $AUTHOR" >> RELEASE \
    && echo "version: $VERSION" >> RELEASE

# get current commit and create build number
# expects to echo only the first 8 chars of the git hash commit
RUN echo "${VERSION} -> ${GIT_COMMIT}" > BUILD.txt
# install
COPY . .

RUN yarn install --frozen-lockfile && yarn cache clean

ENV GENERATE_SOURCEMAP=false \
    NODE_OPTIONS="--max-old-space-size=4096"

RUN yarn build

# Stage 2: Production image with NGINX
FROM nginx:1.27.5-bookworm

RUN apt-get update && \
    apt-get install -y tzdata bash vim net-tools && \
    rm -rf /var/lib/apt/lists/*

RUN cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    echo "Asia/Jakarta" > /etc/timezone

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/RELEASE ./RELEASE
COPY .env /docker-entrypoint.d/.env
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]