import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as firebaseKey from 'firebase-key.json';
@Module({
  imports: [FirebaseModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
