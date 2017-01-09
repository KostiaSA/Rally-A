export interface IConfig {
    appName: string;
    apiUrl: string;
    apkUrl: string;
}

let developDir: IConfig = {
    appName: "Северный Forest",
//    apiUrl: "http://5.19.239.191:3000/api",
//    apkUrl: "http://5.19.239.191:3000/downloads/r.apk",
    apiUrl: "http://192.168.0.14:3000/api",
    apkUrl: "http://192.168.0.14:3000/downloads/r.apk",
}

let cloudDir: IConfig = {
    appName: "Северный Forest",
    apiUrl: "http://online.bajarussia.com:3000/api",
    apkUrl: "http://online.bajarussia.com:3000/downloads/r.apk",
}


export let config: IConfig = developDir;