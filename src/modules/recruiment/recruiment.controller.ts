import { Controller } from '@nestjs/common';
import { RecruimentService } from './recruiment.service';

@Controller('recruiment')
export class RecruimentController {
  constructor(private readonly recruimentService: RecruimentService) {}
}
