import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Get('quotes')
  public getCryptoCurrencies() {
    return this.cryptoService.getCryptoCurrencies();
  }

  @Get('quote-summary')
  public quoteSummary(@Query('base') base: string) {
    return this.cryptoService.quoteSummary({base: base.toUpperCase()})
  }

  @Get('quote-historical')
  public quoteHistory(
    @Query('base') base: string,
    @Query('period') _period: number | string,
    @Query('interval') interval: "1d" | "1wk" | "1mo" ) {
    
    const period = Number.parseInt(_period.toString())
    return this.cryptoService.historicalPrice({
      base: base.toUpperCase(),
      period: period,
      interval: interval
    })
  }
}
