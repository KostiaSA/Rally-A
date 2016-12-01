import * as React from "react";
import * as ReactDOM from "react-dom";
import {NotifyResize} from "react-notify-resize";
//import {app} from "../App";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {IGetEncryptKeyReq, IGetEncryptKeyAns, GET_ENCRYPT_KEY_CMD, ILoginReq, ILoginAns, LOGIN_CMD} from "../api/api";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import {getIsCordovaApp} from "../utils/getIsCordovaApp";
import {showModal} from "../modals/showModal";
import {AndroidDownloadModal} from "../modals/AndroidDownloadModal";
import {config} from "../config/config";


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


    @observable httpRequestRunning: boolean;

    handleButtonClick = () => {
        let timeIndex = setTimeout(() => {
            this.httpRequestRunning = true;
        }, 500);

        httpRequest<IGetEncryptKeyReq,IGetEncryptKeyAns>({cmd: GET_ENCRYPT_KEY_CMD})
            .then((ans: IGetEncryptKeyAns) => {

                appState.encryptKey = ans.encryptKey;

                let loginReq: ILoginReq = {
                    cmd: LOGIN_CMD,
                    login: appState.login,
                    password: appState.password
                };

                httpRequest<ILoginReq,ILoginAns>(loginReq)
                    .then((ans: any) => {
                        this.httpRequestRunning = false;
                        clearTimeout(timeIndex);

                       // window.localStorage.clear();

                        window.localStorage.setItem("login", appState.login);
                        window.localStorage.setItem("password", appState.password);
                        appState.user = ans.user;
                        window.localStorage.setItem("user", appState.user!);
                        appState.loadTablesFromLocalStore();
                        appState.loadTablesFromServer();
                        appState.activePage = appState.cardPage;
                        appState.startSyncronozation();
                    })
                    .catch((err: any) => {
                        this.httpRequestRunning = false;
                        clearTimeout(timeIndex);
                        alert(err);
                    });

            })
            .catch((err: any) => {
                this.httpRequestRunning = false;
                clearTimeout(timeIndex);
                alert(err);
            });
    };

    handleTest1Click = () => {


    };

    handleAndroidClick = () => {

        if (platform.os && platform.os.family && platform.os.family.toLowerCase().indexOf("android") >= 0)
            window.location.href = config.apkUrl;
        else
            showModal(<AndroidDownloadModal onClose={()=>{}}/>);

    };

    render(): any {

        let logoSize = 270;
        if (appState.winHeight < 600) {
            logoSize = 130;
            console.log("logosize ", logoSize);
        }


        let butContent: any = "Авторизация";
        if (this.httpRequestRunning)
            butContent =<span>Авторизация <i className="fa fa-circle-o-notch fa-spin fa-fw"></i></span>;

        let androidButton: any = (
            <button className="btn btn-default pull-right" onClick={this.handleAndroidClick}
                    disabled={this.httpRequestRunning}>
                <span className="fa fa-android" style={{color:"#a4ca39", fontSize:18}}/>
                <span style={{marginLeft:5}}>Android install</span>
            </button>
        );

        if (getIsCordovaApp()) {
            androidButton = undefined;
        }

        return (
            <div className="container">
                <div className="row">
                    {/*<NotifyResize onResize={this.onResize}/>*/}
                    <div className="col-sm-6 col-sm-offset-3">
                        <div className="text-center" style={{ height:logoSize, paddingTop:15,overflow:"hidden"}}>
                            <img src={`img/login${logoSize}.jpg`} style={{}}/>
                        </div>
                        <h2 className="text-center">{config.appName}</h2>
                        <div className="form">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><span
                                        className="fa fa-user"></span></span>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Логин"
                                           required
                                           value={appState.login}
                                           onChange={(e:any)=>{appState.login=e.target.value}}
                                           disabled={this.httpRequestRunning}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><span
                                        className="fa fa-lock"></span></span>
                                    <input type="password"
                                           className="form-control"
                                           placeholder="Пароль"
                                           required
                                           disabled={this.httpRequestRunning}
                                           value={appState.password}
                                           onChange={(e:any)=>{appState.password=e.target.value}}

                                    />
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={this.handleButtonClick}
                                    disabled={this.httpRequestRunning}>
                                {butContent}
                            </button>
                            {androidButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}