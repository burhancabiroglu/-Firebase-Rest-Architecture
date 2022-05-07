import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CurrenciesConfigService } from 'src/config/currencies-config.service';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class CryptoService {
  constructor(private httpService: HttpService,private currenciesConfig: CurrenciesConfigService) {}

  public async getCryptoCurrencies() {
    const list = await this.currenciesConfig.cryptoList;
    return yahooFinance.quote(list.map((e,_)=>`${ e.code}`))
  }

  public async getCryptoFlag(base: string) {    
    let data = null;
    await this.httpService.get('https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', {responseType: 'arraybuffer'}).forEach((e) => {
      return data = e.data;
    });    
    return data;
  }

  public quoteSummary({base = ""}: {base?: string}) {
    return yahooFinance.quoteSummary(`${base}-USD`);
  }
  

  public historicalPrice({base = "",period = 6, interval = "1wk"}: {base?: string, period: number, interval: "1d" | "1wk" | "1mo"}) {
    const today = new Date();
    const endday = new Date(today.getFullYear(),today.getMonth() - period,today.getDate());
    
    return yahooFinance.historical(`${base}-USD`,{
      period1: endday,
      period2: today,
      interval: interval,
      includeAdjustedClose: true
    });
  }

}
