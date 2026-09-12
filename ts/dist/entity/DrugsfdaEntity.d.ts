import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Drugsfda, DrugsfdaListMatch } from '../OpenfdaTypes';
declare class DrugsfdaEntity extends OpenfdaEntityBase<Drugsfda> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: DrugsfdaEntity): DrugsfdaEntity;
    list(this: any, reqmatch?: DrugsfdaListMatch, ctrl?: Control): Promise<DrugsfdaEntity[]>;
}
export { DrugsfdaEntity };
