import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Ndc, NdcListMatch } from '../OpenfdaTypes';
declare class NdcEntity extends OpenfdaEntityBase<Ndc> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: NdcEntity): NdcEntity;
    list(this: any, reqmatch?: NdcListMatch, ctrl?: Control): Promise<NdcEntity[]>;
}
export { NdcEntity };
