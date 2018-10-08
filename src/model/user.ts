export default class User {
    public id: string = '';
    public username: string = '';
    public password: string = '';
    public email: string = '';
    public role: string = '';

    static get tableName() {
        return 'users';
    }
}
