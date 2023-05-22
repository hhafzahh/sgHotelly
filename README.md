# BookingApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.
This is a web application named SGHotelly which helps to list all the hotels available using MongoDB and able to utilize CRUD request based on Role-Based-Authorization
This web application has a login/register functionality using JWT token,book & pay hotel using STRIPE technology to validate cards and payment(for developement sake, we use test cards), generates receipt using PDF.makejs to give a pdf of the booking receipt, and lastly have filter/sort hotels with the use of angular pipelines

## Use Case Flows 
the image below will give an overall view of all the access to the features and the actors
![image](https://user-images.githubusercontent.com/94510297/157640552-03b50f16-c264-475a-827f-377b8622683b.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
