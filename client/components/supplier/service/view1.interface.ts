

export class View1Interface {

    static readonly TYPE = 'view-1';

    id: String;
    rev: String;
    view: String;

    v1name: String;
    v1email: String;
    v1password: String;



    created: Date;
    updated: Date;


    compareTo(other: View1Interface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
