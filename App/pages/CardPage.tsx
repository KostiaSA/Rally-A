import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import moment = require("moment");


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
        console.log("render Card page");

        let gonkaStyle: CSSProperties = {
            color: "olive",
            fontWeight: "bold"
        };

        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="text-center">Актуальная информация</h4>
                            </div>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Гонка</td>
                                    <td style={gonkaStyle}>{appState.rallyHeader ? appState.rallyHeader.num + ", " + appState.rallyHeader.name : ""}</td>
                                </tr>
                                <tr>
                                    <td>Этап</td>
                                    <td style={gonkaStyle}>{appState.rallyLeg ? appState.rallyLeg.num + ", " + appState.rallyLeg.name+"  (длина "+appState.rallyLeg.length+" км)" : ""}</td>
                                </tr>
                                <tr>
                                    <td>Пункт</td>
                                    <td style={gonkaStyle}>{appState.rallyPunkt ? appState.rallyPunkt.num + ", " + appState.rallyPunkt.name+"  ("+appState.rallyPunkt.length+" км)" : ""}</td>
                                </tr>
                                <tr>
                                    <td>Судья на пункте</td>
                                    <td style={gonkaStyle}>{appState.user}</td>
                                </tr>
                                <tr>
                                    <td>Время MSK</td>
                                    <td style={gonkaStyle}>12:47:11</td>
                                </tr>
                                <tr>
                                    <td>Обмен данными</td>
                                    <td style={gonkaStyle}>{moment(appState.lastSyncroTime).format("DD MMM YYYY,  HH:mm:ss")}</td>
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