

export class View2Interface {

    static readonly TYPE = 'view-2';

    id: String;
    rev: String;
    view: String;

    v2name: String;
    v2email: String;
    v2password: String;



    created: Date;
    updated: Date;


    compareTo(other: View2Interface): number {
        return this.created.valueOf() - other.created.valueOf();
    }


}
