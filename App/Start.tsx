import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router"
import {App, app, setApp} from "./App";
import {getIsCordovaApp} from "./utils/getIsCordovaApp";
import {appState} from "./AppState";
import {getRandomString} from "./utils/getRandomString";
import moment = require("moment");
import Notifications, {notify} from "react-notify-toast";
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
            //navigator.geolocation.getCurrentPosition((pos:Position)=>{console.log(new Date(pos.timestamp))});
            ReactDOM.render(<App ref={(e:any)=>setApp(e)}/>, document.body);

            if ((window as any).device.model === "T72HM3G")
                $("meta[name=viewport]").attr("content", "initial-scale=1.4");

            ///////////////////////////////////////////////////
            ///////////////////////////////////////////////////

            // // Implement this in `deviceready` event callback
            // ((window as any)["AdvancedGeolocation"] as any).start(function (success:any) {
            //
            //         try {
            //             var jsonObject = JSON.parse(success);
            //             console.log(jsonObject);
            //             console.log(jsonObject.provider, new Date(jsonObject.timestamp));
            //
            //             // switch (jsonObject.provider) {
            //             //     case "gps":
            //             //         break;
            //             //
            //             //     case "network":
            //             //         break;
            //             //
            //             //     case "satellite":
            //             //         break;
            //             //
            //             //     case "cell_info":
            //             //         break;
            //             //
            //             //     case "cell_location":
            //             //         break;
            //             //
            //             //     case "signal_strength":
            //             //         break;
            //             // }
            //         }
            //         catch (exc) {
            //             console.log("Invalid JSON: " + exc);
            //         }
            //     },
            //     function (error:any) {
            //         console.log("ERROR! " + JSON.stringify(error));
            //     },
            //     ////////////////////////////////////////////
            //     //
            //     // REQUIRED:
            //     // These are required Configuration options!
            //     // See API Reference for additional details.
            //     //
            //     ////////////////////////////////////////////
            //     {
            //         "minTime": 500,         // Min time interval between updates (ms)
            //         "minDistance": 1,       // Min distance between updates (meters)
            //         "noWarn": true,         // Native location provider warnings
            //         "providers": "gps",     // Return GPS, NETWORK and CELL locations
            //         "useCache": false,       // Return GPS and NETWORK cached locations
            //         "satelliteData": false, // Return of GPS satellite info
            //         "buffer": false,        // Buffer location data
            //         "bufferSize": 0,        // Max elements in buffer
            //         "signalStrength": false // Return cell signal strength data
            //     });


            ///////////////////////////////////////////////////
            ///////////////////////////////////////////////////


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

