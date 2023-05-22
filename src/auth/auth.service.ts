import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { AuthLoginDto } from './dto/auth-login.dto';

import { config } from '../config/config';

import { JwtPayload } from './jwt.strategy';
import { User } from 'src/user/entities/user.entity';

import { comparePwd } from '../utils/comparePwd';
import { filterUserData } from '../utils/filterUserData';

@Injectable()
export class AuthService {

  private createToken(currentTokenId: string): { accessToken: string, expiresIn: number } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 2;
    const accessToken = sign(payload, config.secretJwt, { expiresIn });

    return {
      accessToken,
      expiresIn
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOne({ where: { currentTokenId: token } });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOne({
        relations: ['delivery'],
        where: {
          email: req.email
        }
      });

      if (!user || !await comparePwd(req.pwdHash, user.pwdHash)) {
        return res.json({
          login: false,
          message: 'Invalid login data'
        });
      }
      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie('access_token', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({
          login: true,
          user: filterUserData(user)
        });
    } catch (err) {
      return res.json({
        login: false,
        message: err.message
      });
    }
  }

  async logout(user: User, res: Response): Promise<any> {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('access_token', {
          secure: false,
          domain: 'localhost',
          httpOnly: true
        }
      );
      return res.json({ logout: true });
    } catch (err) {
      return res.json({ logout: false, message: err.message });
    }
  }
}