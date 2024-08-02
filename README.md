## Prerequisites

- Node.js 20.x (Recommended)

## Installation

**Using Yarn (Recommended)**

```sh
yarn install
yarn dev
```

**Using Npm**

```sh
npm i
npm run dev
```

## Build

```sh
yarn build
# or
npm run build
```

## Mock server

By default we provide demo data from : `https://api-dev-minimal-[version].vercel.app`

To set up your local server:

- **Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

- **Resource:** [Download](https://www.dropbox.com/sh/6ojn099upi105tf/AACpmlqrNUacwbBfVdtt2t6va?dl=0).

## Full version

- Create React App ([migrate to CRA](https://docs.minimals.cc/migrate-to-cra/)).
- Next.js
- Vite.js

## Starter version

- To remove unnecessary components. This is a simplified version ([https://starter.minimals.cc/](https://starter.minimals.cc/))
- Good to start a new project. You can copy components from the full version.
- Make sure to install the dependencies exactly as compared to the full version.

## Deployment

* Build image
```shell
docker build -t sismedika/apem-app:develop . --build-arg API_URL=https://dev-apem-api.sismedika.online/ --build-arg GIT_COMMIT=$(git rev-parse HEAD) --build-arg VERSION=develop
```
* Deploy

## Publish as a library

* [Good article] as starter
  * need to create library, proxy, and group

  [Good article]: https://medium.com/@mehdighorbanin/step-by-step-guide-publishing-private-npm-packages-to-nexus-6f818093c369

* Make sure to set the `private` as `false` in `package.json` file
```shell
{
  "name": "@minimal-kit/vite-ts",
  "author": "Minimals",
  "version": "6.0.1",
  "description": "Vite & TypeScript",
  "private": false, ----------------------------> this one
  ...
}
```

* step 1: Login NPM
```shell
npm login --registry=https://repository.sismedika.online/repository/his-library/ --always-auth  --userconfig=./.npmrc
```

* step 2: add user to NPM
```shell
npm adduser --registry=https://repository.sismedika.online/repository/his-library --always-auth
```

* step 3: publish to registry
```shell
npm publish --registry=https://repository.sismedika.online/repository/his-library
```

## Sub Module(s)
* Adding sub module to this repo
  ```shell
  git submodule add -f git@github.com:developersismedika/apem-graphql-http-files.git _resources/http-requests && git submodule update --remote
  ```
* Adding Git SubModule for http files (first time ONLY)
  ```shell
    git submodule init &&
    git submodule update &&
    git pull --recurse-submodules
  ```
* Update git submodule
  ```shell
    git submodule update --remote
  ```

---

**NOTE:**
_When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly._
