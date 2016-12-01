import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router"
import {App, app, setApp} from "./App";
import {getIsCordovaApp} from "./utils/getIsCordovaApp";
import {appState} from "./AppState";
import {getRandomString} from "./utils/getRandomString";
import moment = require("moment");
//import  {RouteHandler} from "react-router";
//import  {DefaultRoute} from "react-router";
//import  {Router, Route, DefaultRoute, RouteHandler, Link, NotFoundRoute} from "react-router";


moment.locale("ru");

if (!window.localStorage.getItem("sessionId")) {
    window.localStorage.setItem("sessionId", getRandomString());
}

appState.sessionId = window.localStorage.getItem("sessionId")!;
appState.login = window.localStorage.getItem("login")!;
appState.password = window.localStorage.getItem("password")!;


console.log("sessionId", appState.sessionId);
console.log("login", appState.login);
console.log("password", appState.password);
console.log("platform", platform);


if (getIsCordovaApp()) {

    var myapp = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            myapp.receivedEvent('deviceready');
            ReactDOM.render(<App ref={(e:any)=>setApp(e)}/>, document.body);

        },
        // Update DOM on a Received Event
        receivedEvent: function (id: any) {
            // var parentElement = document.getElementById(id);
            // var listeningElement = parentElement!.querySelector('.listening');
            // var receivedElement = parentElement!.querySelector('.received');
            //
            // listeningElement.setAttribute('style', 'display:none;');
            // receivedElement.setAttribute('style', 'display:block;');
            //
            // console.log('Received Event: ' + id);
        }
    };

    myapp.initialize();
}
else {
    ReactDOM.render(<App ref={(e:any)=>setApp(e)}/>, document.body);
}

