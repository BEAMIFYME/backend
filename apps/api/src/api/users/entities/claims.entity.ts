import { BaseEntity } from '../../../database/base/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Claims extends BaseEntity {
  @Column({ default: false })
  isAdministrator: boolean;
  @Column({ default: false })
  isModerator: boolean;
  @Column({ default: true })
  isUser: boolean;
  @Column({ default: false })
  isSupport: boolean;
  @Column({ default: false })
  isCustomer: boolean;
  @Column({ default: false })
  isMerchant: boolean;
  @Column({ default: false })
  isAffiliate: boolean;
  @Column({ default: false })
  isPartner: boolean;
  @Column({ default: false })
  isSubscriber: boolean;
  @Column({ default: false })
  isManager: boolean;
  @Column({ default: false })
  isStaff: boolean;
  @Column({ default: false })
  isDeveloper: boolean;
  @Column({ default: false })
  isTester: boolean;

  @Column({ default: false })
  isBlocked: boolean;
  @Column({ default: false })
  isDisabled: boolean;
  @Column({ default: false })
  isSuspended: boolean;
  @Column({ default: false })
  isBanned: boolean;
  @Column({ default: false })
  isDeleted: boolean;
  @Column({ default: false })
  isArchived: boolean;

  @Column({ default: false })
  isVerified: boolean;
  @Column({ default: false })
  isFeatured: boolean;
  @Column({ default: false })
  isSponsored: boolean;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ default: false })
  isPublic: boolean;
  @Column({ default: false })
  isProtected: boolean;
  @Column({ default: false })
  isPrivate: boolean;
  @Column({ default: false })
  isHidden: boolean;

  @OneToOne(() => User, (user) => user.claims)
  @JoinColumn()
  user: User;
}
