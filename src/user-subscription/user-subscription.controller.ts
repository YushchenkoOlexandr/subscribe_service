import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UserSubscriptionEntity } from './entity/user-subscription.entity';
import { UserSubscriptionService } from './user-subscription.service';

@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  @Get('/by-user/:userId')
  getByUserId(
    @Param('userId') userId: string,
  ): Promise<UserSubscriptionEntity[]> {
    console.log(JSON.stringify(userId));
    return this.userSubscriptionService.getByUserId(userId);
  }

  @Get('/by-subscription/:subscriptionId')
  getBySubscriptionId(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<UserSubscriptionEntity[]> {
    console.log(JSON.stringify(subscriptionId));
    return this.userSubscriptionService.getBySubscriptionId(subscriptionId);
  }

  @Post('/create')
  createUser(
    @Body() createUserSubscriptionDto: CreateUserSubscriptionDto,
  ): Promise<UserSubscriptionEntity> {
    console.log(createUserSubscriptionDto);

    return this.userSubscriptionService.createUser(createUserSubscriptionDto);
  }

  @Post('/ban')
  banUser(
    @Body() createUserSubscriptionDto: CreateUserSubscriptionDto,
  ): Promise<UserSubscriptionEntity> {
    console.log(createUserSubscriptionDto);

    return this.userSubscriptionService.banUserService(
      createUserSubscriptionDto,
    );
  }

  @Get('/rate')
  getRateServices(): Promise<any> {
    return this.userSubscriptionService.getRateServices();
  }
}
