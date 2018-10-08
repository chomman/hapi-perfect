import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as Uuid from 'uuid/v4';

import Utils, { IEntityPayload } from '../helper/utils';
import Logger from '../helper/logger';
import CrudResolver from '../common/base-resolver';

export default class CrudController {
    constructor(private crudResolver: CrudResolver) {}

    public create = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`POST - ${Utils.getUrl(request)}`);

            const payload: IEntityPayload = request.payload as IEntityPayload;

            payload.id = Uuid();

            const data: IEntityPayload = await this.crudResolver.save(payload);

            Logger.info('CREATED entity :', request.payload);

            return h.response({
                statusCode: 200,
                data: {
                    id: data.id,
                },
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public updateById = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`PUT - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            return h.response({
                statusCode: 404,
                data: id,
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public getById = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            const entity: {} = await this.crudResolver.getOneById(id);

            return h.response({
                statusCode: 200,
                data: entity,
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public getAll = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const entities: {} = await this.crudResolver.getAll();

            return h.response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public deleteById = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`DELETE - ${Utils.getUrl(request)}`);

            const id = encodeURIComponent(request.params.id);

            await this.crudResolver.deleteOneById(id);

            return h.response({
                statusCode: 200,
                data: { id },
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };

    public bulkDelete = async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject | Boom> => {
        try {
            Logger.info(`GET - ${Utils.getUrl(request)}`);

            const payload: IEntityPayload = request.payload as IEntityPayload;

            const ids: string[] = payload.ids as string[];

            const entities: number[] = await this.crudResolver.bulkDelete(ids);

            if (!entities) {
                return Boom.notFound('Items not found.');
            }

            return h.response({
                statusCode: 200,
                data: entities,
            });
        } catch (error) {
            return Boom.badImplementation(error);
        }
    };
}
