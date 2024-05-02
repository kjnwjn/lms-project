import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { UserType } from 'src/common/enums/userType.enum';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { BaseService } from '../../common/base/service/base.service';
import { FileGeneralService } from '../file-general/file-general.service';
import { SignupUserDto, UpdateUserDto } from './dto/user.dto';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserPresenter } from './presenter/user.presenter';
import { RoleRepository } from './repository/role.repository';
import { UserRepository } from './repository/user.repository';
import { MailService } from '../mail/mail.service';
import { UserInfo } from '@/common/decorators/user.decorator';
import { getPublicFileUrl } from '@/common/helpers';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    protected readonly repository: UserRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly logger: XloggerService,
    private readonly fileGeneralService: FileGeneralService,
    private readonly mailService: MailService,
  ) {
    super(repository);
  }

  /**
   * Function to convert to User Entity
   */
  async toUserEntity(userDto: SignupUserDto): Promise<User> {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.password = userDto.password;
    user.lastName = userDto.lastName;
    user.phone = userDto.phone;
    user.address = userDto.address;
    user.picture = userDto.picture;
    return user;
  }

  /**
   * User signing up service
   */
  async signup(body: SignupUserDto, role: Role) {
    try {
      this.logger.log('CREATE new user information: [' + JSON.stringify(body) + ']');
      const isUserExist = await this.repository.findOneBy({ email: body.email });
      if (isUserExist)
        throw this.exceptionService.badRequestException({
          message: `Email ${body.email} already exist`,
        });
      const user = await this.toUserEntity(body);
      user.roles = [role];
      if (role.role_name === UserType.ADMIN) {
        user.active = true;
      }
      if (role.role_name === UserType.ADMIN) {
        user.isSuperUser = true;
      }
      await this.repository.saveData(user);
      return 'Create account successfully!';
    } catch (error) {
      this.logger.error('CREATE new user error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * User updating profile service
   */
  async updateProfile(body: UpdateUserDto, user: UserInfo): Promise<UserPresenter> {
    try {
      this.logger.log('UPDATE ONE information: [' + JSON.stringify(body) + ']');
      const userToUpdate: User = await this.repository.findOne({ email: user.email });
      const updated = await this.repository.updateOne(
        { email: user.email },
        {
          firstName: body?.firstName ?? userToUpdate.firstName,
          lastName: body?.lastName ?? userToUpdate.lastName,
          phone: body?.phone ?? userToUpdate.phone,
          address: body?.address ?? userToUpdate.address,
          password: body?.password ? bcrypt.hashSync(body.password, 10) : userToUpdate.password,
        },
      );
      return new UserPresenter(updated);
    } catch (error) {
      this.logger.error('UPDATE ONE error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * Finding all user with filter service
   */
  async findAllWithFilter(role: string, filter: string): Promise<UserPresenter[]> {
    this.logger.log('FILTERED FINDING information: [' + JSON.stringify(filter) + ']');
    try {
      if (!Object.values(UserType).find((item: string) => item === role.toUpperCase()))
        throw this.exceptionService.notFoundException({ message: 'Role not found' });
      return (
        await this.repository.findAll({
          roles: { role_name: role.toUpperCase() },
          ...(filter ? JSON.parse(filter) : {}),
        })
      ).map((user: any) => new UserPresenter(user));
    } catch (error) {
      this.logger.error('GET ALL by filter error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * Lecturer activating service
   */
  async lecturerActivating(email: string): Promise<UserPresenter> {
    this.logger.log('LECTURER ACTIVATING information: [' + JSON.stringify(email) + ']');
    try {
      const userExist: User = await this.repository.findOne({ email: email });
      if (!userExist)
        throw this.exceptionService.badRequestException({
          message: `Email ${email} does not exist`,
        });
      if (!userExist.active) {
        await this.mailService.sendToMail(
          userExist.email,
          'LECTURE ACCOUNT HAS BEEN ACTIVATED',
          `${userExist.firstName} ${userExist.lastName}`,
          userExist.email,
          userExist.phone,
          new Date().toUTCString(),
          'Your lecture account has been activated. Now you can login in as Lecturer',
        );
      }
      const updated = await this.repository.updateOne({ email: email }, { active: true });
      return new UserPresenter(updated);
    } catch (error) {
      this.logger.error('LECTURER ACTIVATING error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * Admin updating profiles service
   */
  async adminUpdateProfiles(email: string, body: UpdateUserDto): Promise<UserPresenter> {
    try {
      this.logger.log('ADMIN UPDATE ONE information: [' + JSON.stringify(body) + ']');
      const userToUpdate: User = await this.repository.findOne({ email });
      if (!userToUpdate)
        throw this.exceptionService.badRequestException({
          message: `Email ${email} does not exist`,
        });
      const updated = await this.repository.updateOne(
        { email: email },
        {
          ...body,
          password: body?.password ? bcrypt.hashSync(body.password, 10) : userToUpdate.password,
        },
      );
      return new UserPresenter(updated);
    } catch (error) {
      this.logger.error('ADMIN UPDATE ONE error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * Admin removing a user permanently
   */
  async removeUserPermanently(email: string) {
    try {
      this.logger.log('ADMIN REMOVE information: [' + JSON.stringify(email) + ']');
      const userExist: User = await this.repository.findOne({ email });
      if (!userExist)
        throw this.exceptionService.notFoundException({ message: 'Email does not exist' });

      const isDeleted = await this.repository.delete(userExist.id);
      if (!isDeleted.affected)
        throw this.exceptionService.internalServerErrorException({
          message: 'Internal error service',
        });
      return new UserPresenter(userExist);
    } catch (error) {
      this.logger.log('ADMIN REMOVE information: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.notFoundException({ message: 'Bad Request' });
    }
  }

  /**
   * Get one profile of any user
   */
  async findOne(email: string): Promise<UserPresenter> {
    try {
      this.logger.log('FIND ONE information: [' + JSON.stringify(email) + ']');
      const userExist: User = await this.repository.findOne({ email });
      if (!userExist)
        throw this.exceptionService.notFoundException({ message: 'Account does not exist!' });
      return new UserPresenter(userExist);
    } catch (error) {
      this.logger.log('GET ONE account error: [' + JSON.stringify(error.message) + ']');
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * UPload picture
   */
  async uploadAvatar(file: Express.Multer.File, user: UserInfo): Promise<string> {
    try {
      this.logger.log('UPDATE AVATAR information: [' + JSON.stringify(file.fieldname) + ']');
      const pictureName = await this.fileGeneralService.uploadPublicFile(
        file,
        process.env.BUCKET_PUBLIC_NAME,
      );
      const pictureUrl = getPublicFileUrl(process.env.BUCKET_PUBLIC_NAME, pictureName);
      await this.repository.updateOne(
        { id: user.id },
        { picture: pictureUrl, updatedBy: Number(user.id) },
      );
      return pictureUrl;
    } catch (error) {
      this.logger.error('UPDATE AVATAR error: [' + JSON.stringify(error.message) + ']');
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
}
