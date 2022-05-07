import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query, Response } from 'express';
import { ApiKeyGuard } from 'src/app/apikey.guard';
import { FinanceService } from './finance.service';

@UseGuards(ApiKeyGuard)
@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Get('quotes')
  public getFiatCurrencies(@Query('base') query: string) {
    return this.financeService.getFiatCurrencies({base: query.toUpperCase()})
  }


  @Get('flag')
  public getCurrencyFlag(@Query("base") base: string,  @Res() res: Response) {
    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(this.financeService.getCurrencyFlag({base: base.toUpperCase()}));
  }

  @Get('quote-summary')
  public quoteSummary(@Query('base') base: string,@Query('to') to: string) {
    return this.financeService.quoteSummary({
      base: base.toUpperCase(),
      to: to.toUpperCase()
    })
  }

  @Get('quote-historical')
  public quoteHistory(
    @Query('base') base: string,
    @Query('to') to: string,
    @Query('period') _period: number | string,
    @Query('interval') interval: "1d" | "1wk" | "1mo" ) {
    
    const period = Number.parseInt(_period.toString())
    return this.financeService.historicalPrice({
      base: base.toUpperCase(),
      to: to.toUpperCase(),
      period: period,
      interval: interval
    })
  }
}


