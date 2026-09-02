import { LightningElement, api, track } from 'lwc';

export default class ProductDetailsTemplate extends LightningElement {
    @api
    get item() {
        return this._item;
    }
    set item(value) {
        if (typeof value === 'string') {
            try {
                this._item = JSON.parse(value);
            } catch {
                this._item = {};
            }
        } else {
            this._item = value || {};
        }
    }

    @track _item = {};

    get hasItem() {
        return !!this._item?.personalizationContentId;
    }

    get itemName() {
        return this._item?.ssot__Name__c || '';
    }

    get itemSku() {
        return this._item?.ssot__ProductSKU__c || '';
    }

    get hasSku() {
        return !!this._item?.ssot__ProductSKU__c;
    }

    get itemImage() {
        return this._item?.Image_URL__c || '';
    }

    get hasImage() {
        return !!this._item?.Image_URL__c;
    }

    get itemBrand() {
        return this._item?.ssot__BrandId__c || '';
    }

    get hasBrand() {
        return !!this._item?.ssot__BrandId__c;
    }

    get hasPrice() {
        return !!this._item?.ssot__MSRPAmount__c;
    }

    get formattedPrice() {
        if (!this._item?.ssot__MSRPAmount__c) return '';
        const currency = this._item.ssot__MSRPAmountCurrency__c ? ` ${this._item.ssot__MSRPAmountCurrency__c}` : '';
        return `${this._item.ssot__MSRPAmount__c}${currency}`;
    }
}
