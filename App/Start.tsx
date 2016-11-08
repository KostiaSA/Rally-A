import * as  React from "react";
import * as  ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router"
import {App} from "./App";
//import  {RouteHandler} from "react-router";
//import  {DefaultRoute} from "react-router";
//import  {Router, Route, DefaultRoute, RouteHandler, Link, NotFoundRoute} from "react-router";




var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        ReactDOM.render(<App/>, document.body);

    },
    // Update DOM on a Received Event
    receivedEvent: function(id:any) {
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

app.initialize();


/* Components */
//
// var App = React.createClass({
//     render: function () {
//         return (
//             <div className="App">
//                 <div id="header"></div>
//                 <div>content</div>
//                 <div id="footer"></div>
//             </div>
//         );
//     }
// });
//
// var Header = React.createClass({
//     render: function () {
//         return <p>This is the header:<Router.RouteHandler/></p>;
//     }
// });
//
// var Footer = React.createClass({
//     render: function () {
//         return <p>This is the footer:<RouteHandler/></p>;
//     }
// });
//
// var Default = React.createClass({
//     render: function() {
//         return <span>default view</span>;
//     }
// });
//
// var HeaderView1 = React.createClass({
//     render: function() {
//         return <span>header view one</span>;
//     }
// });
//
// var FooterView1 = React.createClass({
//     render: function() {
//         return <span>footer view one</span>;
//     }
// });
//
// var Null = React.createClass({
//     render: function() {
//         return false;
//     }
// });
//

//
// /* Routes */
//
// var headerRoutes = (
//     <Route name="header" path="/"  handler={Header}>
//         <Route name="view1" handler={HeaderView1}/>
//         <DefaultRoute handler={Default}/>
//         <NotFoundRoute handler={Null}/>
//     </Route>
// );
//
// Router.run(headerRoutes, function (Handler) {
//     React.render(<Handler/>, document.getElementById('header'));
// });
//

// var footerRoutes = (
//     <Route name="footer" path="/" handler={Footer}>
//         <Route name="view1" handler={FooterView1}/>
//         {/*<DefaultRoute handler={Default}/>*/}
//         {/*<NotFoundRoute handler={Null}/>*/}
//     </Route>
// );
//
// Router.run(footerRoutes, function (Handler) {
//     React.render(<Handler/>, document.getElementById('footer'));
// });