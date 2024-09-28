import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserServiceErrorMessages } from 'src/lib/constants/errors';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

const BCRYPT_SALT = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const isExistUser = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });

    if (isExistUser)
      throw new BadRequestException(UserServiceErrorMessages.isExist);

    const user: User = new User();
    user.username = createUserDto.username;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      BCRYPT_SALT,
    );

    user.password = hashedPassword;

    const result = await this.userRepository.save(user);

    return {
      id: result.id,
      username: result.username,
      success: true,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOneBy({
      username,
    });

    if (!user) throw new BadRequestException(UserServiceErrorMessages.notFound);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      throw new BadRequestException(UserServiceErrorMessages.missingInfo);

    const jwtPayload = {
      id: user.id,
      username: user.username,
    };

    return {
      accessToken: await this.jwtService.signAsync(jwtPayload),
    };
  }

  async getUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({
      id,
      isActive: true,
      isDeleted: false,
    });

    if (!user) throw new BadRequestException(UserServiceErrorMessages.notFound);

    return {
      id: user.id,
      username: user.username,
      success: true,
    };
  }
}
