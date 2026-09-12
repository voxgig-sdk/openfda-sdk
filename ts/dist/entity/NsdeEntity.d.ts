import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Nsde, NsdeListMatch } from '../OpenfdaTypes';
declare class NsdeEntity extends OpenfdaEntityBase<Nsde> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: NsdeEntity): NsdeEntity;
    list(this: any, reqmatch?: NsdeListMatch, ctrl?: Control): Promise<NsdeEntity[]>;
}
export { NsdeEntity };
