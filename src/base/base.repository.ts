import { Repository } from 'typeorm';
import { Base } from 'src/base/base.entity';

export abstract class BaseRepo<ENTITY extends Base> extends Repository<ENTITY> {}
