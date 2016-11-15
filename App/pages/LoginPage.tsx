import * as React from "react";
import * as ReactDOM from "react-dom";
import {NotifyResize} from "react-notify-resize";
//import {app} from "../App";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {IGetEncryptKeyReq, IGetEncryptKeyAns, GET_ENCRYPT_KEY_CMD, ILoginReq, ILoginAns, LOGIN_CMD} from "../api/api";
import {observable} from "mobx";


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

    @observable httpRequestRunning: boolean;

    handleButtonClick = ()=> {
        this.httpRequestRunning = true;
        httpRequest<IGetEncryptKeyReq,IGetEncryptKeyAns>({cmd: GET_ENCRYPT_KEY_CMD})
            .then((ans: IGetEncryptKeyAns)=> {
                this.httpRequestRunning = false;
                appState.encryptKey = ans.encryptKey;
                console.log(ans);

                let loginReq: ILoginReq = {
                    cmd: LOGIN_CMD,
                    login: "Sidorov",
                    password: "1"
                };

                httpRequest<ILoginReq,ILoginAns>(loginReq)
                    .then((a: any)=> {
                        appState.activePage = appState.flagPage;
                    })
                    .catch((err: any)=> {
                        alert(err);
                    });

            })
            .catch((err: any)=> {
                this.httpRequestRunning = false;
                alert(err);
            });
    };

    handleTest1Click = ()=> {


        // let x = {
        //     fa: "Иванов",
        //     im: "Авраам"
        // };
        //
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", 'api', true);
        // xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        // xhr.onload = function () {
        //     // do something to response
        //     console.log(JSON.parse(this.responseText));
        // };
        //
        //
        // xhr.send(JSON.stringify(x));

    };

    render(): any {
        console.log("render login page");

        let logoSize = 270;
        if (appState.winHeight < 600) {
            logoSize = 130;
            console.log("logosize ", logoSize);
        }


        let butContent: any = "Авторизация";
        if (this.httpRequestRunning)
            butContent =<span>Авторизация <i className="fa fa-circle-o-notch fa-spin fa-fw"></i></span>;

        return (
            <div className="container">
                <div className="row">
                    {/*<NotifyResize onResize={this.onResize}/>*/}
                    <div className="col-sm-6 col-sm-offset-3">
                        <div className="text-center" style={{ height:logoSize, paddingTop:15,overflow:"hidden"}}>
                            <img src={`img/login${logoSize}.jpg`} style={{}}/>
                        </div>
                        <h2 className="text-center">Северный лес</h2>
                        <div className="form">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><span
                                        className="fa fa-user"></span></span>
                                    <input type="text" className="form-control" placeholder="Логин" required
                                           disabled={this.httpRequestRunning}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><span
                                        className="fa fa-lock"></span></span>
                                    <input type="password" className="form-control" placeholder="Пароль" required
                                           disabled={this.httpRequestRunning}/>
                                </div>
                            </div>
                            <button className="btn btn-default" onClick={this.handleButtonClick}
                                    disabled={this.httpRequestRunning}>
                                {butContent}
                            </button>
                            <button className="btn btn-default" onClick={this.handleTest1Click}
                                    disabled={this.httpRequestRunning}>Test1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}