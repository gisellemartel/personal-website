// import * as angular from "angular";

import * as angular from "./node_modules/@types/angular/index";

const app = angular.module('app', []);

interface MainScope {
    displayName: string,
}

app.controller('AppCtrl', ($scope: MainScope) => {
    console.log("hello");
});