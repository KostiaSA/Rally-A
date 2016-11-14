export const GET_ENCRYPT_KEY = "1";


export const BAD_ENCRYPT_KEY_ERROR="BAD_ENCRYPT_KEY_ERROR";


export interface IReq {
    cmd: string;
}

export interface IAns {
    error?: string;
}

export interface IGetEncryptKeyReq extends IReq {

}

export interface IGetEncryptKeyAns extends IAns {
    encryptKey: string;
}