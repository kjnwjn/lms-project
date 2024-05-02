import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IException, IFormatExceptionMessage } from 'src/common/exceptions/exception.interface';

@Injectable()
export class ExceptionsService implements IException {
  notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data);
  }

  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }

  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }

  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }

  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
}
