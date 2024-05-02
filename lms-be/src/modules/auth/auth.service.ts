import { UserInfo } from '@/common/decorators/user.decorator';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { SignInDto } from '../auth/dto/sign-in.dto';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loggerService: XloggerService,
    protected readonly userRepository: UserRepository,
  ) {
    /**Empty */
  }

  async validateUser(body: SignInDto): Promise<any> {
    try {
      this.loggerService.log('Validate user: ' + JSON.stringify(body));
      const userExist = await this.userRepository.findOne({ email: body.email });
      if (!userExist) return null;
      const validPassword = await bcrypt.compare(body.password, userExist.password);
      if (!validPassword) return null;
      return {
        id: userExist.id,
        email: userExist.email,
        roles: userExist.roles,
        is_supper_user: userExist.isSuperUser,
        active: userExist.active,
        picture: userExist.picture,
      };
    } catch (err) {
      this.loggerService.error('Error in validateUser: ' + err);
      return null;
    }
  }

  async generateAccessToken(user: UserInfo) {
    try {
      return {
        access_token: await this.jwtService.signAsync(user),
      };
    } catch (error) {
      this.loggerService.error('Error in generateAccessToken: ' + error);
      return null;
    }
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
