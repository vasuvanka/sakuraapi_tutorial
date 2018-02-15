import { SakuraApi } from '@sakuraapi/core';
export declare class BootstrapIndexes {
    private sapi;
    constructor(sapi: SakuraApi);
    run(): Promise<void>;
}
