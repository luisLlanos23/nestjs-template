import { BaseService } from 'src/base/base.service';
import { Base as BaseEntity }  from 'src/base/base.entity';

export abstract class BaseController<ENTITY extends BaseEntity, CREATE_DTO, UPDATE_DTO> {
  private service: BaseService<ENTITY, CREATE_DTO, UPDATE_DTO>;
  protected constructor(service: BaseService<ENTITY, CREATE_DTO, UPDATE_DTO>) {
    this.service = service;
  }

  async create(createDto: CREATE_DTO) {
    const result = await this.service.create(createDto);
    return { data: result };
  }

  async findAll() {
    const result = await this.service.findAll();
    return { data: result };
  }

  async findOne(id: string) {
    const result = await this.service.findOne(+id);
    return { data: result };
  }

  async update(id: string, updateDto: UPDATE_DTO) {
    const result = await this.service.update(+id, updateDto);
    return { data: result };
  }

  async remove(id: string) {
    const result = await this.service.remove(+id);
    return { data: result };
  }
  getDateNow(): string {
    return new Date(Date.now()).toLocaleDateString('zh-Hans-CN');
  }
}
