

export class SalesOrderInterface {

    static readonly TYPE = 'SalesOrder';

    id: String;
    view: String;
    rev: String;
    reference: String;
    created: Date;
    updated: Date;
    issuedate: Date;
    customer: String;
    billingaddress: String;
    summery: String;
    items: items[];
    //itemname: string;

    deliverydate: Date;
    deliveryaddress: String;
    deliveryinstructions: String;
    authorizedby: String;


    compareTo(other: SalesOrderInterface): number {
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