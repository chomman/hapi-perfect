import Resolver from '../../common/base-resolver';
import Repository from '../../common/base-repository';

export default class UserResolver extends Resolver {
    constructor() {
        super(new Repository());
    }
}
