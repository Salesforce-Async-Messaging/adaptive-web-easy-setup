import { LightningElement, api } from 'lwc';

export default class ProductStars extends LightningElement {
    @api rating = 0;
    @api size = 'small';

    get stars() {
        const fullStars = Math.floor(this.rating);
        const hasHalfStar = this.rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        const result = [];
        
        for (let i = 0; i < fullStars; i++) {
            result.push({ id: `full-${i}`, type: 'full', isFull: true, isHalf: false });
        }
        
        if (hasHalfStar) {
            result.push({ id: 'half', type: 'half', isFull: false, isHalf: true });
        }
        
        for (let i = 0; i < emptyStars; i++) {
            result.push({ id: `empty-${i}`, type: 'empty', isFull: false, isHalf: false });
        }
        
        return result;
    }

    get containerClass() {
        return `stars-container ${this.size}`;
    }
}
