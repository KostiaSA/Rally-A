import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import moment = require("moment");
import {ILegRegistration, ICheckPoint} from "../api/api";
import {CheckTimeUpdateModal} from "../modals/CheckTimeUpdateModal";
import {showModal} from "../modals/showModal";
import {vibratePushButton} from "../utils/vibrate";
import {getDeepClone} from "../utils/getDeepClone";


//import  NotifyResize = require("react-notify-resize");

export interface ICarsPageProps {

}

@observer
export class CarsPage extends React.Component<ICarsPageProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {

    };


    getTotalCount(): number {
        return (appState.legRegistration || []).length;
    }

    getCheckedCount(): number {
        return appState.checkPoints.length;
    }

    @observable sort: string = "старт"; // номер check

    getChecktimeForSort(regItem: ILegRegistration): Date {
        let cp: ICheckPoint | undefined;
        if (appState.rallyPunkt[appState.rallyPunktIndex]) {
            cp = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt[appState.rallyPunktIndex].id, regItem.id);
            if (cp)
                return cp.checkTime;
            else
                return new Date(2200, 0, 0);

        }
        return new Date(2200, 0, 0);
    }

    pad(num: number, size: number): string {
        var s = "000000000" + num;
        return s.substr(s.length - size);
    }

    formatTime(date: Date): string {
        if (!date || !(date instanceof Date))
            return "";
        let hh = date.getUTCHours();
        let mm = date.getUTCMinutes();
        let ss = date.getUTCSeconds();
        return (this.pad(hh, 2) + ":" + this.pad(mm, 2) + ":" + this.pad(ss, 2)).replace("00:00:00", "");
    }

    render(): any {
        console.log("render CarsPage");

        let gonkaStyle: CSSProperties = {
            color: "olive",
            fontWeight: "bold"
        };

        let timeStyle: CSSProperties = {
            color: "dodgerblue",
            fontWeight: "bold"
        };

        let userStyle: CSSProperties = {
            color: "forestgreen",
            fontWeight: "bold"
        };

        let intCompare = (x: string, y: string): number => {
            return 0;
        };

        let sortCompare = (x: ILegRegistration, y: ILegRegistration): number => {
            if (this.sort === "пилот") {
                return x.pilotName.localeCompare(y.pilotName);
            }
            else if (this.sort === "номер") {
                return x.raceNumber.localeCompare(y.raceNumber);
            }
            else if (this.sort === "check") {
                let a = this.getChecktimeForSort(x);
                let b = this.getChecktimeForSort(y);
                return a.getTime() - b.getTime();
            }
            return 0
        };


        return (
            <div className="container">
                <div className="row" style={{marginTop: 20}}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="text-center">
                                    <i className={"fa fa-car"} style={{fontSize: 16, marginRight: 10}}/>
                                    Участники этапа ({this.getCheckedCount()}/{this.getTotalCount()})
                                </h4>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{textAlign: "center"}}>
                                        старт
                                    </th>
                                    <th>
                                        <a style={{textDecoration: "underline"}} onClick={() => {
                                            this.sort = "пилот"
                                        }}>пилот</a>
                                    </th>
                                    <th style={{textAlign: "center"}}>
                                        <a style={{textDecoration: "underline"}} onClick={() => {
                                            this.sort = "номер"
                                        }}>номер</a>
                                    </th>
                                    <th style={{textAlign: "center"}}>
                                        <a style={{textDecoration: "underline"}} onClick={() => {
                                            this.sort = "check"
                                        }}>check</a>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                { (appState.legRegistration.slice().sort(sortCompare) || []).map((regItem: ILegRegistration, index: number) => {
                                    //let pilot = appState.getPilot(regItem.pilotId);
                                    let checkTime = "";
                                    let checkTimeColor = "green";
                                    let penaTime = "";
                                    let cp: ICheckPoint | undefined;
                                    if (appState.rallyPunkt[appState.rallyPunktIndex]) {
                                        cp = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt[appState.rallyPunktIndex].id, regItem.id);
                                        if (cp) {
                                            checkTime = moment(cp.checkTime).format("HH:mm:ss");
                                            if (cp.syncOk !== true)
                                                checkTimeColor = "coral";
                                        }
                                    }

                                    let lastPunktTag: any = null;
                                    if (appState.getIsCycleRally()) {
                                        let lastPunkt = appState.getLastCycleRallyPunkByLegRegsId(regItem.id);
                                        if (lastPunkt) {
                                            cp = appState.getCheckPointByRallyPunktAndLegRegsId(lastPunkt.id, regItem.id);
                                            if (cp) {
                                                checkTime = moment(cp.checkTime).format("HH:mm:ss");
                                                // console.log("lastPunkt",getDeepClone(lastPunkt));
                                                lastPunktTag = <span
                                                    style={{color: checkTimeColor}}>({lastPunkt.num + ' ' + lastPunkt.name})</span>
                                                if (cp.syncOk !== true)
                                                    checkTimeColor = "coral";

                                            }
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
                                                onClick={() => {
                                                    if (cp) {
                                                        vibratePushButton();
                                                        showModal(<CheckTimeUpdateModal checkpoint={cp} onClose={() => {
                                                        }}/>);
                                                    }
                                                }}
                                            >
                                                <span style={{color: checkTimeColor}}>{checkTime}</span>
                                                <br/>
                                                {lastPunktTag}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}