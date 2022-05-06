import { UserSubscriptionEntity } from 'src/user-subscription/entity/user-subscription.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 250, nullable: false })
  email: string;

  @Column({ name: 'name', type: 'varchar', length: 250, default: '' })
  name: string;

  @OneToMany(() => UserSubscriptionEntity, (rp) => rp.user)
  subscriptions: UserSubscriptionEntity[];
}
