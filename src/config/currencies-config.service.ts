import { HttpService } from "@nestjs/axios";
import { forwardRef, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FirebaseService } from "src/firebase/firebase.service";

export class CurrenciesConfigService {

  private _fiatCurrencies: Promise<Record<string,Object>[]>;
  private _crptoCurrencies: Promise<Record<string,Object>[]>;


  constructor(private firebaseService: FirebaseService,@Inject(forwardRef(() => HttpService)) private httpService: HttpService,private configService: ConfigService) {
    setTimeout(() => {
      this.lateInit()
    }, 3000);
  }

  get fiats() {
    return this._fiatCurrencies;
  }

  get cryptoList() {
    return this._crptoCurrencies;
  }


  public async lateInit() {
    this.firebaseService.db.ref('fiatCurrencies').on('value',(snapshot) => {
      this._fiatCurrencies  = new Promise((resolve,reject) => {
        resolve(snapshot.val())
      })      
    }) 
    this.firebaseService.db.ref('crytoCurrencies').on('value',(snapshot) => {
      this._crptoCurrencies  = new Promise((resolve,reject) => {
        resolve(snapshot.val())
      })      
    }) 
  }
  
  
  

}
