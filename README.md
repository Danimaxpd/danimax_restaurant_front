# FrontEnd of danimax_restaurant

A GUI for a simple user consume the lambda endpoints in aws or local.

## BackEnd Project

[https://github.com/Danimaxpd/danimax_restaurant](https://github.com/Danimaxpd/danimax_restaurant)

## How to run in your Local Machine

- Requirements:
  - Node minimum version 16 LTS
  - NPM
  - The BackEnd already running and the URL of that backend.

### Steps

1. Create a `.env` file base on `.env-example` and fill the global environments.
2. To run
   - In your console:
     - `npm i` Install all the dependencies
     - `npm run serve` Compiles and hot-reloads for development

### `.ENV` documentation

- **APP**
  - _VUE_APP_BACKEND_API_URL_ URL to hit API backend

## Available Scripts

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
