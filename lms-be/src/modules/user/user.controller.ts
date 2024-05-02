import { Roles } from '@/common/decorators/role.decorator';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { AuthorGuard } from '@/common/guards/author.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { SignupUserDto, UpdateUserDto } from './dto/user.dto';
import { Role } from './entities/role.entity';
import { UserPresenter } from './presenter/user.presenter';
import { RoleRepository } from './repository/role.repository';
import { UserService } from './user.service';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@/common/helpers/file.helpers';
import { FILE_IMAGE_SIZE } from '@/common/constants';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly exceptionService: ExceptionsService,
    private readonly roleRepository: RoleRepository,
  ) {
    /**Empty */
  }

  /**
   * Controller for user sign up new account as STUDENT
   */
  @Post('students/signup')
  async studentsSignup(@Body() body: SignupUserDto) {
    const role: Role = await this.roleRepository.findOne({ role_name: UserType.STUDENT });
    if (!role) throw this.exceptionService.notFoundException({ message: 'Role not found' });
    return await this.userService.signup(body, role);
  }

  /**
   * Controller for user sign up new account as LECTURER
   */
  @Post('lecturers/signup')
  async lecturerSignup(@Body() body: SignupUserDto) {
    const role: Role = await this.roleRepository.findOne({ role_name: UserType.LECTURER });
    if (!role) throw this.exceptionService.notFoundException({ message: 'Role not found' });
    return await this.userService.signup(body, role);
  }

  /**
   * Controller for admin activating new LECTURER account
   */
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Patch('lecturers/activating/:email')
  async lecturerActivating(@Param('email') email: string) {
    return await this.userService.lecturerActivating(email);
  }

  /**
   * Controller for admin finding all user account with filter
   */
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Get('get-all-records')
  async adminFindAll(@Query() query: { role: string; filter: string }): Promise<UserPresenter[]> {
    return await this.userService.findAllWithFilter(
      query.role ?? UserType.STUDENT.toString(),
      query.filter,
    );
  }

  /**
   * Controller for user updating their profile
   */
  @UseGuards(AuthenGuard)
  @Patch('update-profile')
  async userUpdateProfile(
    @Body() body: UpdateUserDto,
    @User() user: UserInfo,
  ): Promise<UserPresenter> {
    return await this.userService.updateProfile(body, user);
  }

  /**
   * Controller for admin updating any user profile
   */
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Patch('update-profiles/:email')
  async adminUpdateProfiles(@Param('email') email: string, @Body() body: UpdateUserDto) {
    return await this.userService.adminUpdateProfiles(email, body);
  }

  /**
   * Controller for admin creating new user as any role
   */
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Post('new')
  async adminCreateAccount(@Query() query: { role: string }, @Body() body: SignupUserDto) {
    if (!query?.role)
      throw this.exceptionService.badRequestException({ message: 'Role query is required!' });
    if (!Object.values(UserType).find((item: string) => item === query.role.toUpperCase()))
      throw this.exceptionService.badRequestException({ message: 'Invalid role!' });
    const role: Role = await this.roleRepository.findOne({ role_name: query.role.toUpperCase() });
    return await this.userService.signup(body, role);
  }

  /**
   * Controller for admin deleting a user permanently
   */
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Delete(':email/remove')
  async adminRemoveUserPermanently(@Param('email') email: string) {
    return await this.userService.removeUserPermanently(email);
  }

  /**
   * Controller for getting one profile of any user
   */
  @UseGuards(AuthenGuard)
  @Get(':email')
  async getOneAccount(@Param('email') email: string) {
    return await this.userService.findOne(email);
  }

  /**
   * Controller for upload user avatar for any role
   */
  @UseInterceptors(
    FileInterceptor('picture', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: FILE_IMAGE_SIZE,
      },
    }),
  )
  @UseGuards(AuthenGuard)
  @Patch('picture/upload-avatar')
  async uploadAvatar(
    @User() user: UserInfo,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: FILE_IMAGE_SIZE })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<string> {
    return await this.userService.uploadAvatar(file, user);
  }
}
