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

export class View1Interface {

    static readonly TYPE = 'view-1';

    id:String;
    rev:String;
    
    v1name:String;
    v1email:String;
    v1password:String;

    

    created:Date;
    updated:Date;


    compareTo(other:View1Interface):number {
        return this.created.valueOf() - other.created.valueOf();
    }


}

export class View2Interface {

    static readonly TYPE = 'view-2';

    id:String;
    rev:String;
    

    v2name:String;
    v2email:String;
    v2password:String;

    created:Date;
    updated:Date;


    compareTo(other:View2Interface):number {
        return this.created.valueOf() - other.created.valueOf();
    }


}

