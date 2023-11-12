import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import * as path from 'path';
import { CustomConfigService } from '../../config/config.service';

export enum EFileTypes {
  Avatar = 'avatar',
  Document = 'document',
  Publications = 'publications',
}

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private readonly customConfigService: CustomConfigService) {
    this.s3Client = new S3Client({
      region: customConfigService.aws_region,
      credentials: {
        accessKeyId: customConfigService.aws_access,
        secretAccessKey: customConfigService.aws_secret,
      },
    });
  }

  public buildPath(
    fileName: string,
    fileType: EFileTypes,
    fileId: string,
  ): string {
    return `${fileType}/${fileId}/${crypto
      .randomBytes(16)
      .toString('hex')}${path.extname(fileName)}`;
  }

  public async uploadFile(
    file: any,
    itemType: EFileTypes,
    itemId: string,
  ): Promise<string> {
    const filePath = this.buildPath(file.originalname, itemType, itemId);

    await this.s3Client.send(
      new PutObjectCommand({
        Key: filePath,
        Bucket: this.customConfigService.aws_bucket,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    return filePath;
  }

  public async deleteFile(fileKey: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Key: fileKey,
        Bucket: this.customConfigService.aws_bucket,
      }),
    );
  }
}
