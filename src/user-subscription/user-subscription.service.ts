import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UserSubscriptionEntity } from './entity/user-subscription.entity';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectRepository(UserSubscriptionEntity)
    private readonly subscriptionRepository: Repository<UserSubscriptionEntity>,
  ) {}

  async getByUserId(userId: string): Promise<UserSubscriptionEntity[]> {
    console.log(JSON.stringify(userId));
    return await this.subscriptionRepository.find({
      where: { userId: userId, isBan: false },
    });
  }

  async getBySubscriptionId(
    subscriptionId: string,
  ): Promise<UserSubscriptionEntity[]> {
    return await this.subscriptionRepository.find({
      where: { subscriptionId: subscriptionId },
    });
  }

  async createUser(
    subscriptionDto: CreateUserSubscriptionDto,
  ): Promise<UserSubscriptionEntity> {
    const subscriptionsByUserId = await this.subscriptionRepository.findOne({
      where: {
        userId: subscriptionDto.userId,
        subscriptionId: subscriptionDto.subscriptionId,
      },
    });
    if (subscriptionsByUserId) {
      throw new HttpException(
        'title are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const subscription = this.subscriptionRepository.create(subscriptionDto);
    return await this.subscriptionRepository.save(subscription);
  }

  async banUserService(
    subscriptionDto: CreateUserSubscriptionDto,
  ): Promise<UserSubscriptionEntity> {
    const subscriptionsByUserId = await this.subscriptionRepository.findOne({
      where: {
        userId: subscriptionDto.userId,
        subscriptionId: subscriptionDto.subscriptionId,
      },
    });
    if (!subscriptionsByUserId) {
      throw new HttpException(
        'not find UserSubscription',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    subscriptionsByUserId.isBan = true;
    return await this.subscriptionRepository.save(subscriptionsByUserId);
  }

  async getRateServices() {
    const servicesCount = this.subscriptionRepository
      .createQueryBuilder('user_subscription')
      .select('user_subscription.subscriptionId', 'subscriptionId')
      .addSelect('COUNT(user_subscription.userId)', 'rate')
      .where('not user_subscription.isBan')
      .groupBy('user_subscription.subscriptionId')
      .orderBy('COUNT(user_subscription.userId)', 'DESC')
      .getRawMany();

    return servicesCount;
  }
}
