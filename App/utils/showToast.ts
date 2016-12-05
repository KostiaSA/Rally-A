import {getIsCordovaApp} from "./getIsCordovaApp";

export function showToast(text: string) {
    if (getIsCordovaApp())
        (window as any).plugins.toast.show(text, "long", "bottom");
}
