//find and replace
//CrudService
//View1Observer
//View1Interface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "view1") {
// _id: '_design/view1',    
//    key: 'view2',




import {View1Interface} from "./view1.interface";
// import {View1Interface} from "../interface/view1.interface";
// import {View2Interface} from "../interface/view2.interface";
import {View1Observer} from "./view1.observer";

declare let PouchDB:any;
declare let emit:Function;


export class View1Service {

    private pouchDb:any;
    private pouchDbEventEmitter:any;
    private pouchDbSyncEventEmitter:any;
    private observer:Array<View1Observer> = [];


    constructor() {
        this.pouchDb = new PouchDB('crud-data');

        this.pouchDbEventEmitter = this.pouchDb.changes({
            since: 'now',
            live: true
        }).on('change', (event) => this.notifyObserver());

        // this.pouchDbSyncEventEmitter = this.pouchDb.sync('http://localhost:5984/Crud-data', {
        //     live: true,
        //     retry: true
        // });
    }

    registerObserver(observer:View1Observer):void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer:View1Observer):void {
        var index:number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver():void {
        this.observer.forEach((observer:View1Observer) => observer.notify());
    }

    createv1() {
    let view1:Object = {
                        _id: '_design/view1',
                        views: {
                            index: {
                            map: function mapFun(doc) {
                                if (doc.view === "view1") {
                                emit(doc.view);
                                }
                            }.toString()
                            }
                        }
                        } ;
        return new Promise((resolve, reject) => {
            
            // this.pouchDb.put(view1)
// save the design doc
      this.pouchDb.put(view1).catch(function (err) {
  if (err.name !== 'conflict') {
    throw err;
  }
  // ignore if doc already exists
})
                .catch(reject);
        });
    }
    fetchEntriesv1():Promise<Array<View1Interface>> {
        return new Promise((resolve, reject) => {
            let mapFunc:Function = (doc:any) => emit(doc.view);

            let options:Object = {
                key: 'view1',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result:any) => {
                    let entries:Array<View1Interface> = result.rows.map((row:any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one:View1Interface, two:View1Interface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id:String):Promise<View1Interface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object:any) => {
                    let entry:View1Interface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry:View1Interface):Promise<View1Interface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.put(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }


    deleteEntry(entry:View1Interface):Promise<View1Interface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object:any):View1Interface {
        let entry:View1Interface = new View1Interface();
        entry.id = object._id;
        entry.rev = object._rev;
 
        entry.view = object.view;

        entry.v1name = object.v1name;
        entry.v1email = object.v1email;
        entry.v1password = object.v1password;

       

        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry:View1Interface):Object {
        return {
            _id: entry.id,
            _rev: entry.rev,
            type: View1Interface.TYPE,

            view: entry.view,

            v1name: entry.v1name,
            v1email: entry.v1email,
            v1password: entry.v1password,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }
    
} 
