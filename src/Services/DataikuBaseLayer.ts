import { BaseLayer } from './BaseLayer';
import sessionstorage from 'sessionstorage';
import { EnumToken } from '../Enum/EnumToken';

export class DataikuBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string) {
        return this.environmentConfig.Dataiku.Urls.BaseUrl + url;
    }

    //retrieve new Token for Dataiku
    protected authorizeDataiku() {
        sessionstorage.setItem(EnumToken.DataikuToken, this.environmentConfig.Dataiku.Secret)
        return true;
    }

    protected dataikuHeader() {
        return {
            user: '6SBXJWiJWg7BUAiKcgodLwXEczrIL3pf',
            password: ''
        }
    }

}