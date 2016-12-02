

export const CheckPoint_replTable = 2;
export const LegRegistration_replTable = 3;
export const Pilots_replTable = 4;
export const RallyHeader_replTable = 5;
export const RallyLeg_replTable = 6;
export const RallyPunkt_replTable = 7;
export const UsersLink_replTable = 9;


export const BAD_ENCRYPT_KEY_ERROR = "BAD_ENCRYPT_KEY_ERROR";
export const BAD_LOGIN_PASSWORD = "Неверный логин или пароль";


export interface IReq {
    cmd: string;
}

export interface IAns {
    error?: string;
}



// -------  GET_ENCRYPT_KEY ----------
export const GET_ENCRYPT_KEY_CMD = "1";

export interface IGetEncryptKeyReq extends IReq {

}
export interface IGetEncryptKeyAns extends IAns {
    encryptKey: string;
}



// -------  LOGIN ----------
export const LOGIN_CMD = "2";

export interface ILoginReq extends IReq {
    login: string;
    password: string;
}

export interface ILoginAns extends IAns {
    user:string
}



// -------  RallyHeader ----------
export interface IRallyHeader {
    id: number;
    num: string;
    name: string;
    begDate: Date;
    endDate: Date;
    place: string;
}

export const LOAD_RALLYHEADER_CMD = "3";

export interface ILoadRallyHeaderReq extends IReq {
    dbts: string;
}

export interface ILoadRallyHeaderAns extends IAns {
    rallyHeader?: IRallyHeader;
    dbts?: string;
}



// -------  Pilots ----------
export interface IPilot {
    id: number;
    name: string;
    engName: string;
    autoName: string;
}

export const LOAD_PILOTS_CMD = "4";

export interface ILoadPilotsReq extends IReq {
    dbts: string;
}

export interface ILoadPilotsAns extends IAns {
    pilots?: IPilot[];
    dbts?: string;
}

// -------  RallyLeg ----------
export interface IRallyLeg {
    id: number;
    num: string;
    name: string;
    date: Date;
    length:number;
}

export const LOAD_RALLYLEG_CMD = "5";

export interface ILoadRallyLegReq extends IReq {
    dbts: string;
}

export interface ILoadRallyLegAns extends IAns {
    rallyLeg?: IRallyLeg;
    dbts?: string;
}

// -------  RallyPunkt ----------
export interface IRallyPunkt {
    id: number;
    num: string;
    name: string;
    length:number;
}

export const LOAD_RALLYPUNKT_CMD = "6";

export interface ILoadRallyPunktReq extends IReq {
    login:string;
    dbts: string;
}

export interface ILoadRallyPunktAns extends IAns {
    rallyPunkt?: IRallyPunkt;
    dbts?: string;
}

// -------  LegRegistration ----------
export interface ILegRegistration {
    id: number;
    pilotId: number;
    raceNumber: string;
    npp: number;
    startTime: Date;
}

export const LOAD_LEGREGISTRATION_CMD = "7";

export interface ILoadLegRegistrationReq extends IReq {
    dbts: string;
}

export interface ILoadLegRegistrationAns extends IAns {
    legRegistration?: ILegRegistration[];
    dbts?: string;
}

// -------  CheckPoint ----------
export interface ICheckPoint {
    legRegId: number;
    rallyPunktId: number;
    checkTime: Date;
    penaltyTime: Date;

    mobileId: string;
    mobileTime:Date;
    mobileLogin:string;
    mobileDevice:string;
    syncOk:boolean;
}
