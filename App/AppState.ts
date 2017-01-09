import {observable} from "mobx";
import {IAppPage} from "./App";
import {
    IRallyHeader,  ILoadRallyHeaderReq, LOAD_RALLYHEADER_CMD, ILoadRallyHeaderAns,
    IRallySpecUch, ILoadRallySpecUchReq, LOAD_RALLYSPECUCH_CMD, ILoadRallySpecUchAns, IRallyPunkt, ILoadRallyPunktReq,
    LOAD_RALLYPUNKT_CMD, ILoadRallyPunktAns, ILegRegistration, ILoadLegRegistrationReq, LOAD_LEGREGISTRATION_CMD,
    ILoadLegRegistrationAns,  LOAD_CHECKPOINTS_CMD, ILoadCheckPointsReq,
    ILoadCheckPointsAns, ICheckPoint, ISaveCheckPointsReq, ISaveCheckPointsAns, SAVE_CHECKPOINTS_CMD
} from "./api/api";
import {httpRequest} from "./utils/httpRequest";
import {getRandomString} from "./utils/getRandomString";
import {showToast} from "./utils/showToast";
import moment = require("moment");
import {getIsCordovaApp} from "./utils/getIsCordovaApp";

export class AppState {
    @observable sessionId: string;
    @observable login: string;
    @observable password: string;
    @observable user?: string;

    @observable activePage: IAppPage;

    @observable winHeight: number;
    @observable winWidth: number;

    @observable lastSyncroTime: Date;
    @observable currSpecUchIndex: number = 0;

    loginPage: IAppPage;
    flagPage: IAppPage;
    flagPage2: IAppPage;
    cardPage: IAppPage;

    encryptKey: string;

    gpsLastGpsTime?: Date;
    gpsLastDeviceTime?: Date;
    @observable gonkaTime?: Date;


    rallyHeaderDbts?: string;
    pilotsDbts?: string;
    rallySpecUchDbts?: string;
    rallyPunktDbts?: string;
    legRegistrationDbts?: string;
    checkPointsDbts?: string;


    @observable rallyHeader?: IRallyHeader;
    //@observable pilots: IPilot[] = [];
    @observable rallySpecUch?: IRallySpecUch[];
    @observable rallyPunkt?: IRallyPunkt;
    @observable legRegistration: ILegRegistration[] = [];
    @observable checkPoints: ICheckPoint[] = [];
    @observable finishList: Date[] = [];

    clearState() {
        this.rallyHeaderDbts = "";
        this.pilotsDbts = "";
        this.rallySpecUchDbts = "";
        this.rallyPunktDbts = "";
        this.legRegistrationDbts = "";
        this.checkPointsDbts = "";

        this.rallyHeader = undefined;
        //this.pilots = [];
        this.rallySpecUch = undefined;
        this.rallyPunkt = undefined;
        this.legRegistration = [];
        this.checkPoints = [];
    }

    getIsLogined() {
        return this.encryptKey !== undefined;
    }

    // getPilot(pilotId: number): IPilot {
    //     let ret: IPilot | undefined = (this.pilots || []).find((item: IPilot) => item.id === pilotId);
    //     return ret || {id: -1, name: "", engName: "", autoName: ""};
    // }

    getLegRegistrationByRaceNumber(raceNum: string): ILegRegistration {
        let ret: ILegRegistration | undefined = (this.legRegistration || []).find((item: ILegRegistration) => item.raceNumber.trim() === raceNum.trim());
        return ret || {id: -1} as any;
    }

    getCheckPointByRallyPunktAndLegRegsId(punktId: number, legRegsId: number): ICheckPoint | undefined {
        return (this.checkPoints || []).find((item: ICheckPoint) => item.rallyPunktId === punktId && item.legRegsId === legRegsId);
    }

    getCheckPointByMobileId(mobileId: string): ICheckPoint | undefined {
        return (this.checkPoints || []).find((item: ICheckPoint) => item.mobileId === mobileId);
    }

    // getCheckPointByRallyPunktAndLegRegsId(punktId: number, legRegsId: number): ICheckPoint | undefined {
    //     return (this.checkPoints || []).find((item: ICheckPoint) => item.rallyPunktId === punktId && item.legRegsId === legRegsId);
    // }

    pushNewCheck(legRegsId: number, time: Date) {

        // let check: ICheckPoint = {
        //     legRegsId: legRegsId,
        //     rallyPunktId: this.rallyPunkt!.id,
        //     checkTime: time,
        //     penaltyTime: new Date(1990, 1, 1),
        //
        //     mobileId: getRandomString(),
        //     mobileTime: new Date(),
        //     mobileLogin: this.login,
        //     mobileDevice: platform.description!,
        //     syncOk: false
        // };
        //
        this.checkPoints.push(this.getNewCheck(legRegsId, time));
        showToast("записано " + moment(time).format("HH:mm:ss"));
    }

