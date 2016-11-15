export const GET_ENCRYPT_KEY_CMD = "1";
export const LOGIN_CMD = "2";


export const BAD_ENCRYPT_KEY_ERROR="BAD_ENCRYPT_KEY_ERROR";
export const BAD_LOGIN_PASSWORD="Неверный логин или пароль";


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

export interface ILoginReq extends IReq {
    login:string;
    password:string;
}

export interface ILoginAns extends IAns {
}