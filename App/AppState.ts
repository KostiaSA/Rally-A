import {observable} from "mobx";
import {IAppPage} from "./App";

export class AppState {
    @observable activePage: IAppPage;

    @observable winHeight: number;
    @observable winWidth: number;

    loginPage: IAppPage;
    flagPage: IAppPage;

}

export let appState = new AppState();