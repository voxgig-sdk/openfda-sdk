import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Classification, ClassificationListMatch } from '../OpenfdaTypes';
declare class ClassificationEntity extends OpenfdaEntityBase<Classification> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: ClassificationEntity): ClassificationEntity;
    list(this: any, reqmatch?: ClassificationListMatch, ctrl?: Control): Promise<ClassificationEntity[]>;
}
export { ClassificationEntity };
