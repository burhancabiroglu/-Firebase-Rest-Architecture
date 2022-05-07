import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyStrategy } from 'src/app/apikey.strategy';
import { CurrenciesConfig } from 'src/config/currencies-config.module';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [CurrenciesConfig, ApiKeyStrategy],
  controllers: [FinanceController],
  providers: [FinanceService, ApiKeyStrategy]
})
export class FinanceModule {}
