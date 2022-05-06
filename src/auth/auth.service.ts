import { ConflictException, Injectable } from '@nestjs/common';
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
      throw new ConflictException('User already exist');
    });
    
  }

  public async profile(token: string) {
    return this.firebaseService.getProfileWithToken(token)
  }

  public async login(loginDto: LoginDto): Promise<string> {
    const cred = await this.firebaseService.loginWithEmailAndPassword(loginDto);
    const fwt = await cred.user.getIdToken();
    return fwt;
  }

  
}
