import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CurrenciesConfigService } from 'src/config/currencies-config.service';
import yahooFinance from 'yahoo-finance2';
import * as flags from 'country-flag-icons/string/3x2'


@Injectable()
export class FinanceService {
  constructor(private currenciesConfig: CurrenciesConfigService) {}

  public async getFiatCurrencies({base = "TRY"}: {base?: string}) {
    const list = await this.currenciesConfig.fiats;
    return yahooFinance.quote(list.map((e,i) => `${e.code}${base}=X`))
  }

  public getCurrencyFlag({base = "TRY"}: {base?: string}): String {
    return flags[base.substring(0,2)]
  }

  public quoteSummary({base = "TRY", to = ""}: {base?: string, to?:string}) {
    return yahooFinance.quoteSummary(`${to}${base}=X`);
  }
  

  public historicalPrice({base = "TRY", to = "",period = 6, interval = "1wk"}: {base?: string, to?:string, period: number, interval: "1d" | "1wk" | "1mo"}) {
    const today = new Date();
    const endday = new Date(today.getFullYear(),today.getMonth() - period,today.getDate());
    
    return yahooFinance.historical(`${to}${base}=X`,{
      period1: endday,
      period2: today,
      interval: interval,
      includeAdjustedClose: true
    });
  }
}
