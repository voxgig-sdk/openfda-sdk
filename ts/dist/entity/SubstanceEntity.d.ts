import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Substance, SubstanceListMatch } from '../OpenfdaTypes';
declare class SubstanceEntity extends OpenfdaEntityBase<Substance> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: SubstanceEntity): SubstanceEntity;
    list(this: any, reqmatch?: SubstanceListMatch, ctrl?: Control): Promise<SubstanceEntity[]>;
}
export { SubstanceEntity };
