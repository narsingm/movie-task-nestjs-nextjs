import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from 'src/guards/jwt-auth.guard';

@ApiBearerAuth('Authorization')
@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @Res() res) {
    return this.authService.createUser(createUserDto, res);
  }

  @Post('login')
  login(@Body() loginData: loginDto, @Res() res) {
    return this.authService.login(loginData, res);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getUserById(@Req() request) {
    return this.authService.getUserById(request.user.result.id);
  }
}
