import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { query, Response } from 'express';
import { ApiKeyGuard } from 'src/app/apikey.guard';

@UseGuards(ApiKeyGuard)
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

  @Get('flag')
  public async cryptoFlag(@Query('base') base: string, @Res() res: Response) {
    res.setHeader("Content-Type", "image/png");
    const result = await this.cryptoService.getCryptoFlag(base + '-USD');
    return res.send(Buffer.from(result))
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
