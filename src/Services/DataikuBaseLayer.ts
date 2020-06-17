import { BaseLayer } from './BaseLayer';
import sessionstorage from 'sessionstorage';
import { EnumToken } from '../Enum/EnumToken';

export class DataikuBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string): string {
        return this.environmentConfig.Dataiku.Urls.BaseUrl + url;
    }

    //retrieve new Token for Dataiku
    protected authorizeDataiku(): boolean {
        sessionstorage.setItem(EnumToken.DataikuToken, this.environmentConfig.Dataiku.Secret)
        return true;
    }

    protected dataikuHeader(): { user: string, password: string } {
        return {
            user: '6SBXJWiJWg7BUAiKcgodLwXEczrIL3pf',
            password: ''
        }
    }

}