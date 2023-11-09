import { Module } from '@nestjs/common';
import { AutosalonService } from './autosalon.service';
import { AutosalonController } from './autosalon.controller';

@Module({
  controllers: [AutosalonController],
  providers: [AutosalonService],
})
export class AutosalonModule {}
