

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
    item: String;
    description: String;
    unitprice: number;
    qty: number;
    discount: number;
    amount: number;
    notes: String





    compareTo(other: SalesInvoiceInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
