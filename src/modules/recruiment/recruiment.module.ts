import { Module } from '@nestjs/common';
import { RecruimentService } from './recruiment.service';
import { RecruimentController } from './recruiment.controller';

@Module({
  controllers: [RecruimentController],
  providers: [RecruimentService],
})
export class RecruimentModule {}