    getNewCheck(legRegsId: number, time: Date): ICheckPoint {

        let check: ICheckPoint = {
            legRegsId: legRegsId,
            rallyPunktId: this.rallyPunkt!.id,
            checkTime: time,
            penaltyTime: new Date(1990, 1, 1),

            mobileId: getRandomString(),
            mobileTime: new Date(),
            mobileLogin: this.login,
            mobileDevice: platform.description!,
            syncOk: false
        };

        return check;
    }

    pushNewFinish(time: Date) {

        this.finishList.push(time);
        //showToast("записано " + moment(time).format("HH:mm:ss"));
    }

    loadTablesFromServer() {
        if (!this.getIsLogined())
            return;

        this.load_RallyHeader_FromServer();
        this.load_RallySpecUch_FromServer();
        this.load_RallyPunkt_FromServer();
        this.load_LegRegistration_FromServer();
        //this.load_Pilots_FromServer();

        setTimeout(() => {
            this.load_CheckPoints_FromServer();
        }, 3000);

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
                    this.rallyHeader.begDate = new Date(this.rallyHeader.begDate);
                    this.rallyHeader.endDate = new Date(this.rallyHeader.endDate);
                    window.localStorage.setItem("rallyHeaderDbts", ans.dbts!);
                    window.localStorage.setItem("rallyHeader", JSON.stringify(ans.rallyHeader));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    load_RallySpecUch_FromServer() {

        let req: ILoadRallySpecUchReq = {
            cmd: LOAD_RALLYSPECUCH_CMD,
            dbts: this.rallySpecUchDbts || ""
        };

        httpRequest<ILoadRallySpecUchReq,ILoadRallySpecUchAns>(req)
            .then((ans: ILoadRallySpecUchAns) => {
                if (ans.rallySpecUch) {
                    this.rallySpecUchDbts = ans.dbts;
                    this.rallySpecUch = ans.rallySpecUch;

                    //todo  this.rallySpecUch.date = new Date(this.rallySpecUch.date)
                    // this.rallySpecUch.date = new Date(this.rallySpecUch.date);

                    window.localStorage.setItem("rallySpecUchDbts", ans.dbts!);
                    window.localStorage.setItem("rallySpecUch", JSON.stringify(ans.rallySpecUch));
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

                    // this.legRegistration.forEach((item: ILegRegistration) => {
                    //     item.startTime = new Date(item.startTime);
                    // });

                    window.localStorage.setItem("legRegistrationDbts", ans.dbts!);
                    window.localStorage.setItem("legRegistration", JSON.stringify(ans.legRegistration));
                }
                this.lastSyncroTime = new Date();
            })
            .catch((err: any) => {
                console.error(err);
            });


    }

    // load_Pilots_FromServer() {
    //
    //     let req: ILoadPilotsReq = {
    //         cmd: LOAD_PILOTS_CMD,
    //         dbts: this.pilotsDbts || ""
    //     };
    //
    //     httpRequest<ILoadPilotsReq,ILoadPilotsAns>(req)
    //         .then((ans: ILoadPilotsAns) => {
    //             if (ans.pilots) {
    //                 this.pilotsDbts = ans.dbts;
    //                 this.pilots = ans.pilots;
    //                 window.localStorage.setItem("pilotsDbts", ans.dbts!);
    //                 window.localStorage.setItem("pilots", JSON.stringify(ans.pilots));
    //             }
    //             this.lastSyncroTime = new Date();
    //         })
    //         .catch((err: any) => {
    //             console.error(err);
    //         });
    //
    //
    // }

    load_CheckPoints_FromServer() {

        if (this.rallyPunkt && this.rallySpecUch) {

            let req: ILoadCheckPointsReq = {
                cmd: LOAD_CHECKPOINTS_CMD,
                rallyPunktId: this.rallyPunkt.id,
                dbts: this.checkPointsDbts || ""
            };

            let currPunkId = this.rallyPunkt.id;

            httpRequest<ILoadCheckPointsReq,ILoadCheckPointsAns>(req)
                .then((ans: ILoadCheckPointsAns) => {
                    if (ans.checkPoints) {

                        // удаляем все со старых RallyPukt
                        this.checkPoints = this.checkPoints.filter((item: ICheckPoint) => {
                            return item.rallyPunktId === currPunkId || item.syncOk !== true
                        });

                        let needSaveToLocalStorage = false;

                        ans.checkPoints.forEach((item: ICheckPoint, index: number) => {

                            console.log("new Date(item.checkTime)", item.checkTime);

                            item.checkTime = new Date(item.checkTime);
                            item.penaltyTime = new Date(item.penaltyTime);

                            let oldItem: ICheckPoint | undefined = this.getCheckPointByRallyPunktAndLegRegsId(item.rallyPunktId, item.legRegsId);
                            if (oldItem) {
                                if (oldItem.syncOk === true && JSON.stringify(oldItem) !== JSON.stringify(item)) {
                                    this.checkPoints![index] = item;
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

        if (window.localStorage.getItem("rallySpecUch")) {
            appState.rallySpecUch = JSON.parse(window.localStorage.getItem("rallySpecUch")!) as IRallySpecUch[];
            appState.rallySpecUchDbts = window.localStorage.getItem("rallySpecUchDbts") || undefined;
        }


        if (window.localStorage.getItem("rallyPunkt")) {
            appState.rallyPunkt = JSON.parse(window.localStorage.getItem("rallyPunkt")!) as IRallyPunkt;
            appState.rallyPunktDbts = window.localStorage.getItem("rallyPunktDbts") || undefined;
        }

        if (window.localStorage.getItem("legRegistration")) {
            appState.legRegistration = JSON.parse(window.localStorage.getItem("legRegistration")!) as ILegRegistration[];
            appState.legRegistrationDbts = window.localStorage.getItem("legRegistrationDbts") || undefined;
        }

        // if (window.localStorage.getItem("pilots")) {
        //     appState.pilots = JSON.parse(window.localStorage.getItem("pilots")!) as IPilot[];
        //     appState.pilotsDbts = window.localStorage.getItem("pilotsDbts") || undefined;
        // }

        if (window.localStorage.getItem("checkPoints")) {
            appState.checkPoints = JSON.parse(window.localStorage.getItem("checkPoints")!) as ICheckPoint[];
            appState.checkPointsDbts = window.localStorage.getItem("checkPointsDbts") || undefined;
        }

       // console.error("local-store1", JSON.parse(window.localStorage.getItem("checkPoints")!) as ICheckPoint[]);

    }


    save_CheckPoints_ToServer() {

        let req: ISaveCheckPointsReq = {
            cmd: SAVE_CHECKPOINTS_CMD,
            checkPoints: this.checkPoints.filter((item: ICheckPoint) => !item.syncOk)
        };

        if (req.checkPoints.length > 0) {


            httpRequest<ISaveCheckPointsReq,ISaveCheckPointsAns>(req)
                .then((ans: ISaveCheckPointsAns) => {

                    req.checkPoints.forEach((item: ICheckPoint) => {
                        let cp = this.getCheckPointByMobileId(item.mobileId);
                        if (cp)
                            cp.syncOk = true;
                        else
                            alert("internal error syncOk");
                    });

                    this.lastSyncroTime = new Date();

                })
                .catch((err: any) => {
                    console.error(err);
                });
        }

    }

    startSyncronization() {
        setInterval(() => {
            this.loadTablesFromServer();
        }, 60000);

        setInterval(() => {
            this.save_CheckPoints_ToServer();
        }, 5000);


        // вычисляем gonkaTime
        setInterval(() => {
            if (appState.rallySpecUch && appState.rallySpecUch[appState.currSpecUchIndex]) {
                let deviceTimeZoneOffset = new Date().getTimezoneOffset();
                let gonkaTimeZoneOffset = appState.rallySpecUch[appState.currSpecUchIndex].timeZone * -60;

                if (!this.gpsLastDeviceTime || !getIsCordovaApp()) {
                    this.gonkaTime = new Date(new Date().getTime() + deviceTimeZoneOffset * 60000 - gonkaTimeZoneOffset * 60000);
                }
                else {
                    let gpsDelta = this.gpsLastGpsTime!.getTime() - this.gpsLastDeviceTime!.getTime();
                    this.gonkaTime = new Date(new Date().getTime() + gpsDelta + deviceTimeZoneOffset * 60000 - gonkaTimeZoneOffset * 60000);

                }
            }
        }, 500);


        // Implement this in `deviceready` event callback
        if (getIsCordovaApp()) {
            ((window as any)["AdvancedGeolocation"] as any).start(function (success: any) {

                    try {
                        var jsonObject = JSON.parse(success);
                        //console.log(jsonObject);
                        //console.log(jsonObject.provider, new Date(jsonObject.timestamp));
                        let gpsTime = new Date(jsonObject.timestamp);
                        let deviceTime = new Date();
                        if (gpsTime.getFullYear() === deviceTime.getFullYear()) {
                            appState.gpsLastGpsTime = gpsTime;
                            appState.gpsLastDeviceTime = deviceTime;
                        }
                    }
                    catch (exc) {
                        //appState.gpsOk = false;
                        //console.log("Invalid JSON: " + exc);
                    }
                },
                function (error: any) {
                    //appState.gpsOk = false;
                    //console.log("ERROR! " + JSON.stringify(error));
                },
                ////////////////////////////////////////////
                //
                // REQUIRED:
                // These are required Configuration options!
                // See API Reference for additional details.
                //
                ////////////////////////////////////////////
                {
                    "minTime": 500,         // Min time interval between updates (ms)
                    "minDistance": 1,       // Min distance between updates (meters)
                    "noWarn": true,         // Native location provider warnings
                    "providers": "gps",     // Return GPS, NETWORK and CELL locations
                    "useCache": false,       // Return GPS and NETWORK cached locations
                    "satelliteData": false, // Return of GPS satellite info
                    "buffer": false,        // Buffer location data
                    "bufferSize": 0,        // Max elements in buffer
                    "signalStrength": false // Return cell signal strength data
                });
        }
    }
}


export let appState = new AppState();