import * as Hapi from 'hapi';

import validate from './validate';
import UserController from './controller';

export default class UserRoutes {
    public async register(server: Hapi.Server): Promise<{}> {
        return new Promise(resolve => {
            const controller = new UserController();

            server.route([
                {
                    method: 'POST',
                    path: '/api/users/create',
                    options: {
                        handler: controller.create,
                        validate: validate.create,
                        description: 'Method that allow the user to create an account.',
                        tags: ['api', 'auth'],
                        auth: 'jwt',
                        cors: true,
                    },
                },
                {
                    method: 'POST',
                    path: '/api/users/login',
                    options: {
                        handler: controller.login,
                        validate: validate.login,
                        description: 'Method that allow the user to login.',
                        tags: ['api', 'auth'],
                        auth: false,
                        cors: true,
                    },
                },
            ]);

            resolve();
        });
    }
}
