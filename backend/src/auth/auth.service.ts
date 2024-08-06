import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import globalMsg from 'src/common/globalMsg';
import { handleSequelizeError } from 'src/helpers/commonPagination';
import { loginDto } from './dto/login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Controller function to handle user registration.
   * @param req Request object containing user registration data
   * @param res Response object to send back HTTP responses
   */
  async createUser(user, @Res() res: Response) {
    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new ConflictException(globalMsg.EMAIL_ALREADY_EXISTS);
      }

      // Hash the user's password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      let createdUser = null;
      // Create a new user if no existing user found
      const newUser = await User.create({
        ...user,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });
      createdUser = newUser;
      // Prepare response data
      const updateData = { ...createdUser.toJSON() };
      const token = sign(
        { userId: updateData.id, email: updateData.email },
        this.configService.get<string>('JWTKEY'),
        { expiresIn: '365d' },
      );

      const cookieExpirationDate = new Date();
      cookieExpirationDate.setDate(cookieExpirationDate.getDate() + 365);

      res.cookie('token', token, {
        expires: cookieExpirationDate,
        domain: this.configService.get<string>('FRONTEND_DOMAIN'),
      });
      delete updateData.password;

      return res.status(HttpStatus.OK).json({
        message: globalMsg.REGISTERED_SUCCESSFULLY,
        user: updateData,
      });
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  /**
   * Controller function to handle user login.
   * @param req Request object containing user login data
   * @param res Response object to send back HTTP responses
   */
  async login(data: loginDto, @Res() res: Response) {
    try {
      const { email, password } = data;
      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundException(globalMsg.USER_NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new NotFoundException(globalMsg.INVALID_CREDENTIALS);
      }

      const token = sign(
        { userId: user.id, email: user.email },
        process.env.JWTKEY,
        { expiresIn: '365d' },
      );

      const cookieExpirationDate = new Date();
      cookieExpirationDate.setDate(cookieExpirationDate.getDate() + 365);

      res.cookie('token', token, {
        expires: cookieExpirationDate,
        domain: this.configService.get<string>('FRONTEND_DOMAIN'),
      });
      const userData = { ...user.dataValues };
      delete userData.password;

      return res.status(HttpStatus.OK).json({
        message: globalMsg.LOGIN_SUCCESS_MESSAGE,
        user: userData,
      });
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  /**
   * Controller function to handle logged in user data.
   * @param req Request object containing user token
   * @param res Response object to send back HTTP responses
   */
  async getUserById(userId: number) {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(globalMsg.USER_NOT_FOUND);
      }

      const data = JSON.parse(JSON.stringify(user));

      return {
        statusCode: HttpStatus.OK,
        message: globalMsg.FETCH_DATA_SUCCESSFULLY,
        result: data,
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }

  async getUserByToken(userId: number) {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      // return {
      //   statusCode: HttpStatus.UNAUTHORIZED,
      //   message: globalMsg.errors.UNAUTHORIZED,
      //   result: null
      // };
      throw new UnauthorizedException(globalMsg.UNAUTHORIZED);
    }

    const data = JSON.parse(JSON.stringify(user));
    return {
      statusCode: HttpStatus.OK,
      message: globalMsg.FETCH_DATA_SUCCESSFULLY,
      result: data,
    };
  }

  /**
   * Controller function to handle logged in user data.
   * @param req Request object containing user token
   * @param res Response object to send back HTTP responses
   */
  async profile(data: loginDto) {
    try {
      const { email, password } = data;
      const findUser = await User.findOne({
        where: { email: email },
        attributes: { exclude: ['password'] },
      });

      if (!findUser) {
        throw new NotFoundException(globalMsg.USER_NOT_FOUND);
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException(globalMsg.USER_NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new NotFoundException(globalMsg.INVALID_CREDENTIALS);
      }

      const token = sign(
        { userId: user.id, email: user.email },
        process.env.JWTKEY,
        { expiresIn: '365d' },
      );
      const userData = { ...user.dataValues };
      delete userData.password;
      return {
        message: globalMsg.LOGIN_SUCCESS_MESSAGE,
        statusCode: HttpStatus.OK,
        user: userData,
        token,
      };
    } catch (error) {
      handleSequelizeError(error);
    }
  }
}
