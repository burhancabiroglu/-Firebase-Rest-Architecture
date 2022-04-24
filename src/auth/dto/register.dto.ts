import { AccountSubscription } from "src/model/subscription";

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  subscription: 'FREE' | 'PREMIUM'
}
