import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { query, Response } from 'express';
import { FinanceService } from './finance.service';

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
      base: base,
      to: to
    })
  }
}
