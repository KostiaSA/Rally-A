import * as Promise from "bluebird";
import {IReq, IAns, GET_ENCRYPT_KEY} from "../api/api";
import {appState} from "../AppState";
import crypto = require("crypto-js");

export function httpRequest<TReq extends IReq,TAns extends IAns>(req: TReq): Promise<TAns> {

    return new Promise<TAns>(
        (resolve: (obj: TAns) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'api', true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {
                // do something to response

                let ansBody = JSON.parse(this.responseText) as TAns;
                if (ansBody.error)
                    reject(ansBody.error);
                else {
                    resolve(ansBody);
                }
                console.log();
            };

            let bodyEncrypted = "";
            if (req.cmd !== GET_ENCRYPT_KEY)
                bodyEncrypted = crypto.MD5(JSON.stringify(req), appState.encryptKey);

            let fullReq = {
                sessionId: appState.sessionId,
                cmd: req.cmd,
                body: bodyEncrypted
            };

            xhr.send(JSON.stringify(fullReq));

        });


};
