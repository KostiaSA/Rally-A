import {getIsCordovaApp} from "./getIsCordovaApp";
import Notifications, {notify} from "react-notify-toast";

export function showToast(text: string) {
    // if (getIsCordovaApp())
    //     (window as any).plugins.toast.show(text, "long", "bottom");
    // else
        notify.show(text, "success" , 2500)
}
