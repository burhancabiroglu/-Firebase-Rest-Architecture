import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { app, credential, ServiceAccount } from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import * as admin from 'firebase-admin';
import { FirebaseStrategy } from './firebase.strategy';
import { ConfigService } from '@nestjs/config';

export const $FirebaseApp = Symbol('FirebaseApp');

@Module({
  exports: [FirebaseModule, FirebaseService, FirebaseStrategy],
  providers: [
    FirebaseStrategy,
    FirebaseService,
    {
      provide: $FirebaseApp,
      inject: [FirebaseModule],
      useFactory: (module: FirebaseModule) => module.firebaseApp,
    },
  ],
})
export class FirebaseModule {
  private _firebaseApp: app.App;

  constructor(private configService: ConfigService) {  

    const firebaseConfig = {
      apiKey: configService.get('apiKey'),
      authDomain: configService.get('authDomain'),
      databaseURL: configService.get('databaseURL'),
      projectId: configService.get('projectId'),
      storageBucket: configService.get('storageBucket'),
      messagingSenderId: configService.get('messagingSenderId'),
      appId: configService.get('appId'),
      measurementId: configService.get('measurementId')
    };

    initializeApp(firebaseConfig);
    
    const serviceAccount: ServiceAccount = {
      clientEmail: configService.get('client_email'),
      privateKey: configService.get('private_key'),
      projectId: configService.get('project_id'),
    };
    
    this._firebaseApp = admin.initializeApp({
        credential: credential.cert(serviceAccount),
        databaseURL: configService.get('databaseURL')},
      configService.get('APP_NAME')
    );
    
  }

  get firebaseApp(): app.App {
    return this._firebaseApp;
  }
}
