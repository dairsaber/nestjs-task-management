import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await this.hasPassword(password, salt);
    const user = new User();
    user.username = username;
    user.password = hashPassword;
    user.salt = salt;

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('user already exists');
      } else {
        // TODO 这边将错误暂且抛到客户端查看
        throw new InternalServerErrorException(error);
      }
    }
  }

  private hasPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
