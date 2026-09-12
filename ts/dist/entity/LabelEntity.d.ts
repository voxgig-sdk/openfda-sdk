import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Label, LabelListMatch } from '../OpenfdaTypes';
declare class LabelEntity extends OpenfdaEntityBase<Label> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: LabelEntity): LabelEntity;
    list(this: any, reqmatch?: LabelListMatch, ctrl?: Control): Promise<LabelEntity[]>;
}
export { LabelEntity };
