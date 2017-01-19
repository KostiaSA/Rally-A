export interface IConfig {
    appName: string;
    apiUrl: string;
    apkUrl: string;
}

let developDir: IConfig = {
    appName: "Rally 1.0",
//    apiUrl: "http://5.19.239.191:3000/api",
//    apkUrl: "http://5.19.239.191:3000/downloads/r.apk",
    apiUrl: "http://192.168.0.14:3000/api",
    apkUrl: "http://192.168.0.14:3000/downloads/r.apk",
}

let cloudDir: IConfig = {
    appName: "Rally 1.0",
    apiUrl: "http://online.bajarussia.com/api",
    apkUrl: "http://online.bajarussia.com/downloads/r.apk",
}


export let config: IConfig = cloudDir;