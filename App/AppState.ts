import {observable} from "mobx";
import {IAppPage} from "./App";
import {IRallyHeader, IPilot, ILoadRallyHeaderReq, LOAD_RALLYHEADER_CMD, ILoadRallyHeaderAns} from "./api/api";
import {httpRequest} from "./utils/httpRequest";

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

    rallyHeaderDbts?: string;
    pilotsDbts?: string;

    rallyHeader?: IRallyHeader;
    pilots?: IPilot[];

    getIsLogined() {
        return this.encryptKey !== undefined;
    }

    loadTablesFromServer() {
        if (!this.getIsLogined())
            return;

        this.load_RallyHeader_FromServer();

    }

    load_RallyHeader_FromServer() {

        let req: ILoadRallyHeaderReq = {
            cmd: LOAD_RALLYHEADER_CMD,
            dbts: this.rallyHeaderDbts || ""
        };

        console.log(req);

        httpRequest<ILoadRallyHeaderReq,ILoadRallyHeaderAns>(req)
            .then((ans: ILoadRallyHeaderAns) => {
                console.error(ans);
                //this.httpRequestRunning = false;
                //clearTimeout(timeIndex);
                //window.localStorage.setItem("login", appState.login);
                //window.localStorage.setItem("password", appState.password);
                //appState.activePage = appState.cardPage;
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    loadTablesFromLocalStore() {

        appState.rallyHeaderDbts = window.localStorage.getItem("rallyHeaderDbts") || undefined;
        if (window.localStorage.getItem("rallyHeader"))
            appState.rallyHeader = JSON.parse(window.localStorage.getItem("rallyHeader")!) as IRallyHeader;

    }
}


export let appState = new AppState();