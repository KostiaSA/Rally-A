import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";
import {LoginPage} from "./pages/LoginPage";
import {getRandomString} from "./utils/getRandomString";
import {observable, autorun} from "mobx";
import {appState} from "./AppState";
import {observer} from "mobx-react";

export interface IAppPage {
    icon: string;
    color: string;
    content: React.ReactElement<any>;
    onClick?: ()=>void;
}

export let app: App;

export function setApp(_app: App) {
    app = _app;

    // autorun(() => {
    //     if (app)
    //         console.log("app.winHeight " + appState.winHeight);
    //     else
    //         console.log("жопа ")
    // })
}

@observer export class App extends React.Component<any,any> {


    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;

        this.pages = [];

        appState.loginPage = {
            icon: "fa-user",
            color: "royalblue",
            content:<LoginPage/>
        }
        this.pages.push(appState.loginPage);
        appState.activePage = appState.loginPage;

        appState.flagPage = {
            icon: "fa-flag-checkered",
            color: "black",
            content:<div>flag</div>
        }
        this.pages.push(appState.flagPage);

        let carPage: IAppPage = {
            icon: "fa-car",
            color: "coral",
            content:<div>car</div>
        }
        this.pages.push(carPage);

        let cardPage: IAppPage = {
            icon: "fa-id-card-o",
            color: "olive",
            content:<div>card</div>
        }
        this.pages.push(cardPage);

        let cogPage: IAppPage = {
            icon: "fa-cog",
            color: "gray",
            content:<div>cog</div>
        }
        this.pages.push(cogPage);

        let chevronPage: IAppPage = {
            icon: "fa-chevron-right",
            color: "gray",
            content:<div>chevron</div>
        }
        this.pages.push(chevronPage);
    }

    nativeTabs: Element;
    pages: IAppPage[];


    handlePageClick() {

    }

    componentDidMount() {
        window.addEventListener("resize", ()=> {
            appState.winWidth = $(window).width();
            appState.winHeight = $(window).height();
            this.forceUpdate();
            console.log(appState.winWidth, appState.winHeight);
        });
    };


    render(): any {
        console.log("render app");
        let butPadding = 5;

        let navBarHiddenClass = "";
        if (appState.activePage === appState.loginPage)
            navBarHiddenClass = "hidden";

        return (

            // <ul className="nav nav-pills">
            //     <li className="active"><a href="#">Home</a></li>
            //     <li ><a href="#">Profile</a></li>
            //     <li ><a href="#">Messages</a></li>
            // </ul>


            <div>
                <div className="content">
                    {this.pages.map<React.ReactElement<any>>((item: IAppPage, index: number)=> {
                        return (
                            <div key={index} className={item!==appState.activePage?"hidden":""}>{item.content}</div>
                        )
                    })}
                </div>
                <nav className={"navbar navbar-default navbar-fixed-bottom "+navBarHiddenClass}>
                    <div className="btn-group" role="group" style={{padding:5, textAlign:"center"}}>
                        {this.pages.map<React.ReactElement<any>>((item: IAppPage, index: number)=> {

                            let onclick = ()=> {
                                console.log("cl1");
                                appState.activePage = item;
                                this.forceUpdate();
                            };

                            return (
                                <div key={index} type="button" className="btn btn-default" onClick={onclick}>
                                    <i className={"fa "+item.icon} onClick={onclick}
                                       style={{fontSize:20,color:item.color,paddingLeft:butPadding,paddingRight:butPadding}}></i>
                                </div>
                            )
                        })}

                        {/*// <button type="button" className="btn btn-default">*/}
                        {/*//     <i className="fa fa-flag-checkered"*/}
                        {/*//        style={{fontSize:20,color:"black",paddingLeft:butPadding,paddingRight:butPadding}}></i>*/}
                        {/*// </button>*/}
                        {/*// <button type="button" className="btn btn-default">*/}
                        {/*//     <i className="fa fa-car"*/}
                        {/*//        style={{fontSize:20,color:"coral",paddingLeft:butPadding,paddingRight:butPadding}}></i>*/}
                        {/*// </button>*/}
                        {/*<button type="button" className="btn btn-default">*/}
                        {/*<i className="fa fa-id-card-o"*/}
                        {/*style={{fontSize:20,color:"olive",paddingLeft:butPadding,paddingRight:butPadding}}></i>*/}
                        {/*</button>*/}
                        {/*<button type="button" className="btn btn-default">*/}
                        {/*<i className="fa fa-cog"*/}
                        {/*style={{fontSize:20,color:"gray",paddingLeft:butPadding,paddingRight:butPadding}}></i>*/}
                        {/*</button>*/}
                        {/*<button type="button" className="btn btn-default">*/}
                        {/*<i className="fa fa-chevron-right"*/}
                        {/*style={{fontSize:20,color:"gray",paddingLeft:butPadding,paddingRight:butPadding}}></i>*/}
                        {/*</button>*/}
                    </div>
                </nav>
            </div>
        );
    }

}

