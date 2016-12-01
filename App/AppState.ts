import {observable} from "mobx";
import {IAppPage} from "./App";
import {IRallyHeader, IPilot, ILoadRallyHeaderReq, LOAD_RALLYHEADER_CMD, ILoadRallyHeaderAns} from "./api/api";
import {httpRequest} from "./utils/httpRequest";

export class AppState {
    @observable sessionId: string;
    @observable login: string;
    @observable password: string;
    @observable user?: string;

    @observable activePage: IAppPage;

    @observable winHeight: number;
    @observable winWidth: number;

    @observable lastSyncroTime: Date;

    loginPage: IAppPage;
    flagPage: IAppPage;
    cardPage: IAppPage;

    encryptKey: string;

    rallyHeaderDbts?: string;
    pilotsDbts?: string;

    @observable rallyHeader?: IRallyHeader;
    @observable pilots?: IPilot[];

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
                if (ans.rallyHeader) {
                    this.rallyHeaderDbts = ans.dbts;
                    this.rallyHeader = ans.rallyHeader;
                    window.localStorage.setItem("rallyHeaderDbts", this.rallyHeaderDbts!);
                    window.localStorage.setItem("rallyHeader", JSON.stringify(appState.rallyHeader));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    loadTablesFromLocalStore() {
        //console.error("local-store0", appState.rallyHeader);

        appState.user = window.localStorage.getItem("user") || undefined;

        appState.rallyHeaderDbts = window.localStorage.getItem("rallyHeaderDbts") || undefined;
        if (window.localStorage.getItem("rallyHeader"))
            appState.rallyHeader = JSON.parse(window.localStorage.getItem("rallyHeader")!) as IRallyHeader;

        //console.error("local-store1", appState.rallyHeader);

    }

    startSyncronozation() {
        setInterval(() => {
            this.loadTablesFromServer();
        }, 30000);
    }
}


export let appState = new AppState();