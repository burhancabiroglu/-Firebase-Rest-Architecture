import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { PassportStrategy } from '@nestjs/passport';



@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy,'firebase-auth') {
  constructor(private _firebaseService: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
    });
  }
  
  async validate(token: string) {
    const result: any = await this._firebaseService.getProfileWithToken(token)    
    if (!result) {
      throw new UnauthorizedException();
    }    
    return result;
  }
}
