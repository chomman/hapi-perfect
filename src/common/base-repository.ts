export default class Repository {
    constructor() {}

    public async save(_data: Partial<{}>): Promise<{}> {
        return Promise.reject();
    }

    public async getById(_id: string): Promise<{}> {
        return Promise.reject();
    }

    public async getAll(): Promise<{}> {
        return Promise.reject();
    }

    public async updateById(_id: string, _data: {}): Promise<{}> {
        return Promise.reject();
    }

    public async deleteById(_id: string): Promise<number> {
        return Promise.reject();
    }
}
