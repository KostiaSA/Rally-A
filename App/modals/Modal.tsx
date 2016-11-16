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


//import  NotifyResize = require("react-notify-resize");

export interface IModalProps {
    onClose?: (modalResult: any)=>void;
}

export class Modal<P extends IModalProps> extends React.Component<P,any> {
    constructor(props: P, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {
        $(this.native).modal("show");
        $(this.native).on("hidden.bs.modal", ()=> {
            $(this.native).parent().remove();
            if (this.props.onClose)
                this.props.onClose(this.modalResult);
        });
    };

    modalResult: any;
    native: Element;

    render(): any {
        return (
            <div className="modal" ref={(e:any)=>this.native=e}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}