export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(_data: IFormatExceptionMessage): void;
  internalServerErrorException(_data?: IFormatExceptionMessage): void;
  forbiddenException(_data?: IFormatExceptionMessage): void;
  UnauthorizedException(_data?: IFormatExceptionMessage): void;
  notFoundException(_data?: IFormatExceptionMessage): void;
}
