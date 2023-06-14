import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      scope: ['email'],
      profileFields: ['id', 'displayName', 'photos', 'email', 'name'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, photos, emails } = profile;
    const user = {
      first_name: name.givenName,
      last_name: name.familyName,
      email: emails[0].value,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
