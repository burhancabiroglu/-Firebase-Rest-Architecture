import { Module, UseGuards } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { FinanceModule } from './finance/finance.module';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesConfig } from 'src/config/currencies-config.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyStrategy } from './app/apikey.strategy';

@Module({
  imports: [
    CurrenciesConfig,
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule, 
    FirebaseModule,
    FinanceModule,
    CryptoModule
  ],
  controllers: [],
  providers: [ApiKeyStrategy],
})
export class AppModule {}
