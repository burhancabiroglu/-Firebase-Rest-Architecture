import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FWTGuard } from 'src/firebase/firebase.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  public register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  
  @UseGuards(FWTGuard)
  public profile(@Req() req: any) {
    return this.authService.profile();
  }
}
