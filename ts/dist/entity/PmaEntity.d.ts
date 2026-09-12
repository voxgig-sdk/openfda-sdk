import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Pma, PmaListMatch } from '../OpenfdaTypes';
declare class PmaEntity extends OpenfdaEntityBase<Pma> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: PmaEntity): PmaEntity;
    list(this: any, reqmatch?: PmaListMatch, ctrl?: Control): Promise<PmaEntity[]>;
}
export { PmaEntity };
