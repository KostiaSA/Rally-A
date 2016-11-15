import {observable} from "mobx";
import {IAppPage} from "./App";

export class AppState {
    @observable sessionId: string;
    @observable login: string;
    @observable password: string;

    @observable activePage: IAppPage;

    @observable winHeight: number;
    @observable winWidth: number;

    loginPage: IAppPage;
    flagPage: IAppPage;
    cardPage: IAppPage;

    encryptKey: string;
//    encryptKey:string;


}

export let appState = new AppState();