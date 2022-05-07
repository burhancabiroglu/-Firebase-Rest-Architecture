import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { FirebaseError } from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';
import { User } from 'src/model/user';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  public async register(registerDto: RegisterDto) {
    const today = new Date();
    const endday = new Date(today.getFullYear(),today.getMonth()+1,today.getDate());

    const user = new User({
      fullname: registerDto.username,
      email: registerDto.email,
      subscription: {
        startAt: today,
        endAt: endday,
        plan: registerDto.subscription
      }
    });
    return this.firebaseService.registerWithEmail(registerDto)
    .then((val)=> {
      return this.firebaseService.storageUserDto(user.copyWith({id:val.uid}));
    })
    .catch((e) => {
      throw new HttpException(e.message,400);
    });
    
  }

  public profile(token: string) {
    return this.firebaseService.getProfileWithToken(token).catch((e: FirebaseError)=> {
      if(e) throw new HttpException(e.message,Number.parseInt(e.code));
    })
  }

  public async login(loginDto: LoginDto): Promise<string> {
    return this.firebaseService.loginWithEmailAndPassword(loginDto).then(async (resp)=>{
      const fwt = await resp.user.getIdToken();
      return fwt;
    }).catch((e)=>{      
       throw new HttpException('Login Error',400);
    })
  }

  
}
