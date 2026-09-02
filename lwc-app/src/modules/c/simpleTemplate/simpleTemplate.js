import { LightningElement, api, track } from 'lwc';

export default class SimpleTemplate extends LightningElement {
    @api 
    get content() {
        return this._content;
    }
    set content(value) {
        if (typeof value === 'string') {
            try {
                this._content = JSON.parse(value);
            } catch {
                this._content = {};
            }
        } else {
            this._content = value || {};
        }
    }
    
    @track _content = {};

    get text() {
        return this._content?.text || '';
    }

    get hasText() {
        return !!this.text;
    }
}
