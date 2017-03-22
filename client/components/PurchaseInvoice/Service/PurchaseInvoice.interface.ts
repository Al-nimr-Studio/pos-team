

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
    Supplier: String;
    
    created:Date;
    updated:Date;

    compareTo(other: PurchaseInvoiceInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}


export class SupplierInterface {

    static readonly TYPE = 'Supplier';

    id: String;
    rev: String;
    view: String;

    name: String;
    code: Number;
    address: MSIPAddressInfo;
    creditLimit:Number;
    email:String;
    telephone:String;
    fax:String;
    mobile:Number;
    info:String;


    created: Date;
    updated: Date;


    compareTo(other: SupplierInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }
}
