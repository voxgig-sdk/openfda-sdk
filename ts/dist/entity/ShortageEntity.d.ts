import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Shortage, ShortageListMatch } from '../OpenfdaTypes';
declare class ShortageEntity extends OpenfdaEntityBase<Shortage> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: ShortageEntity): ShortageEntity;
    list(this: any, reqmatch?: ShortageListMatch, ctrl?: Control): Promise<ShortageEntity[]>;
}
export { ShortageEntity };
