import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import {ILegRegistration, IPilot} from "../api/api";


//import  NotifyResize = require("react-notify-resize");

export interface IFlagPageProps {

}

@observer
export class FlagPage extends React.Component<IFlagPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    @observable raceNumber: string = "";
    @observable legRegistration: ILegRegistration = appState.getLegRegistrationByRaceNumber(this.raceNumber);
    @observable pilot: IPilot = appState.getPilot(this.legRegistration.pilotId);

    componentDidMount() {

    };

    handleNumButtonClick = (num: string) => {
        console.log(num);
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
        this.pilot = appState.getPilot(this.legRegistration.pilotId);
    }

    render(): any {

        let gonkaStyle: CSSProperties = {
            color: "olive",
            fontWeight: "bold"
        };

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
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">

                                <h4 className="text-center" style={{marginTop:5, marginBottom:5}}><i
                                    className={"fa fa-flag-checkered"} style={{fontSize:20, marginRight:10}}></i>
                                    {"ПУНКТ: "} {appState.rallyPunkt ? appState.rallyPunkt.num + ", " + appState.rallyPunkt.name + "  (" + appState.rallyPunkt.length + " км)" : ""}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1" style={{ fontSize:18}}>
                        <table style={{width:"100%"}}>
                            <tr>
                                <td style={{textAlign:"center",padding:5}}>
                                    <span>N:</span>
                                    <span style={{  color: "teal",
                                        fontWeight: "bold",
                                        border: "teal solid 1px",
                                        padding: 3
                                     }}
                                    >
                                      {this.raceNumber}
                                   </span>

                                </td>
                                <td style={{padding:5}}>
                                    <span style={{color:"coral"}}>{this.pilot.autoName+"  "}</span>
                                    <span>{this.pilot.name}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("1")}>
                            1
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("2")}>
                            2
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("3")}>
                            3
                        </button>
                    </div>
                    <div className="col-md-10 col-md-offset-1">
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("4")}>
                            4
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("5")}>
                            5
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("6")}>
                            6
                        </button>
                    </div>
                    <div className="col-md-10 col-md-offset-1">
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("7")}>
                            7
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("8")}>
                            8
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("9")}>
                            9
                        </button>
                    </div>
                    <div className="col-md-10 col-md-offset-1">
                        <button className="btn btn-lg btn-default" style={clearButtonStyle}
                                onClick={()=>this.handleNumButtonClick("C")}>
                            C
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("0")}>
                            0
                        </button>
                        <button className="btn btn-lg btn-default" style={backButtonStyle}
                                onClick={()=>this.handleNumButtonClick("<")}>
                            {"<"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}