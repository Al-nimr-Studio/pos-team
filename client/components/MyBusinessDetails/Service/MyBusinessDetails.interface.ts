

export class MyBusinessDetailsInterface {

    static readonly TYPE = 'MyBusinessDetails';

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

    compareTo(other: MyBusinessDetailsInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
