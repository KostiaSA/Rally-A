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
import {Modal, IModalProps} from "./Modal";


//import  NotifyResize = require("react-notify-resize");

export interface IAndroidDownloadModalProps extends IModalProps {

}

export class AndroidDownloadModal extends React.Component<IAndroidDownloadModalProps,any> {

    // componentDidMount() {
    //     //$(this.getDOMNode()).modal('show');
    //     //$(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    // };


    render(): any {
        return (
            <Modal>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Modal title</h4>
                </div>
                <div className="modal-body">
                    <p>One fine body&hellip;</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </Modal>
        )
    }

}