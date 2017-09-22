

export class PurchaseOrderInterface {

    static readonly TYPE = 'PurchaseOrder';

    id: String;
    view: String;
    rev: String;
    reference: String;
    created: Date;
    updated: Date;
    issuedate: Date;
    supplier: String;
    billingaddress: String;
    summery: String;
    items: items[];
    total: Number;
    //itemname: string;

    deliverydate: Date;
    deliveryaddress: String;
    deliveryinstructions: String;
    authorizedby: String;


    compareTo(other: PurchaseOrderInterface): number {
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