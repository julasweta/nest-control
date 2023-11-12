import { Controller } from '@nestjs/common';
import { S3Service } from './s3service.service';
import {} from '@nestjs/common';

@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
}
