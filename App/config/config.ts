export interface IConfig {
    appName: string;
    apiUrl: string;
    apkUrl: string;
}

let developDir: IConfig = {
    appName: "Северный Forest (Gamp)",
    apiUrl: "http://192.168.0.14:3000/api",
    apkUrl: "http://192.168.0.14:3000/downloads/r.apk",
}


export let config: IConfig = developDir;