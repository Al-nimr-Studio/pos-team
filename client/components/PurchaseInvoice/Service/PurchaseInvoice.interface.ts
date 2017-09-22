

export class PurchaseInvoiceInterface {

    static readonly TYPE = 'PurchaseInvoice';

    id: String;
    view: String;
    rev: String;
    invoicenumber: String;
    purchaseorder: String;
    salesquote: String;
    created: Date;
    updated: Date;
    invoicedate: Date;
    duedate: Date;
    supplier: String;
    billingaddress: String;
    invoicesummery: String;
    items: items[];
    notes: String;
    total: Number;





    compareTo(other: PurchaseInvoiceInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}

export class items {
    itemname: string;
    description: String;
    unitprice: number;
    amount: number;
    discount: number;
    qty: number;

}