import {observable} from "mobx";
import {IAppPage} from "./App";
import {
    IRallyHeader, IPilot, ILoadRallyHeaderReq, LOAD_RALLYHEADER_CMD, ILoadRallyHeaderAns,
    IRallyLeg, ILoadRallyLegReq, LOAD_RALLYLEG_CMD, ILoadRallyLegAns, IRallyPunkt, ILoadRallyPunktReq,
    LOAD_RALLYPUNKT_CMD, ILoadRallyPunktAns, ILegRegistration, ILoadLegRegistrationReq, LOAD_LEGREGISTRATION_CMD,
    ILoadLegRegistrationAns, ILoadPilotsReq, LOAD_PILOTS_CMD, ILoadPilotsAns, LOAD_CHECKPOINTS_CMD, ILoadCheckPointsReq,
    ILoadCheckPointsAns, ICheckPoint
} from "./api/api";
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
    rallyLegDbts?: string;
    rallyPunktDbts?: string;
    legRegistrationDbts?: string;
    checkPointsDbts?: string;


    @observable rallyHeader?: IRallyHeader;
    @observable pilots: IPilot[] = [];
    @observable rallyLeg?: IRallyLeg;
    @observable rallyPunkt?: IRallyPunkt;
    @observable legRegistration: ILegRegistration[] = [];
    @observable checkPoints: ICheckPoint[] = [];

    getIsLogined() {
        return this.encryptKey !== undefined;
    }

    getPilot(pilotId: number): IPilot {
        let ret: IPilot | undefined = (this.pilots || []).find((item: IPilot) => item.id === pilotId);
        return ret || {id: -1, name: "", engName: "", autoName: ""};
    }

    getLegRegistrationByRaceNumber(raceNum: string): ILegRegistration {
        let ret: ILegRegistration | undefined = (this.legRegistration || []).find((item: ILegRegistration) => item.raceNumber.trim() === raceNum.trim());
        return ret || {id: -1, pilotId: -1, raceNumber: "", npp: -1, startTime: new Date()};
    }

    getCheckPointByRallyPunktAndLegRegsId(punktId: number, legRegsId: number): ICheckPoint | undefined {
        return (this.checkPoints || []).find((item: ICheckPoint) => item.rallyPunktId === punktId && item.legRegsId === legRegsId);
    }

    loadTablesFromServer() {
        if (!this.getIsLogined())
            return;

        this.load_RallyHeader_FromServer();
        this.load_RallyLeg_FromServer();
        this.load_RallyPunkt_FromServer();
        this.load_LegRegistration_FromServer();
        this.load_Pilots_FromServer();
        this.load_CheckPoints_FromServer();

    }

    load_RallyHeader_FromServer() {

        let req: ILoadRallyHeaderReq = {
            cmd: LOAD_RALLYHEADER_CMD,
            dbts: this.rallyHeaderDbts || ""
        };

        //console.log(req);

        httpRequest<ILoadRallyHeaderReq,ILoadRallyHeaderAns>(req)
            .then((ans: ILoadRallyHeaderAns) => {
                if (ans.rallyHeader) {
                    this.rallyHeaderDbts = ans.dbts;
                    this.rallyHeader = ans.rallyHeader;
                    window.localStorage.setItem("rallyHeaderDbts", ans.dbts!);
                    window.localStorage.setItem("rallyHeader", JSON.stringify(ans.rallyHeader));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    load_RallyLeg_FromServer() {

        let req: ILoadRallyLegReq = {
            cmd: LOAD_RALLYLEG_CMD,
            dbts: this.rallyLegDbts || ""
        };

        httpRequest<ILoadRallyLegReq,ILoadRallyLegAns>(req)
            .then((ans: ILoadRallyLegAns) => {
                if (ans.rallyLeg) {
                    this.rallyLegDbts = ans.dbts;
                    this.rallyLeg = ans.rallyLeg;
                    window.localStorage.setItem("rallyLegDbts", ans.dbts!);
                    window.localStorage.setItem("rallyLeg", JSON.stringify(ans.rallyLeg));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    load_RallyPunkt_FromServer() {

        let req: ILoadRallyPunktReq = {
            cmd: LOAD_RALLYPUNKT_CMD,
            dbts: this.rallyPunktDbts || "",
            login: appState.login
        };

        httpRequest<ILoadRallyPunktReq,ILoadRallyPunktAns>(req)
            .then((ans: ILoadRallyPunktAns) => {
                if (ans.rallyPunkt) {
                    this.rallyPunktDbts = ans.dbts;
                    this.rallyPunkt = ans.rallyPunkt;
                    window.localStorage.setItem("rallyPunktDbts", ans.dbts!);
                    window.localStorage.setItem("rallyPunkt", JSON.stringify(ans.rallyPunkt));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    load_LegRegistration_FromServer() {

        let req: ILoadLegRegistrationReq = {
            cmd: LOAD_LEGREGISTRATION_CMD,
            dbts: this.legRegistrationDbts || ""
        };

        httpRequest<ILoadLegRegistrationReq,ILoadLegRegistrationAns>(req)
            .then((ans: ILoadLegRegistrationAns) => {
                if (ans.legRegistration) {
                    this.legRegistrationDbts = ans.dbts;
                    this.legRegistration = ans.legRegistration;
                    window.localStorage.setItem("legRegistrationDbts", ans.dbts!);
                    window.localStorage.setItem("legRegistration", JSON.stringify(ans.legRegistration));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    load_Pilots_FromServer() {

        let req: ILoadPilotsReq = {
            cmd: LOAD_PILOTS_CMD,
            dbts: this.pilotsDbts || ""
        };

        httpRequest<ILoadPilotsReq,ILoadPilotsAns>(req)
            .then((ans: ILoadPilotsAns) => {
                if (ans.pilots) {
                    this.pilotsDbts = ans.dbts;
                    this.pilots = ans.pilots;
                    window.localStorage.setItem("pilotsDbts", ans.dbts!);
                    window.localStorage.setItem("pilots", JSON.stringify(ans.pilots));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    load_CheckPoints_FromServer() {

        if (this.rallyPunkt && this.rallyLeg) {

            let req: ILoadCheckPointsReq = {
                cmd: LOAD_CHECKPOINTS_CMD,
                rallyPunktId: this.rallyPunkt.id,
                dbts: this.checkPointsDbts || ""
            };

            // удаляем все со старых RallyPukt
            let currPunkId = this.rallyPunkt.id;
            this.checkPoints = this.checkPoints.filter((item: ICheckPoint) => {
                return item.rallyPunktId === currPunkId || item.syncOk !== true
            });

            httpRequest<ILoadCheckPointsReq,ILoadCheckPointsAns>(req)
                .then((ans: ILoadCheckPointsAns) => {
                    if (ans.checkPoints) {

                        let needSaveToLocalStorage = false;

                        ans.checkPoints.forEach((item: ICheckPoint, index: number) => {
                            let oldItem: ICheckPoint | undefined = this.getCheckPointByRallyPunktAndLegRegsId(item.rallyPunktId, item.legRegsId);
                            if (oldItem) {
                                if (oldItem.syncOk === true && JSON.stringify(oldItem) !== JSON.stringify(item)) {
                                    ans.checkPoints![index] = item;
                                    needSaveToLocalStorage = true;
                                }
                            }
                            else {
                                this.checkPoints.push(item);
                                needSaveToLocalStorage = true;
                            }

                        });

                        this.checkPointsDbts = ans.dbts;
                        window.localStorage.setItem("checkPointsDbts", ans.dbts!);
                        if (needSaveToLocalStorage)
                            window.localStorage.setItem("checkPoints", JSON.stringify(ans.checkPoints));
                    }
                    this.lastSyncroTime = new Date();
                })
                .catch((err: any) => {
                    console.error(err);
                });
        }

    }

    loadTablesFromLocalStore() {
        //console.error("local-store0", appState.rallyHeader);

        appState.user = window.localStorage.getItem("user") || undefined;

        if (window.localStorage.getItem("rallyHeader")) {
            appState.rallyHeader = JSON.parse(window.localStorage.getItem("rallyHeader")!) as IRallyHeader;
            appState.rallyHeaderDbts = window.localStorage.getItem("rallyHeaderDbts") || undefined;
        }

        if (window.localStorage.getItem("rallyLeg")) {
            appState.rallyLeg = JSON.parse(window.localStorage.getItem("rallyLeg")!) as IRallyLeg;
            appState.rallyLegDbts = window.localStorage.getItem("rallyLegDbts") || undefined;
        }


        if (window.localStorage.getItem("rallyPunkt")) {
            appState.rallyPunkt = JSON.parse(window.localStorage.getItem("rallyPunkt")!) as IRallyPunkt;
            appState.rallyPunktDbts = window.localStorage.getItem("rallyPunktDbts") || undefined;
        }

        if (window.localStorage.getItem("legRegistration")) {
            appState.legRegistration = JSON.parse(window.localStorage.getItem("legRegistration")!) as ILegRegistration[];
            appState.legRegistrationDbts = window.localStorage.getItem("legRegistrationDbts") || undefined;
        }

        if (window.localStorage.getItem("pilots")) {
            appState.pilots = JSON.parse(window.localStorage.getItem("pilots")!) as IPilot[];
            appState.pilotsDbts = window.localStorage.getItem("pilotsDbts") || undefined;
        }

        if (window.localStorage.getItem("checkPoints")) {
            appState.checkPoints = JSON.parse(window.localStorage.getItem("checkPoints")!) as ICheckPoint[];
            appState.checkPointsDbts = window.localStorage.getItem("checkPointsDbts") || undefined;
        }

        console.error("local-store1", JSON.parse(window.localStorage.getItem("checkPoints")!) as ICheckPoint[]);

    }

    startSyncronozation() {
        setInterval(() => {
            this.loadTablesFromServer();
        }, 30000);
    }
}


export let appState = new AppState();