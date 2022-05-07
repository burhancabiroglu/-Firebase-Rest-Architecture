import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { $FirebaseApp } from './firebase.module';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { LoginDto } from 'src/auth/dto/login.dto';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { User } from 'src/model/user';

@Injectable()
export class FirebaseService {
  private auth: admin.auth.Auth;
  private firestore: admin.firestore.Firestore;
  private database: admin.database.Database;
  constructor(@Inject(forwardRef(() => $FirebaseApp)) private _app: app.App) {
    this.auth = _app.auth();
    this.firestore = _app.firestore();
    this.database = _app.database();
  }

  public async registerWithEmail(registerDto: RegisterDto): Promise<UserRecord> {
    const result = await this.auth.createUser({
      email: registerDto.email,
      emailVerified: false,
      password: registerDto.password,
      displayName: registerDto.username,
      disabled: false,
    });
    return result;
  }
  
  public async storageUserDto(user: User) {
    return this.firestore.collection('users').doc(user.id).create(user.toJson())
  }

  public loginWithEmailAndPassword(loginDto: LoginDto) {
    return signInWithEmailAndPassword(
      getAuth(),
      loginDto.email,
      loginDto.password,
    );
  }

  public async getProfileWithToken(idToken: string) {
    let userSnapshot = null;
    try {
      userSnapshot = await this.auth.verifyIdToken(idToken);    
    }
    catch(e) {
      throw new HttpException(e,400);
    }
    return User.fromJson((await this.firestore.collection('users').doc(userSnapshot?.uid).get()).data()).toJson();
  }

  public get db() {
    return this.database;
  }
}
