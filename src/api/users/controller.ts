import * as Hapi from 'hapi';
import * as Boom from 'boom';

// import * as jwt from 'jsonwebtoken';
// import * as Uuid from 'uuid/v4';

import Utils from '../../helper/utils';
import User from '../../model/user';
import UserResolver from './resolver';
import Logger from '../../helper/logger';
import CrudController from '../../common/crud-controller';

export interface IUserToken extends User {
    expires: Date;
    issuer: string;
    expiresIn: string;
}

export default class UserController extends CrudController {
    constructor() {
        super(new UserResolver());
    }

    public create = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`POST - ${Utils.getUrl(request)}`);

            /* const res: User = request.payload as User;

            return Utils.hashPassword(res.password).then(async (hash: string) => {
                const user = {
                    id: Uuid(),
                    username: res.username,
                    password: hash,
                    access: res.access,
                    email: res.email,
                };

                try {
                    await User.query().insert(user);
                    // Logger.warn('CREATED User :', user);
                    delete user.password;

                    return h.response({
                        statusCode: 200,
                        data: user,
                    });
                } catch (error) {
                    return Boom.badImplementation(error);
                }
            })*/

            return h.response({
                statusCode: 200,
                data: "not implemented",
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public login = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`POST - ${Utils.getUrl(request)}`);

            // Logger.warn('Login User :', request.payload);

            /* if (!process.env.SECRET) {
                return Boom.badImplementation('environment faulty');
            }
            const payload: IUserToken = request.payload as IUserToken;

            const users = await User.query()
                .select('users.*')
                .where('users.username', payload.username);

            if (users.length === 0) {
                return Boom.notFound('User not found');
            }

            const passOk = await Utils.checkPassword(payload.password, users[0].password);

            if (!passOk) {
                Logger.error('invalid user');
                return Boom.forbidden('Invalid user');
            }

            delete payload.password;
            const twoHoursLater = new Date();
            twoHoursLater.setHours(twoHoursLater.getHours() + 2);

            payload.expires = twoHoursLater;
            payload.issuer = process.env.ISSUER as string;
            payload.expiresIn = process.env.EXPIRES_IN as string;

            const secret: jwt.Secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

            return h.response({
                statusCode: 200,
                result: {
                    token,
                },
            });*/

            return h.response({
                statusCode: 200,
                data: "not implemented",
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };
}
