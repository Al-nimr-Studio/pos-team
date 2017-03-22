

export class SalesOrderInterface {

    static readonly TYPE = 'SalesOrder';

    id: String;
    view: String;
    rev: String;
    reference: String;
    created: Date;
    updated: Date;
    issuedate: Date;
    customername: String;
    billingaddress: String;
    summery: String;
    item: String;
    description: String;
    unitprice: number;
    qty: number;
    discount: number;
    amount: number;
    deliverydate: Date;
    deliveryaddress: String;
    deliveryinstructions: String;
    authorizedby: String;


    compareTo(other: SalesOrderInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
