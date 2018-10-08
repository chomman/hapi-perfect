import * as Hapi from 'hapi';
import * as argon2 from 'argon2';

export interface IEntityPayload {
    [key: string]: any;
}

export default class Utils {
    public static getUrl(request: Hapi.Request): string {
        return `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}${request.url.path}`;
    }

    public static async hashPassword(plain: string): Promise<string> {
        return argon2.hash(plain);
    }

    public static checkPassword(plain: string, hash: string): Promise<boolean> {
        return argon2.verify(hash, plain);
    }

    public static sanitize(plain: string) {
        const extension = plain
            .split('.')
            .slice(0)
            .pop();
        if (!extension) {
            throw new Error('Wrong file');
        }

        return plain.replace(extension, '').replace(/\W+/g, '') + '.' + extension;
    }

    public static slugify(plain: string) {
        return plain
            .toString()
            .toLowerCase()
            .replace('é', 'e')
            .replace('è', 'e')
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    public static getExtension(filename: string) {
        const i = filename.lastIndexOf('.');
        return i < 0 ? '' : filename.substr(i + 1);
    }
}
