import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Problem, ProblemListMatch } from '../OpenfdaTypes';
declare class ProblemEntity extends OpenfdaEntityBase<Problem> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: ProblemEntity): ProblemEntity;
    list(this: any, reqmatch?: ProblemListMatch, ctrl?: Control): Promise<ProblemEntity[]>;
}
export { ProblemEntity };
