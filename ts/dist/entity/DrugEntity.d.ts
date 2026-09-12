import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Drug, DrugListMatch } from '../OpenfdaTypes';
declare class DrugEntity extends OpenfdaEntityBase<Drug> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: DrugEntity): DrugEntity;
    list(this: any, reqmatch?: DrugListMatch, ctrl?: Control): Promise<DrugEntity[]>;
}
export { DrugEntity };
