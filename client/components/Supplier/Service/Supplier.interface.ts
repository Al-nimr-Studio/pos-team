

export class SupplierInterface {

    static readonly TYPE = 'Supplier';

    id: String;
    rev: String;
    view: String;

    name: String;
    code: Number;
    address: MSIPAddressInfo;
    creditLimit:Number;
    email:String;
    telephone:String;
    fax:String;
    mobile:Number;
    info:String;


    created: Date;
    updated: Date;


    compareTo(other: SupplierInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
