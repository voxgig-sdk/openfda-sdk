import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { N510k, N510kListMatch } from '../OpenfdaTypes';
declare class N510kEntity extends OpenfdaEntityBase<N510k> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: N510kEntity): N510kEntity;
    list(this: any, reqmatch?: N510kListMatch, ctrl?: Control): Promise<N510kEntity[]>;
}
export { N510kEntity };
