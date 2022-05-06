import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { UserSubscriptionModule } from './user-subscription/user-subscription.module';
import { UserSubscriptionEntity } from './user-subscription/entity/user-subscription.entity';
import { SubscriptionEntity } from './subscription/entity/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pgSubscrServ',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sybscribe_service',
      entities: [UserEntity, UserSubscriptionEntity, SubscriptionEntity],
      //synchronize: true, // not for prod !!!
    }),
    UserModule,
    SubscriptionModule,
    UserSubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
