import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import moment = require("moment");
import {ILegRegistration} from "../api/api";


//import  NotifyResize = require("react-notify-resize");

export interface ICarsPageProps {

}

@observer
export class CarsPage extends React.Component<ICarsPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {

    };


    render(): any {
        console.log("render Cars page");

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

        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="text-center">
                                    <i className={"fa fa-car"} style={{fontSize:16, marginRight:10}}/>
                                    Участники этапа
                                </h4>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>старт.N</th>
                                    <th>пилот</th>
                                    <th>авто</th>
                                    <th>номер</th>
                                </tr>
                                </thead>
                                <tbody>
                                { (appState.legRegistration || []).map((regItem: ILegRegistration, index: number) => {
                                    let pilot = appState.getPilot(regItem.pilotId);
                                    return (
                                        <tr>
                                            <td style={{textAlign: "center"}}>{regItem.npp}</td>
                                            <td>{pilot.name}</td>
                                            <td>{pilot.autoName}</td>
                                            <td style={{textAlign: "center"}}>{regItem.raceNumber}</td>
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