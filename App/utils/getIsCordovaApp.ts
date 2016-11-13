export function getIsCordovaApp(): boolean {
    return (window as any).cordova !== undefined;
}