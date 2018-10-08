import * as Hapi from 'hapi';

import Logger from '../helper/logger';
import Config from '../config';

interface IToken {
    username: number;
    expires: Date;
}

export default class Plugins {
    public static async swagger(server: Hapi.Server): Promise<Error | void> {
        try {
            Logger.info('Plugins - Registering hapi-swaggered');

            await server.register([
                require('inert'),
                require('vision'),
                {
                  plugin: require('hapi-swaggered'),
                  options: {
                    tags: {},
                    info: {
                      title: Config.swagger.title,
                      description: Config.swagger.description,
                      version: Config.swagger.version
                    },
                    auth: Config.swagger.auth
                  }
                },
                {
                  plugin: require('hapi-swaggered-ui'),
                  options: {
                    title: Config.swagger.title,
                    path: Config.swagger.path,
                    authorization: {
                      field: 'apiKey',
                      scope: 'query',
                      // valuePrefix: 'bearer '
                      defaultValue: 'demoKey',
                      placeholder: 'Enter your apiKey here'
                    },
                    swaggerOptions: Config.swagger.options,
                    auth: Config.swagger.auth
                  }
                }
              ])
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering hapi-swaggered-ui plugin: ${error}`);
        }
    }

    public static async jwt(server: Hapi.Server): Promise<Error | void> {
        if (!process.env.SECRET) {
            throw new Error('No secret, environment is faulty, check DotEnv issues');
        }

        try {
            Logger.info('Plugins - Registering hapi-auth-jwt2');

            const validate = async (_decodedToken: IToken, _request: Hapi.Request) => {
                // TODO : implement
                return { isValid: false };
            };

            await Plugins.register(server, [
                {
                    plugin: require('hapi-auth-jwt2'),
                    name: 'hapi-auth-jwt2',
                },
            ]);

            server.auth.strategy('jwt', 'jwt', {
                key: process.env.SECRET,
                validate,
                verifyOptions: { algorithms: ['HS256'] },
            });

            server.auth.default('jwt');
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering hapi-auth-jwt plugin: ${error}`);
        }
    }

    public static async registerAll(server: Hapi.Server): Promise<Error | void> {
        // dev plugins
        // if (process.env.NODE_ENV === 'development') {}

        // required
        await Plugins.swagger(server);
        await Plugins.jwt(server);
    }

    private static register(server: Hapi.Server, plugin: Array<{ plugin: any; name: string }>) {
        return server.register(plugin);
    }
}
