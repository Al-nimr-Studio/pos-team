

export class DeliveryNotesInterface {

    static readonly TYPE = 'DeliveryNotes';

    id: String;
    view: String;
    rev: String;
    deliverynotenumber: String;
    ordernumber: String;
    invoicenumber: String;
    created: Date;
    updated: Date;
    deliverydate: Date;
    customer: String;
    deliveryaddress: String;
    deliverynotesummery: String;
    items: items[];
    notes: String;
    billingaddress: String;



    compareTo(other: DeliveryNotesInterface): number {
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
