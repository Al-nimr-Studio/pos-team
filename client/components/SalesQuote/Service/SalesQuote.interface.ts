

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
    items: items[];
    itemname: string;

    haha: { 
        itemname: string;
        description: String;
        unitprice: number;
        amount: number;
        discount: number;
        qty: number;
    }[];
    description: String;
    unitprice: number;
    qty: number;
    discount: number;
    amount: number;
    notes: String
    heading: String





    compareTo(other: SalesQuoteInterface): number {
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