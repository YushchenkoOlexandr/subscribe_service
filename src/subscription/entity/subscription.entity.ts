import { UserSubscriptionEntity } from 'src/user-subscription/entity/user-subscription.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', length: 250, nullable: false })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UserSubscriptionEntity, (rp) => rp.subscription)
  users: UserSubscriptionEntity[];
}
