import * as React from "react";
import * as ReactDOM from "react-dom";
import {Button} from "./components/Button";
import {Router, Route, Link} from "react-router";
import {LoginPage} from "./pages/LoginPage";
import TabsOptions = jqwidgets.TabsOptions;
import {getRandomString} from "./utils/getRandomString";

interface IPage {
    icon: string;
    color: string;
    content: React.ReactElement<any>;
    onClick?: ()=>void;
}


export class App extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;

        this.pages = [];

        let loginPage: IPage = {
            icon: "fa-user",
            color: "royalblue",
            content:<LoginPage/>
        }
        this.pages.push(loginPage);
        this.activePage = loginPage;

        let flagPage: IPage = {
            icon: "fa-flag-checkered",
            color: "black",
            content:<div>flag</div>
        }
        this.pages.push(flagPage);

        let carPage: IPage = {
            icon: "fa-car",
            color: "coral",
            content:<div>car</div>
        }
        this.pages.push(carPage);

        let cardPage: IPage = {
            icon: "fa-id-card-o",
            color: "olive",
            content:<div>card</div>
        }
        this.pages.push(cardPage);

        let cogPage: IPage = {
            icon: "fa-cog",
            color: "gray",
            content:<div>cog</div>
        }
        this.pages.push(cogPage);

        let chevronPage: IPage = {
            icon: "fa-chevron-right",
            color: "gray",
            content:<div>chevron</div>
        }
        this.pages.push(chevronPage);
    }

    nativeTabs: Element;
    activePage: IPage;
    pages: IPage[];

    handlePageClick(){

    }

    componentDidMount() {

    };


    render(): any {

        let butPadding = 5;

        return (

            // <ul className="nav nav-pills">
            //     <li className="active"><a href="#">Home</a></li>
            //     <li ><a href="#">Profile</a></li>
            //     <li ><a href="#">Messages</a></li>
            // </ul>

            <div>
                <div className="content">
                    {this.pages.map<React.ReactElement<any>>((item: IPage,index:number)=> {
                        return (
                            <div key={index} className={item!==this.activePage?"hidden":""}>{item.content}</div>
                        )
                    })}
                </div>
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="btn-group" role="group" style={{padding:5, textAlign:"center"}}>
                        {this.pages.map<React.ReactElement<any>>((item: IPage,index:number)=> {

                            let onclick=()=>{
                                console.log("cl1");
                                this.activePage=item;
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