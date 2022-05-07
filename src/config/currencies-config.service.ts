import { HttpService } from "@nestjs/axios";
import { forwardRef, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FirebaseService } from "src/firebase/firebase.service";

export class CurrenciesConfigService {

  private _fiatCurrencies: Promise<Record<string,Object>[]>;
  private _crptoCurrencies: Promise<Record<string,Object>[]>;


  constructor(private firebaseService: FirebaseService,@Inject(forwardRef(() => HttpService)) private httpService: HttpService,private configService: ConfigService) {
    this._fiatCurrencies  = new Promise((resolve,reject) => {
      if(firebaseService?.db?.ref == null) {
        setTimeout(() => {
          this.firebaseService.db.ref('fiatCurrencies').on('value',(snapshot) => {
            resolve(snapshot.val());
          }) 
        }, 1500);
      }
    })   
    this._crptoCurrencies  = new Promise((resolve,reject) => {
      if(firebaseService?.db?.ref == null) {
        setTimeout(() => {
          this.firebaseService.db.ref('cryptoCurrencies').on('value',(snapshot) => {
            resolve(snapshot.val());
          }) 
        }, 1500);
      }
    })
  }

  get fiats() {
    return this._fiatCurrencies;
  }

  get cryptoList() {
    return this._crptoCurrencies;
  }  
}
