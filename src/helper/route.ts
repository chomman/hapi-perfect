import * as Hapi from 'hapi';
import * as Boom from 'boom';

interface IRoute {
    register(server: Hapi.Server): Promise<Hapi.ResponseObject | Boom | {}>;
}

export default IRoute;
