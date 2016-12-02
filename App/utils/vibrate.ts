import {getIsCordovaApp} from "./getIsCordovaApp";

export function vibratePushButton() {
    if (getIsCordovaApp())
        navigator.vibrate(100);
}

export function vibrate(time: any) {
    if (getIsCordovaApp())
        navigator.vibrate(time);
}