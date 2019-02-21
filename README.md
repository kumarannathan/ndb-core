[![Build Status](https://travis-ci.org/NGO-DB/ndb-core.svg?branch=master)](https://travis-ci.org/NGO-DB/ndb-core)
[![Code Climate](https://codeclimate.com/github/NGO-DB/ndb-core/badges/gpa.svg)](https://codeclimate.com/github/NGO-DB/ndb-core)

# Aam Digital
Empowering NGOs' social workers with simple to use (database) software.

For a project outline, free demo system, etc. visit [www.aam-digital.com](https://www.aam-digital.com/demo)

**This is an Angular2/Typescript based rewrite of [HELGO DB](https://github.com/NGO-DB/helgo_db)**



-----

# Installation
The project depends on a couple of tools which are required for development. Please make sure you have the following installed:
- [npm (NodeJS)](https://www.npmjs.org/)

You can simply `git clone` this repository to get all the code with its configuration and requirements.
Then install the dependencies with
```
npm install
```


## Deployment
1. Run `ng build -prod` to build the project and copy the resulting files from the `dist/` directory to your webhost.
2. Create a config file at `assets/config.json` by copying the default config `assets/config.default.json` (the default config file is used as a fallback and replace with every updated build, your `config.json` file will not be overwritten by updates). Adapt the settings, especially regarding the CouchDB server that should be used for server-side synchronisation.

### Updates
To update to a newer code base, simply repeat these steps and overwrite your existing files.

Users currently have to actively reload (`Ctrl+F5`) the page due to the offline caching to get the latest version. The UI displays a popup with the latest changes the first time a user sees the new version of the app.



-----

# Development
The **[developer documentation is at the Wiki](https://github.com/NGO-DB/ndb-core/wiki)**. There you can find details about the architecture and instructions on how to add different entities, demo data or unit tests.



## Using Angular CLI

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding (Generate new modules and components)

You can use [Angular CLI](https://angular.io/cli/generate) to add new code to the project. Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Build

Run `ng build -prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## Server side logging

The service side logging is performed via the [sentry.io](https://sentry.io/ewb/aam-digital/) logging service. 
The credentials for the EWB-Account can be found in the `podio` workspace.



## Contribute
Please read through the [Contribution Guidelines](https://github.com/NGO-DB/ndb-core/wiki/Contribution-Guidelines) if you want to contribute code to this project.
