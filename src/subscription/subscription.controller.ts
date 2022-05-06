import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionEntity } from './entity/subscription.entity';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('/:id')
  getById(@Param('id') id: string): Promise<SubscriptionEntity> {
    return this.subscriptionService.getById(id);
  }

  @Get()
  getAll(): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.getAll();
  }

  @Post('/create')
  createUser(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionEntity> {
    console.log(createSubscriptionDto);

    return this.subscriptionService.createUser(createSubscriptionDto);
  }

  @Post('/autocomplete/:term')
  completeService(@Param('term') term: string): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.completeService(term);
  }

  @Get('/find-by-term/:term')
  findByTerm(@Param('term') term: string): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.findByTerm(term);
  }
}
