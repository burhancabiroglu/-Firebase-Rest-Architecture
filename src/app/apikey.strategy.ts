import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(private configService: ConfigService) {
        super({ header: 'X-API-KEY', prefix: '' },
        true,
        async (apiKey:any, done:any) => {
            return this.validate(apiKey, done);
        });        
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if (this.configService.get('API_KEY') === apiKey) {  
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}