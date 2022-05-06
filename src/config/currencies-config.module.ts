import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CurrenciesConfigService } from './currencies-config.service';


@Module({
  imports: [ ConfigModule, HttpModule, FirebaseModule ],
  providers: [CurrenciesConfigService ],
  exports: [CurrenciesConfigService,ConfigModule]
})
export class CurrenciesConfig {}
