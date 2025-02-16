import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { extname } from 'path';
import { Readable } from 'stream';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class StorageService {
  private minioClient: Client;
  private bucketName:  string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME') || 'default';

    this.minioClient = new Client({
      endPoint:  this.configService.get<string>('MINIO_ENDPOINT') || 'localhost',
      useSSL:    true,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY') || 'minioadmin',
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY') || 'minioadmin',
    });

    this.ensureBucketExists();
  }
  async ensureBucketExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);

    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileStream = Readable.from(file.buffer);
    const fileExtension = extname(file.originalname);
    const randomFileName = `${uuidV4()}${fileExtension}`;

    await this.minioClient.putObject(this.bucketName, randomFileName, fileStream, file.size);

    return await this.getFileUrl(randomFileName);
  }
  async getFileUrl(fileName: string): Promise<string> {
    return await this.minioClient.presignedUrl('GET', this.bucketName, fileName, 24 * 60 * 60);
  }
}
