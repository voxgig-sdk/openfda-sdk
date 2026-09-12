import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Enforcement, EnforcementListMatch } from '../OpenfdaTypes';
declare class EnforcementEntity extends OpenfdaEntityBase<Enforcement> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: EnforcementEntity): EnforcementEntity;
    list(this: any, reqmatch?: EnforcementListMatch, ctrl?: Control): Promise<EnforcementEntity[]>;
}
export { EnforcementEntity };
