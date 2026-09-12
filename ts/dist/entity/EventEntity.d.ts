import { OpenfdaEntityBase } from '../OpenfdaEntityBase';
import type { OpenfdaSDK } from '../OpenfdaSDK';
import type { Control } from '../types';
import type { Event, EventListMatch } from '../OpenfdaTypes';
declare class EventEntity extends OpenfdaEntityBase<Event> {
    constructor(client: OpenfdaSDK, entopts: any);
    make(this: EventEntity): EventEntity;
    list(this: any, reqmatch?: EventListMatch, ctrl?: Control): Promise<EventEntity[]>;
}
export { EventEntity };
