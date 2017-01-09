import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import {ILegRegistration, ICheckPoint} from "../api/api";
import moment = require("moment");
import {vibratePushButton, vibrate} from "../utils/vibrate";
import {showModal} from "../modals/showModal";
import {CheckTimeUpdateModal} from "../modals/CheckTimeUpdateModal";
import {CheckTimeNewModal} from "../modals/CheckTimeNewModal";


//import  NotifyResize = require("react-notify-resize");

export interface IFlagPageProps {

}

@observer
export class FlagPage2 extends React.Component<IFlagPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    @observable raceNumber: string = "";
    @observable legRegistration: ILegRegistration = appState.getLegRegistrationByRaceNumber(this.raceNumber);
    //@observable pilot: IPilot = appState.getPilot(this.legRegistration.pilotId);
    @observable checkpoint: ICheckPoint | undefined;

    componentDidMount() {

        setInterval(() => {
            $("#check-time").text(moment(new Date()).format("HH:mm:ss"));
        }, 1000);

    };

    handleNumButtonClick = (num: string) => {
        vibratePushButton();
        if (num === "C")
            this.raceNumber = "";
        else if (num === "<") {
            if (this.raceNumber.length > 0)
                this.raceNumber = this.raceNumber.substr(0, this.raceNumber.length - 1);
        }
        else {
            this.raceNumber += num;
        }

        this.legRegistration = appState.getLegRegistrationByRaceNumber(this.raceNumber);
        //this.pilot = appState.getPilot(this.legRegistration.pilotId);
        this.checkpoint = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt ? appState.rallyPunkt.id : -1, this.legRegistration.id);


        if (this.legRegistration.id >= 0 && this.checkpoint === undefined)
            vibrate([70, 70, 70, 70, 70]);
        else if (this.legRegistration.id >= 0 && this.checkpoint !== undefined)
            vibrate(300);

    }

    // handleCheckClick = () => {
    //     vibratePushButton();
    //     showModal(<CheckTimeNewModal checkpoint={appState.getNewCheck(this.legRegistration.id, appState.gonkaTime!)}
    //                                  onClose={()=>{}}/>);
    //     this.handleNumButtonClick("C");
    // }

    handleCheckWithTimeClick = () => {
        vibratePushButton();
        appState.pushNewFinish(appState.gonkaTime!);
        this.handleNumButtonClick("C");
    }

    // handleUpdateClick = () => {
    //     vibratePushButton();
    //     showModal(<CheckTimeUpdateModal checkpoint={this.checkpoint!} onClose={()=>{}}/>);
    //
    // }

    render(): any {

        let gonkaStyle: CSSProperties = {
            color: "olive",
            fontWeight: "bold"
        };

        let okButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            marginLeft: 5,
            marginTop: 20,
        }

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


        // let checkEnabledClass = "hidden";
        // let updateEnabledClass = "hidden";
        // if (this.legRegistration.id >= 0 && this.checkpoint === undefined) {
        //     checkEnabledClass = "";
        // }
        // else if (this.legRegistration.id >= 0 && this.checkpoint !== undefined) {
        //     updateEnabledClass = "";
        // }


        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">

                                <h5 className="text-center" style={{marginTop:5, marginBottom:5}}><i
                                    className={"fa fa-flag-checkered"} style={{fontSize:20, marginRight:10}}></i>
                                    {"ПУНКТ: "} {appState.rallyPunkt ? appState.rallyPunkt.num + ", " + appState.rallyPunkt.name + "  (" + appState.rallyPunkt.length + " км)" : ""}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <button className={"btn btn-lg btn-success"} style={okButtonStyle}
                            onClick={this.handleCheckWithTimeClick}>
                        check {moment(appState.gonkaTime).format("HH:mm:ss")}
                    </button>
                </div>
                <div className="row" style={{marginTop:30}}>
                    <table className="table">
                        <tbody>
                        { (appState.legRegistration || []).map((regItem: ILegRegistration, index: number) => {
                            //let pilot = appState.getPilot(regItem.pilotId);
                            let checkTime = "";
                            let checkTimeColor = "green";
                            let penaTime = "";
                            let cp: ICheckPoint | undefined;
                            if (appState.rallyPunkt) {
                                cp = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt.id, regItem.id);
                                if (cp) {
                                    checkTime = moment(cp.checkTime).format("HH:mm:ss");
                                    if (cp.penaltyTime && (cp.penaltyTime.getHours() > 0 || cp.penaltyTime.getMinutes() || cp.penaltyTime.getSeconds() > 0)) {
                                        penaTime = "+ ";
                                        if (cp.penaltyTime.getHours() > 0)
                                            penaTime += cp.penaltyTime.getHours() + " час ";
                                        if (cp.penaltyTime.getMinutes() > 0)
                                            penaTime += cp.penaltyTime.getMinutes() + " мин ";
                                        if (cp.penaltyTime.getSeconds() > 0)
                                            penaTime += cp.penaltyTime.getSeconds() + " сек ";

                                    }
                                    if (cp.syncOk !== true)
                                        checkTimeColor = "coral";
                                }
                            }

                            return (
                                <tr key={index}>
                                    <td style={{textAlign: "center"}}>{index}</td>
                                    <td>
                                        <span style={{color: "coral"}}>{regItem.autoName}</span>
                                        <br/>
                                        <span>{regItem.pilotName}</span>
                                    </td>
                                    <td style={{textAlign: "center", color: "teal"}}>{regItem.raceNumber}</td>
                                    <td style={{textAlign: "center"}}
                                        onClick={()=>{
                                                    if (cp){
                                                      vibratePushButton();
                                                      showModal(<CheckTimeUpdateModal checkpoint={cp} onClose={()=>{}}/>);
                                                    }
                                                }}
                                    >
                                        <span style={{color: checkTimeColor}}>{checkTime}</span>
                                        <br/>
                                        <span style={{color: "red"}}>{penaTime}</span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}