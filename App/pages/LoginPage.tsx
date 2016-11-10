import * as React from "react";
import * as ReactDOM from "react-dom";
import {NotifyResize} from "react-notify-resize";
//import {app} from "../App";
import {observer} from "mobx-react";
import {appState} from "../AppState";


//import  NotifyResize = require("react-notify-resize");

export interface ILoginPageProps {

}

@observer
export class LoginPage extends React.Component<ILoginPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {
    };

    // onResize = (event: { width: number, height: number })=> {
    //     console.log(event);
    // }

    handleButtonClick=()=>{
        appState.activePage=appState.flagPage;
    };

    render(): any {
        console.log("render login page");

        let logoSize=270;
        if (appState.winHeight<600) {
            logoSize = 130;
            console.log("logosize ",logoSize);
        }




        return (
            <div className="container">
                <div className="row">
                    {/*<NotifyResize onResize={this.onResize}/>*/}
                    <div className="col-sm-6 col-sm-offset-3">
                        <div  className="text-center" style={{ height:logoSize, paddingTop:15,overflow:"hidden"}}>
                            <img src={`img/login${logoSize}.jpg`} style={{}}/>
                        </div>
                        <h2 className="text-center">Северный лес</h2>
                        <div className="form">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><span
                                        className="fa fa-user"></span></span>
                                    <input type="text" className="form-control" placeholder="Логин" required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><span
                                        className="fa fa-lock"></span></span>
                                    <input type="password" className="form-control" placeholder="Пароль" required/>
                                </div>
                            </div>
                            <button className="btn btn-default" onClick={this.handleButtonClick}>Вход</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}