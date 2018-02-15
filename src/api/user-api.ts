import {Routable, Route, SakuraApi, SapiRoutableMixin} from '@sakuraapi/core';
import {UserModel} from '../models/user-model';
import {NextFunction, Request, Response} from 'express';

export {SakuraApi};

@Routable({
  baseUrl: 'users',
  model: UserModel,
  suppressApi: true
})
export class UserApi extends SapiRoutableMixin() {
  // get
  @Route({
    method: 'get',
    path: ':id'
  })
  async someGetRoute(req: Request, res: Response, next: NextFunction) {
    let user;
    try {
      user = await UserModel.getById(req.params.id);

    } catch (err) {
      user = {message: err.message};
    }
    res.status(200).send(user);
    next();
  }

  // get all
  @Route({
    method: 'get',
    path: ''
  })
  async someGetAllRoute(req: Request, res: Response, next: NextFunction) {
    let user;
    try {
      user = await UserModel.get({filter: {}, limit: 30, skip: 0});

    } catch (err) {
      user = {message: err.message};
    }
    res.status(200).send(user);
    next();
  }

  // post
  @Route({
    method: 'post',
    path: ''
  })
  async somePostRoute(req: Request, res: Response, next: NextFunction) {
    const user = UserModel.fromJson(req.body);
    let u;
    try {
      u = await user.create();
    } catch (err) {
      u = {message: err.message};
    }
    res.status(200).send(u);
    next();
  }

  // put
  @Route({
    method: 'put',
    path: ':id'
  })
  async somePutRoute(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      res.status(400).send({message: 'missing id'});
    } else {
      // req.body.id = req.params.id;
      const user = UserModel.fromJson(req.body);
      let u;
      try {
        u = await user.save();
      } catch (err) {
        u = {message: err.message};
      }
      res.status(200).send(u);
    }

    next();
  }

  // put
  @Route({
    method: 'delete',
    path: ':id'
  })
  async someDeleteRoute(req: Request, res: Response, next: NextFunction) {
    let user;
    try {
      user = await UserModel.removeById(req.params.id);
    } catch (err) {
      user = {message: err.message};
    }
    res.status(200).send(user);
    next();
  }
}
