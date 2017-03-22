

export class InventoryItemInterface {

    static readonly TYPE = 'InventoryItem';

    id:String;
    rev:String;
    view: String;
    itemCode:Number;
    itemName:String;
    unitName:String;
    costPrice:Number;
    salePrice:Number;
    Descrpition:String;
    created:Date;
    updated:Date;

    compareTo(other: InventoryItemInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
