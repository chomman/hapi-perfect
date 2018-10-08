import * as Hapi from 'hapi';
import * as DotEnv from 'DotEnv';

import Logger from './helper/logger';
import Plugin from './plugin';
import Router from './router';

// import * as fs from 'fs';

export default class Server {
    private static _instance: Hapi.Server;

    public static async start(): Promise<Hapi.Server> {
        try {
            Server._instance = new Hapi.Server({
                host: process.env.HOST,
                port: process.env.PORT,
                routes: {cors: {origin: ['*']}},
                // SSL
                /* tls: {
                    key: fs.readFileSync(`${process.cwd()}/privkey.pem`, { encoding: 'utf8' }),
                    cert: fs.readFileSync(`${process.cwd()}/fullchain.pem`, { encoding: 'utf8' }),
                }, */
            });

            DotEnv.config();
            
            await Plugin.registerAll(Server._instance);
            await Router.loadRoutes(Server._instance);

            // redirect to docs by default
            Server._instance.route({
                path: '/',
                method: 'GET',
                handler (_request, h) {
                  return h.response().redirect('/docs')
                },
                options: {
                    auth: false
                }
            });

            await Server._instance.start();

            Logger.info(`Server - Up and running!`);

            return Server._instance;
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);

            throw error;
        }
    }

    public static stop(): Promise<void> {
        Logger.info(`Server - Stopping!`);

        return Server._instance.stop();
    }

    public static async recycle(): Promise<Hapi.Server> {
        await Server.stop();

        return await Server.start();
    }

    public static instance(): Hapi.Server {
        return Server._instance;
    }

    public static async inject(options: string | Hapi.ServerInjectOptions): Promise<Hapi.ServerInjectResponse> {
        return await Server._instance.inject(options);
    }
}
