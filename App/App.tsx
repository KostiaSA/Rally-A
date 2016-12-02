import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";
import {LoginPage} from "./pages/LoginPage";
import {getRandomString} from "./utils/getRandomString";
import {observable, autorun} from "mobx";
import {appState} from "./AppState";
import {observer} from "mobx-react";
import {CardPage} from "./pages/CardPage";
import {FlagPage} from "./pages/FlagPage";
import {CarsPage} from "./pages/CarsPage";



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

@observer
export class App extends React.Component<any,any> {


    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;

        this.pages = [];


        appState.cardPage = {
            icon: "fa-info-circle",
            color: "royalblue",
            content:<CardPage></CardPage>
        }
        this.pages.push(appState.cardPage);

        appState.flagPage = {
            icon: "fa-flag-checkered",
            color: "black",
            content:<FlagPage></FlagPage>
        }
        this.pages.push(appState.flagPage);

        let carPage: IAppPage = {
            icon: "fa-car",
            color: "coral",
            content:<CarsPage></CarsPage>
        }
        this.pages.push(carPage);


        let cogPage: IAppPage = {
            icon: "fa-cog",
            color: "gray",
            content:<div>cog</div>
        }
        this.pages.push(cogPage);

        appState.loginPage = {
            icon: "fa-user",
            color: "royalblue",
            content:<LoginPage/>
        }
        this.pages.push(appState.loginPage);
        appState.activePage = appState.loginPage;

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
        });
    };


    render(): any {
        let butPadding = 5;

        let navBarHiddenClass = "";
        if (appState.activePage === appState.loginPage)
            navBarHiddenClass = "hidden";

        return (
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
                    </div>
                </nav>
            </div>
        );
    }

}

