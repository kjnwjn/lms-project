import { Controller } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {
    /**Empty */
  }

  // @UseGuards(GoogleOAuthGuard)
  // @Get('auth/login')
  // async login(@Request() req) {
  //   return 'Logged in';
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async test(@Request() req: any) {
  //   return await this.authService.login(req);
  // }

  // @Get('auth/google-redirect')
  // @UseGuards(GoogleOAuthGuard)
  // googleAuthRedirect(@Request() req) {
  //   return this.authService.googleLogin(req);
  // }
}
