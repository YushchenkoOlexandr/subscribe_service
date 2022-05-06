import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionEntity } from './entity/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async getById(id: string): Promise<SubscriptionEntity> {
    return await this.subscriptionRepository.findOne({
      relations: ['users'],
      where: { id: id },
    });
  }

  async getAll(): Promise<SubscriptionEntity[]> {
    return await this.subscriptionRepository.find({
      relations: ['users'],
    });
  }

  async createUser(
    subscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionEntity> {
    const subscriptionTitle = await this.subscriptionRepository.findOne({
      where: {
        title: subscriptionDto.title,
      },
    });
    if (subscriptionTitle) {
      throw new HttpException(
        'title are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const subscription = this.subscriptionRepository.create(subscriptionDto);
    return await this.subscriptionRepository.save(subscription);
  }

  async completeService(term: string): Promise<SubscriptionEntity[]> {
    const servicesToComplete = await this.findByTerm(term);

    const comleatedServices: SubscriptionEntity[] = [];

    for (let index = 0; index < servicesToComplete.length; index++) {
      const element = servicesToComplete[index];
      element.isActive = false;
      const servUnactiv = await this.subscriptionRepository.save(element);
      comleatedServices.push(servUnactiv);
    }

    return comleatedServices;
  }

  async findByTerm(term: string): Promise<SubscriptionEntity[]> {
    return await this.subscriptionRepository.find({
      where: { title: Like(`% ${term}%`) },
    });
  }
}
