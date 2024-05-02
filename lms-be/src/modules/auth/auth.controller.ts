import { User, UserInfo } from '@/common/decorators/user.decorator';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    /**Empty */
  }

  /**
   * Controller for auth logging in
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async authLogin(@User() user: UserInfo) {
    return await this.authService.generateAccessToken(user);
  }
}
