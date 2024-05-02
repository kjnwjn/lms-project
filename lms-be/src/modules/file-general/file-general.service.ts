import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { renameFile } from 'src/common/helpers/file.helpers';
import { BaseService } from '../../common/base/service/base.service';
import { FileGeneral } from './entities/file-general.entity';
import { FileGeneralRepository } from './repository/file-general.repository';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
@Injectable()
export class FileGeneralService extends BaseService<FileGeneral, FileGeneralRepository> {
  private s3: S3;

  constructor(
    protected readonly fileRepository: FileGeneralRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly logger: XloggerService,
  ) {
    super(fileRepository);
    this.s3 = new S3({
      endpoint: `https://${process.env.B2_ENDPOINT_URL}`,
      region: process.env.B2_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadProductFile(file: Express.Multer.File, productId: number): Promise<FileGeneral> {
    const path: string = await this.uploadPublicFile(file);
    if (!path)
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal Server Error',
      });

    const data = await this.createFile(file, path, productId, null);
    if (!data)
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal Server Error',
      });

    return data;
  }

  async uploadFeedbackFile(file: Express.Multer.File, feedbackId: number): Promise<FileGeneral> {
    const path: string = await this.uploadPublicFile(file);
    if (!path)
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal Server Error',
      });

    const data = await this.createFile(file, path, null, feedbackId);
    if (!data)
      throw this.exceptionService.internalServerErrorException({
        message: 'Internal Server Error',
      });

    return data;
  }

  async deleteFile(id: number) {
    this.logger.log('DELETE FILE by id information: [' + JSON.stringify(id) + ']');

    try {
      const fileGeneral = await this.repository.findOne({ id });
      if (!fileGeneral)
        throw this.exceptionService.badRequestException({
          message: `File ${id} not found`,
        });
      await this.fileRepository.delete(fileGeneral.id);
      await this.deleteBlackBlazeFile(fileGeneral.path);
      return `Delete file ${id} successfully`;
    } catch (error) {
      throw this.exceptionService.badRequestException({
        message: error?.message,
      });
    }
  }

  async deleteBlackBlazeFile(path: string) {
    try {
      const fileName = path.split(`${process.env.B2_ENDPOINT_URL}/`)[1];

      const bucketName = process.env.BUCKET_NAME;
      const params = {
        Bucket: bucketName,
        Key: fileName,
      };
      await this.s3.deleteObject(params);
      return true;
    } catch (error) {
      throw this.exceptionService.badRequestException({
        message: error?.message,
      });
    }
  }

  async uploadPublicFile(file: Express.Multer.File, bucketName?: string): Promise<string> {
    const keyName = renameFile(file);
    try {
      this.logger.log('UPLOAD FILE information: [' + JSON.stringify(file.fieldname) + ']');
      const bucket = bucketName ? bucketName : process.env.BUCKET_NAME;
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: keyName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      return keyName;
    } catch (error) {
      this.logger.error('UPLOAD FILE error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: 'Bad request',
      });
    }
  }

  async generatePresignedUrl(bucketName, objectKey, expiresIn) {
    // expiresIn is the time in seconds after which the URL will expire
    try {
      this.logger.log(
        'GeneratePresignedUrl information: [' + JSON.stringify(bucketName, objectKey) + ']',
      );
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });
      const url = await getSignedUrl(this.s3, command, { expiresIn });
      return url;
    } catch (error) {
      this.logger.error('Error generating presigned URL: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: 'Bad request',
      });
    }
  }

  async createFile(
    file: Express.Multer.File,
    path: string,
    productId?: number,
    feedbackId?: number,
  ): Promise<FileGeneral> {
    const fileSave = new FileGeneral();
    fileSave.path = path;
    fileSave.type = file.mimetype;
    fileSave.size = file.size;
    fileSave.productId = productId ? productId : null;
    fileSave.feedbackId = feedbackId ? feedbackId : null;
    const data = await this.fileRepository.saveData(fileSave);
    return data;
  }
}
