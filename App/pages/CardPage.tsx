import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import moment = require("moment");
import {getIsCordovaApp} from "../utils/getIsCordovaApp";
import {getDeviceTimeZoneOffsetStr} from "../utils/getDeviceTimeZoneOffsetStr";
import {getGpsTimeZoneOffsetStr} from "../utils/getGpsTimeZoneOffsetStr";


//import  NotifyResize = require("react-notify-resize");

export interface ICardPageProps {

}

@observer
export class CardPage extends React.Component<ICardPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {

    };


    render(): any {
        //console.log("render Card page");

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

        let gpsOkSpan =<span></span>;

        if (getIsCordovaApp()) {
            if (appState.gpsLastDeviceTime && ((new Date()).getTime() - appState.gpsLastDeviceTime.getTime() < 5 * 60 * 1000/* меньше 5 мин */)) {
                gpsOkSpan =<div style={{ color:"green", marginLeft:10}}>GPS работает!</div>;
            }
            else if (appState.gpsLastDeviceTime && ((new Date()).getTime() - appState.gpsLastDeviceTime.getTime() < 30 * 60 * 1000/* меньше 30 мин */)) {
                gpsOkSpan =<div style={{ color:"orange", marginLeft:10}}>GPS тупит!</div>;

            }
            else {
                gpsOkSpan =<div style={{ color:"tomato", marginLeft:10}}>GPS не работает!</div>;
            }
        }


        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="text-center">
                                    <i className={"fa fa-info-circle"} style={{fontSize:18, marginRight:10}}></i>
                                    Информация о гонке
                                </h4>
                            </div>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Гонка</td>
                                    <td style={gonkaStyle}>{appState.rallyHeader ? appState.rallyHeader.num + ", " + appState.rallyHeader.name : ""}</td>
                                </tr>
                                <tr>
                                    <td>Этап</td>
                                    <td style={gonkaStyle}>{appState.rallySpecUch ? appState.rallySpecUch[appState.currSpecUchIndex].num + ", " + appState.rallySpecUch[appState.currSpecUchIndex].name + "  (длина " + appState.rallySpecUch[appState.currSpecUchIndex].length + " км)" : ""}</td>
                                </tr>
                                <tr>
                                    <td>Пункт</td>
                                    <td style={gonkaStyle}>{appState.rallyPunkt ? appState.rallyPunkt.num + ", " + appState.rallyPunkt.name + "  (" + appState.rallyPunkt.length + " км)" : ""}</td>
                                </tr>
                                <tr>
                                    <td>Судья на пункте</td>
                                    <td style={userStyle}>{appState.user}</td>
                                </tr>
                                <tr>
                                    <td>Время <span style={{whiteSpace:"nowrap"}}>{getDeviceTimeZoneOffsetStr()}</span></td>
                                    <td style={timeStyle}>{moment(new Date()).format("DD MMM YYYY,  HH:mm:ss")}</td>
                                </tr>
                                <tr>
                                    <td>Время гонки <span style={{whiteSpace:"nowrap"}}>{getGpsTimeZoneOffsetStr()}</span></td>
                                    <td style={timeStyle}>{moment(appState.gonkaTime).format("DD MMM YYYY,  HH:mm:ss")}{gpsOkSpan}</td>
                                </tr>
                                <tr>
                                    <td>Обмен данными</td>
                                    <td style={timeStyle}>{moment(appState.lastSyncroTime).format("DD MMM YYYY,  HH:mm:ss")}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}