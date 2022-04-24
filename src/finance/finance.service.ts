import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CurrenciesConfigService } from 'src/config/currencies-config.service';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class FinanceService {
  constructor(private currenciesConfig: CurrenciesConfigService) {}
  public async getFiatCurrencies({base = "TRY"}: {base?: string}) {
    const list = await this.currenciesConfig.fiats;
    return yahooFinance.quote(list.map((e,i) => `${e.code}${base}=X`))
  }
}
