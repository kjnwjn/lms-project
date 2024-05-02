import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FilePipeValidator implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _metadata: ArgumentMetadata) {
    if (value.size > 1000) {
      throw new BadRequestException('Validation failed (expected size is less than 1000)');
    }
    return true;
  }
}
