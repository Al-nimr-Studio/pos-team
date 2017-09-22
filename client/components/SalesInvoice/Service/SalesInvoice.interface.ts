

export class SalesInvoiceInterface {

    static readonly TYPE = 'SalesInvoice';

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
    customer: String;
    billingaddress: String;
    invoicesummery: String;
    items: items[];
    notes: String;
    total:number;





    compareTo(other: SalesInvoiceInterface): number {
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