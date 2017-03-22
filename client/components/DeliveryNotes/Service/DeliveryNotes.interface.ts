

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
    item: String;
    description: String;
    unitprice: number;
    qty: number;
    discount: number;
    amount: number;
    notes: String





    compareTo(other: DeliveryNotesInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
