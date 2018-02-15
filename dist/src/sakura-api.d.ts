import { SakuraApi } from '@sakuraapi/core';
export declare class Bootstrap {
    private log;
    private sapi;
    private shuttingDown;
    boot(): Promise<SakuraApi>;
    shutdownServer(signal: string): Promise<void>;
}
