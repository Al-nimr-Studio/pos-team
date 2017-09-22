

export class SupplierInterface {

    static readonly TYPE = 'Supplier';

    id: String;
    view: String;
    rev: String;
    name: String;
    created: Date;
    updated: Date;
    code: String;
    currency: String;
    creditlimit: String;
    businessidentifier: String;
    billingaddress: String;
    telephonenumber: String;
    email: String;
    fax: String;
    mobile: String;
    additionalinformation: String

    compareTo(other: SupplierInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
