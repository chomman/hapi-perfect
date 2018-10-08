import Repository from './base-repository';

export default class CrudResolver {
    constructor(protected repository: Repository) {}

    public async save(data: {}): Promise<{}> {
        return await this.repository.save(data);
    }

    public async getOneById(id: string): Promise<{}> {
        return await this.repository.getById(id);
    }

    public async updateOneById(id: string, update: {}): Promise<{}> {
        return await this.repository.updateById(id, update);
    }

    public async deleteOneById(id: string): Promise<number> {
        return await this.repository.deleteById(id);
    }

    public async getAll(): Promise<{}> {
        return await this.repository.getAll();
    }

    public async bulkDelete(ids: string[]): Promise<number[]> {
        return await Promise.all(ids.map(async id => await this.deleteOneById(id)));
    }
}
