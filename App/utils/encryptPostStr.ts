import crypto = require("crypto-js");
import {appState} from "../AppState";

export function encryptPostStr(message: string): string {
    return crypto.MD5(message, appState.encryptKey);
}
