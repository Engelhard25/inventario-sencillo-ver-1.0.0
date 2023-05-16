export class Inventory {
    
    constructor({id, code, description, stock, basePrice}){
        this.id          = id;
        this.code        = code;
        this.description = description;
        this.stock       = stock;
        this.basePrice   = basePrice;
    }
}