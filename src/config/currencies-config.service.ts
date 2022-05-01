import { HttpService } from "@nestjs/axios";
import { forwardRef, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class CurrenciesConfigService {

  private _fiatCurrencies: Promise<Record<string,Object>[]>;
  private _crptoCurrencies: Promise<Record<string,Object>[]>;


  constructor(@Inject(forwardRef(() => HttpService)) private httpService: HttpService,private configService: ConfigService) {
    const response = this.httpService.get(this.configService.get<string>('databaseURL') + "/fiatCurrencies.json", { headers: {"Accept": "application/json" }});    
    this._fiatCurrencies  = new Promise((resolve,reject) => {
      response.forEach((e)=> {
        resolve(e.data)
      });
    })

    const response2 = this.httpService.get(this.configService.get<string>('databaseURL') + "/cryptoCurrencies.json", { headers: {"Accept": "application/json" }});    
    this._crptoCurrencies  = new Promise((resolve,reject) => {
      response2.forEach((e)=> {
        resolve(e.data)
      });
    })
  }

  get fiats() {
    return this._fiatCurrencies;
  }

  get cryptoList() {
    return this._crptoCurrencies;
  }

  
  

}
