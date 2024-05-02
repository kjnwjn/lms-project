import {
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
} from '@nestjs/common';
import { ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { imageFileFilter } from 'src/common/helpers/file.helpers';
import { FileGeneralService } from './file-general.service';
import { FILE_IMAGE_SIZE } from 'src/common/constants';
@Controller('file')
export class FileGeneralController {
  constructor(
    private readonly fileGeneralService: FileGeneralService,
    private readonly exceptionService: ExceptionsService,
  ) {
    /**Empty */
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: FILE_IMAGE_SIZE,
      },
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: FILE_IMAGE_SIZE })],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const data = await this.fileGeneralService.uploadProductFile(file, id);
      return data;
    } catch (error) {
      throw this.exceptionService.internalServerErrorException({
        message: error?.message ? error?.message : 'Internal server error',
      });
    }
  }

  @Delete(':id')
  async removeFile(@Param('id', ParseIntPipe) id: number) {
    return await this.fileGeneralService.deleteFile(id);
  }

  @Get('signed-url/:id')
  async getSignedUrl(@Param('id') id: string) {
    return await this.fileGeneralService.generatePresignedUrl(
      process.env.BUCKET_NAME,
      'picture-2024-02-25T09-12-48.141Za1644825-1b7d-409c-b4ae-a7edf4bca914.png',
      process.env.PICTURE_EXPIRE_TIME,
    );
  }
}
