"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sakuraapi/core");
exports.SakuraApi = core_1.SakuraApi;
const user_model_1 = require("../models/user-model");
let UserApi = class UserApi extends core_1.SapiRoutableMixin() {
    someGetRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield user_model_1.UserModel.getById(req.params.id);
            }
            catch (err) {
                user = { message: err.message };
            }
            res.status(200).send(user);
            next();
        });
    }
    someGetAllRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield user_model_1.UserModel.get({ filter: {}, limit: 30, skip: 0 });
            }
            catch (err) {
                user = { message: err.message };
            }
            res.status(200).send(user);
            next();
        });
    }
    somePostRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_model_1.UserModel.fromJson(req.body);
            let u;
            try {
                u = yield user.create();
            }
            catch (err) {
                u = { message: err.message };
            }
            res.status(200).send(u);
            next();
        });
    }
    somePutRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.id) {
                res.status(400).send({ message: 'missing id' });
            }
            else {
                const user = user_model_1.UserModel.fromJson(req.body);
                let u;
                try {
                    u = yield user.save();
                }
                catch (err) {
                    u = { message: err.message };
                }
                res.status(200).send(u);
            }
            next();
        });
    }
    someDeleteRoute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield user_model_1.UserModel.removeById(req.params.id);
            }
            catch (err) {
                user = { message: err.message };
            }
            res.status(200).send(user);
            next();
        });
    }
};
__decorate([
    core_1.Route({
        method: 'get',
        path: ':id'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "someGetRoute", null);
__decorate([
    core_1.Route({
        method: 'get',
        path: ''
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "someGetAllRoute", null);
__decorate([
    core_1.Route({
        method: 'post',
        path: ''
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "somePostRoute", null);
__decorate([
    core_1.Route({
        method: 'put',
        path: ':id'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "somePutRoute", null);
__decorate([
    core_1.Route({
        method: 'delete',
        path: ':id'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserApi.prototype, "someDeleteRoute", null);
UserApi = __decorate([
    core_1.Routable({
        baseUrl: 'users',
        model: user_model_1.UserModel,
        suppressApi: true
    })
], UserApi);
exports.UserApi = UserApi;
//# sourceMappingURL=user-api.js.map