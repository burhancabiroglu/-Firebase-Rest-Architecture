import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesConfigService } from './currencies-config.service';


@Module({
  imports: [ ConfigModule, HttpModule ],
  providers: [CurrenciesConfigService ],
  exports: [CurrenciesConfigService,ConfigModule]
})
export class CurrenciesConfig {}
