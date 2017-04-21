

export class MyBusinessDetailsInterface {

    static readonly TYPE = 'MyBusinessDetails';

    id: String;
    view: String;
    rev: String;
    mybusinessname: String;
    created: Date;
    updated: Date;
    mybusinessidentifier: String;
    mybusinessaddress: String;
    mytelephonenumber: String;
    mybusinessemail: String;
    myfax: String;
    mymobile: String;
    logo: String

    compareTo(other: MyBusinessDetailsInterface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
