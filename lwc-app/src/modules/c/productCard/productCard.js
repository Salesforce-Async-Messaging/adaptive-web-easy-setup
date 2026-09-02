import { LightningElement, api } from 'lwc';

export default class ProductCard extends LightningElement {
    @api product = {};

    get hasRating() {
        return this.product && this.product.rating;
    }

    get productImage() {
        return this.product?.image || '';
    }

    get productName() {
        return this.product?.name || '';
    }

    get productPrice() {
        return this.product?.price || '';
    }

    get productRating() {
        return this.product?.rating || 0;
    }
}
