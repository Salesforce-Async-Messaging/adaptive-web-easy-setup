import { LightningElement, api, track } from 'lwc';

export default class RecsTemplate extends LightningElement {
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        if (typeof value === 'string') {
            try {
                this._items = JSON.parse(value);
            } catch {
                this._items = [];
            }
        } else {
            this._items = value || [];
        }
    }

    @track _items = [];

    get displayItems() {
        return this._items.map((item, index) => ({
            ...item,
            id: item.personalizationContentId || `item-${index}`,
            name: item.ssot__Name__c || '',
            sku: item.ssot__ProductSKU__c || '',
            price: item.ssot__MSRPAmount__c || '',
            currency: item.ssot__MSRPAmountCurrency__c || '',
            image: item.Image_URL__c || '',
            hasImage: !!item.Image_URL__c,
            hasSku: !!item.ssot__ProductSKU__c,
            hasPrice: !!item.ssot__MSRPAmount__c,
            formattedPrice: item.ssot__MSRPAmount__c
                ? `${item.ssot__MSRPAmount__c}${item.ssot__MSRPAmountCurrency__c ? ` ${item.ssot__MSRPAmountCurrency__c}` : ''}`
                : ''
        }));
    }

    get hasItems() {
        return this.displayItems.length > 0;
    }
}
