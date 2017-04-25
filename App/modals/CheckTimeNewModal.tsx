import * as React from "react";
import * as ReactDOM from "react-dom";
import {NotifyResize} from "react-notify-resize";
//import {app} from "../App";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {
    IGetEncryptKeyReq, IGetEncryptKeyAns, GET_ENCRYPT_KEY_CMD, ILoginReq, ILoginAns, LOGIN_CMD,
    ICheckPoint
} from "../api/api";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import {getIsCordovaApp} from "../utils/getIsCordovaApp";
import {Modal, IModalProps} from "./Modal";
import * as QRCodeReact from "qrcode.react";
import {config} from "../config/config";
import {replaceAll} from "../utils/replaceAll";
import moment = require("moment");
import {showToast} from "../utils/showToast";
import {vibrate, vibratePushButton} from "../utils/vibrate";
import {CSSProperties} from "react";

let QRCode = QRCodeReact as any;


//import  NotifyResize = require("react-notify-resize");

export interface ICheckTimeNewModalProps extends IModalProps {
    checkpoint: ICheckPoint;
}

@observer
export class CheckTimeNewModal extends React.Component<ICheckTimeNewModalProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;

        //let time = this.props.checkpoint.checkTime;
        //this.timeNum = time.getHours() * 10000 + time.getMinutes() * 100 + time.getSeconds();
    }

    // componentDidMount() {
    //     //$(this.getDOMNode()).modal('show');
    //     //$(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    // };

//    @observable timeЫекштп: number;

    // getTimeAsStr(timeNum: number): string {
    //     let str = this.pad(timeNum, 6);
    //     return str.substr(0, 2) + ":" + str.substr(2, 2) + ":" + str.substr(4, 2);
    // }
    //
    // pad(num: number, size: number) {
    //     let s = num + "";
    //     while (s.length < size)
    //         s = "0" + s;
    //     return s;
    // }

    //checkTimeNative: any;

    @observable timeString: string = "";

    handleNumButtonClick = (num: string) => {
        vibratePushButton();
        if (num === "C")
            this.timeString = "";
        else if (num === "<") {
            if (this.timeString.length > 0)
                this.timeString = this.timeString.substr(0, this.timeString.length - 1);
        }
        else {
            this.timeString += num;
        }
        if (this.timeString.length >= 6) {
            if (appState.getTimeFromStr6(this.timeString))
                vibrate([70, 70, 70, 70, 70]);
            else
                vibrate(300);
        }

    };


    render(): any {
        let numButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            fontFamily: "monospace",
            marginTop: 5,
            marginLeft: 5
        }
        let clearButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            fontFamily: "monospace",
            marginTop: 5,
            marginLeft: 5,
            color: "red"
        }
        let backButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            fontFamily: "monospace",
            marginTop: 5,
            marginLeft: 5,
            color: "orange"
        }

        return (
            <Modal>
                <div className="modal-header">
                    <h4 className="modal-title">Укажите время (ЧЧММСС)</h4>
                </div>
                <div className="modal-body">
                    <div className="form">
                        <div className="form-group">
                            <div style={{textAlign:"center"}}>
                                <span>время </span>
                                <span style={{
                                    fontSize: 22,
                                    color: "green",
                                    fontWeight: "bold",
                                    border: "teal solid 1px",
                                    padding: 3
                                }}
                                >
                                 {appState.getTimeFromStr6(this.timeString) ? moment(appState.getTimeFromStr6(this.timeString)!).format("HH:mm:ss") : this.timeString}
                                </span>

                                <div className="row" style={{marginTop: 20, textAlign:"center"}}>
                                    <div className="col-md-10 col-md-offset-1">
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("1")}>
                                            1
                                        </button>
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("2")}>
                                            2
                                        </button>
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("3")}>
                                            3
                                        </button>
                                    </div>
                                    <div className="col-md-10 col-md-offset-1">
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("4")}>
                                            4
                                        </button>
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("5")}>
                                            5
                                        </button>
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("6")}>
                                            6
                                        </button>
                                    </div>
                                    <div className="col-md-10 col-md-offset-1">
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("7")}>
                                            7
                                        </button>
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("8")}>
                                            8
                                        </button>
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("9")}>
                                            9
                                        </button>
                                    </div>
                                    <div className="col-md-10 col-md-offset-1">
                                        <button className="btn btn-lg btn-default" style={clearButtonStyle}
                                                onClick={() => this.handleNumButtonClick("C")}>
                                            C
                                        </button>
                                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                                onClick={() => this.handleNumButtonClick("0")}>
                                            0
                                        </button>
                                        <button className="btn btn-lg btn-default" style={backButtonStyle}
                                                onClick={() => this.handleNumButtonClick("<")}>
                                            {"<"}
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-success"
                        disabled={!appState.getTimeFromStr6(this.timeString)}
                        onClick={() => {
                            vibratePushButton();
                            //this.props.checkpoint.checkTime=new Date(moment(this.props.checkpoint.checkTime).format("YYYY/MM/DD")+" "+$(this.checkTimeNative).val());
                            this.props.checkpoint.checkTime = appState.getTimeFromStr6(this.timeString)!;
                            this.props.checkpoint.syncOk = false;
                            appState.checkPoints.push(this.props.checkpoint);
                            //showToast("записано " + $(this.checkTimeNative).val());
                            showToast("записано " + moment(appState.getTimeFromStr6(this.timeString)!).format("HH:mm:ss"));
                        }}
                    >
                        Сохранить
                    </button>
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => {
                        vibratePushButton();
                    }}
                    >
                        Отмена
                    </button>
                </div>
            </Modal>
        )
    }

}