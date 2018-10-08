import * as Hapi from 'hapi';
import UsersRoutes from './api/users/routes';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<void> {
        await new UsersRoutes().register(server);
    }
}
