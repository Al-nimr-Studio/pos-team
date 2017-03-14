

export class PurchaseInvoiceInterface {

    static readonly TYPE = 'PurchaseInvoice';

    id:String;
    rev:String;
    view: String;
    invoiceDate: Date;
    dueDate: Date;
    invoiceNumber: Number;
    orderNumber: Number;
    description:String;

    description1:String;
    qty:Number;
    Unitprice:Number;
    discount:Number;
    amount:Number;
    info:String;
    
    created:Date;
    updated:Date;

    compareTo(other: PurchaseInvoiceInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
