import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import config = require('config');
import jwt = require('jsonwebtoken');
import { AuthServiceInterface } from './interface/auth-service.interface';
import { School, SchoolDocument } from '../schemas/School.schema';
import { User, UserDocument } from '../schemas/User.schema';
import { AuthReqDto } from './dto/auth-req.dto';
import { AuthResDto } from './dto/auth-res.dto';
import { Role } from '../middleware/role.enum';
import { PasswordMiddleware } from '../middleware/password.middleware';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly passwordMiddleware: PasswordMiddleware,
  ) {}
  private static generateToken(userId: string, role: Role): string {
    return jwt.sign({ userId, role }, config.get('jwtSecret'), {
      expiresIn: '1h',
    });
  }
  async register({ userName, password }: AuthReqDto): Promise<AuthResDto> {
    const candidate: UserDocument = await this.userModel.findOne({ userName });
    if (candidate) {
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword: string = await this.passwordMiddleware.generateHashedPassword(
      password,
    );
    const school: SchoolDocument = new this.schoolModel();
    await school.save();
    const user: UserDocument = new this.userModel({
      school,
      userName,
      password: hashedPassword,
      role: Role.Admin,
    });
    await user.save();
    const token: string = AuthService.generateToken(user.id, user.role);
    return { token };
  }
  async login({ userName, password }: AuthReqDto): Promise<AuthResDto> {
    const user: UserDocument = await this.userModel.findOne({ userName });
    if (!user) {
      throw new HttpException(
        'Некорректные данные при входе в систему',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch: boolean = await this.passwordMiddleware.compare(
      password,
      user.password,
    );
    if (!isMatch) {
      throw new HttpException(
        'Некорректные данные при входе в систему',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token: string = AuthService.generateToken(user.id, user.role);
    return { token };
  }
}
