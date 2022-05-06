import { AccountSubscription } from "./subscription";
import { Wallet } from "./wallet";
import { v4 as uuid } from 'uuid';


export class User {
  private _id: string;
  private _picture: string;
  private _fullname: string;
  private _email: string;
  private _createdAt: Date;
  private _wallet: Wallet;
  private _subscription: AccountSubscription;
  private _subscriptionHistory: []
  private _region: string;
  private _favorites: [];
  private _notificationToken: string;
  private _thirtyPartToken: string;

   constructor({
      id = uuid(),
      picture = "", 
      fullname, 
      email, 
      subscription, 
      subscriptionHistory = [], 
      region = "", 
      favorites = [],
      notificationToken = "",
      thirtyPartToken = ""
    }: UserProps ) {
      
    this._id = id; 
    this._picture = picture;
    this._fullname = fullname
    this._email = email;
    this._createdAt = new Date();
    this._wallet = null;
    this._subscription = subscription;
    this._favorites = favorites;
    this._region = region;
    this._subscriptionHistory = subscriptionHistory;
    this._thirtyPartToken = thirtyPartToken;
    this._notificationToken = notificationToken;
  }

  toJson() {
    return {
      id: this._id,
      picture: this._picture,
      fullname: this._fullname,
      email: this._email,
      createdAt: this._createdAt,
      wallet: this._wallet,
      subscription: this._subscription,
      subscriptionHistory: this._subscriptionHistory,
      region: this._region,
      favorites: this._favorites
    };
  }

  public static fromJson(record: Record<string,any>): User {
    return new User({
      id: record.id,
      picture: record.picture,
      fullname: record.fullname,
      email: record.email,
      wallet: record.wallet,
      subscription: record.subscription,
      subscriptionHistory: record.subscriptionHistory,
      region: record.region,
      favorites: record.favorites
    })
  }

  public get id() {
    return this._id;
  }
  public copyWith({...props}:UserProps): User {
    return new User({
      id: props.id ?? this._id,
      picture: props.picture ?? this._picture,
      fullname: props.fullname ?? this._fullname,
      email: props.email ?? this._email,
      wallet: props.wallet ?? this._wallet,
      subscription: props.subscription ?? this._subscription,
      favorites: props.favorites ?? this._favorites,
      region: props.region ?? this._region,
      subscriptionHistory: props.subscriptionHistory ?? this._subscriptionHistory,
      thirtyPartToken: props.thirtyPartToken ?? this._thirtyPartToken,
      notificationToken: props.notificationToken ?? this._notificationToken
    })
  }
}




interface UserProps {
  id?: string
  picture?: string;
  fullname?: string;
  email?: string;
  wallet?: Wallet;
  subscription?: AccountSubscription;
  subscriptionHistory?: []
  region?: string;
  favorites?: [],
  notificationToken?: string,
  thirtyPartToken?: string
}