

export class SalesQuoteInterface {

    static readonly TYPE = 'SalesQuote';

    id: String;
    view: String;
    rev: String;
    reference: String;
    created: Date;
    updated: Date;
    issuedate: Date;
    customer: String;
    billingaddress: String;
    quotesummery: String;
    item: String;
    description: String;
    unitprice: number;
    qty: number;
    discount: number;
    amount: number;
    notes: String





    compareTo(other: SalesQuoteInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
