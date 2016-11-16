import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;


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

    componentDidMount() {

    };

    handleNumButtonClick = (num: string)=> {
        console.log(num);
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

        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">

                                <h4 className="text-center" style={{marginTop:5, marginBottom:5}}><i className={"fa fa-flag-checkered"} style={{fontSize:20, marginRight:10}}></i>Checkpoint</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1" style={{ fontSize:18}}>
                        <span>участник N:</span>
                        <span>103</span>
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
                                onClick={()=>this.handleNumButtonClick("1")}>
                            4
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("2")}>
                            5
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("3")}>
                            6
                        </button>
                    </div>
                    <div className="col-md-10 col-md-offset-1">
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("1")}>
                            7
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("2")}>
                            8
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("3")}>
                            9
                        </button>
                    </div>
                    <div className="col-md-10 col-md-offset-1">
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("1")}>
                            C
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("2")}>
                            0
                        </button>
                        <button className="btn btn-lg btn-default" style={numButtonStyle}
                                onClick={()=>this.handleNumButtonClick("3")}>
                            {"<"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}