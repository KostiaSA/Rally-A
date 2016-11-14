import {observable} from "mobx";
import {IAppPage} from "./App";

export class AppState {
    sessionId:string;
    login:string;
    password:string;

    @observable activePage: IAppPage;

    @observable winHeight: number;
    @observable winWidth: number;

    loginPage: IAppPage;
    flagPage: IAppPage;

    encryptKey:string;
//    encryptKey:string;


}

export let appState = new AppState();