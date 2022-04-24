import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesConfig } from 'src/config/currencies-config.module';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [CurrenciesConfig],
  controllers: [FinanceController],
  providers: [FinanceService]
})
export class FinanceModule {}
