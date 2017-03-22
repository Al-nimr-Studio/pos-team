

export class PurchaseOrderInterface {

    static readonly TYPE = 'PurchaseOrder';

    id:String;
    rev:String;
    view: String;
    issueDate : Date;
    deliveryDate:Date;
    reference: Number;
    discription:String;
    invoiceNo:Number;
    description:String;
    qty:Number;
    Unitprice:Number;
    discount:Number;
    amount:Number;
    deliveryAddress:MSIPAddressInfo;
    deliveryInstruction:String;
    authorizedBy:String;
    created:Date;
    updated:Date;

    compareTo(other: PurchaseOrderInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
