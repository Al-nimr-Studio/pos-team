export class CrudInterface {

    static readonly TYPE = 'crud-interface';

    id:String;
    rev:String;
     
    view:String;


    v1name:String;
    v1email:String;
    v1password:String;

    v2name:String;
    v2email:String;
    v2password:String;

    created:Date;
    updated:Date;


    compareTo(other:CrudInterface):number {
        return this.created.valueOf() - other.created.valueOf();
    }


}

