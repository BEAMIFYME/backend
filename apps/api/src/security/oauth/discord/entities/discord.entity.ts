import { Entity } from 'typeorm';
import { BaseEntity } from '../../../../database/base/base.entity';

@Entity()
export class Discord extends BaseEntity {
  identify: string;
  email: string;
}
