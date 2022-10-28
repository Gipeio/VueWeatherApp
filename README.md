## Overview

The Vue Weather App is the application created for the following blog post on [TestDriven.io](https://testdriven.io):

[A Guide to Unit Testing Vue Components](https://testdriven.io/blog/vue-unit-testing/)

<a href="https://testdriven.io/blog/vue-unit-testing/"><img src="/src/assets/guide_unit_tesing_vue_components.png" alt="Vue Weather App Social Card" width="500"/></a>

## Website

The Vue Weather App is deployed via Netlify:

[Vue Weather App - Netlify](https://snazzy-taffy-cd99f4.netlify.app)

## Description

The Vue Weather App allows the user to search for the current weather for a city.  This application was developed to provide examples of how to unit test Vue components.

This guide uses the following technologies/tools:

1. [Vue 3](https://vuejs.org) (with the [Composition API](https://vuejs.org/guide/introduction.html#api-styles))
1. [vite](https://vitejs.dev)
1. [vitest](https://vitest.dev)
1. [vue-test-utils](https://test-utils.vuejs.org)

## Example

<img src="/src/assets/vue_weather_app_screenshot.png" alt="Vue Weather App Screenshot" width="420"/>

## Installation Instructions

These instructions demonstrate how to create the Vue Weather App locally on your computer.

### Pre-requisites

The Vue tooling utilizes `npm` for its set of tools to help develop Vue applications.

Before starting, make sure that the following tools are installed on your computer:

* [Node](https://nodejs.org/en/)
* [npm (Node Package Manager)](https://www.npmjs.com)

The first step in this installation process is downloading Node and npm (Node Package Manager); they are conveniently installed together.  Follow the installation instructions at [https://nodejs.org/en/](https://nodejs.org/en/).

After the installation is complete, you can check that Node is installed by going to your command line (i.e., terminal) and checking the version of Node and npm that are installed:

```sh
$ node -v
v16.16.0

$ npm -v
8.13.2
```

### Installation

If you would like to run the Vue Weather App on your local machine, you will need to follow these instructions:

```sh
$ git clone git@gitlab.com:patkennedy79/vue-weather-app.git
$ cd vue-weather-app
$ npm install
```

Additionally, you will need to create a free account at [Open Weather](https://openweathermap.org) and get an API key for using their API service.  The API key can be found in your account page under the 'API Keys' tab.  The API key needs to be included via the `VITE_OPEN_WEATHER_API_KEY` environment variable.  For local developement, create a *env.local* file in the top-level folder of the project:

```sh
VITE_OPEN_WEATHER_API_KEY=<INSERT_OPEN_WEATHER_API_KEY>
```

## Running the Application

All the `npm` commands that can be run for the project are defined in the `"scripts"` section of *package.json*.

### Run Development Server (with hot-reload)

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with Vitest

```sh
npm run test:unit
```

### Check Coverage of Unit Tests

```sh
npm run test:coverage
```

### Check Coverage Results on Webpage

```sh
npm run test:ui
```

### Lint with ESLint

```sh
npm run lint
```

## Additional Resources

Vue Documentation: [https://vuejs.org](https://vuejs.org)
