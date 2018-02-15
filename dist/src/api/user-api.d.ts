/// <reference types="express" />
import { SakuraApi } from '@sakuraapi/core';
import { NextFunction, Request, Response } from 'express';
export { SakuraApi };
export declare class UserApi extends {
    sapi?: SakuraApi;
    sapiConfig?: any;
} {
    someGetRoute(req: Request, res: Response, next: NextFunction): Promise<void>;
    someGetAllRoute(req: Request, res: Response, next: NextFunction): Promise<void>;
    somePostRoute(req: Request, res: Response, next: NextFunction): Promise<void>;
    somePutRoute(req: Request, res: Response, next: NextFunction): Promise<void>;
    someDeleteRoute(req: Request, res: Response, next: NextFunction): Promise<void>;
}
