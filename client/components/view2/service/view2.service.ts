//find and replace
//CrudService
//View2Observer
//View2Interface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "View2") {
// _id: '_design/View2',    
//    key: 'view2',




import {View2Interface} from "./View2.interface";
// import {View2Interface} from "../interface/View2.interface";
// import {View2Interface} from "../interface/view2.interface";
import {View2Observer} from "./View2.observer";

declare let PouchDB:any;
declare let emit:Function;


export class View2Service {

    private pouchDb:any;
    private pouchDbEventEmitter:any;
    private pouchDbSyncEventEmitter:any;
    private observer:Array<View2Observer> = [];


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

    registerObserver(observer:View2Observer):void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer:View2Observer):void {
        var index:number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver():void {
        this.observer.forEach((observer:View2Observer) => observer.notify());
    }
    createv2() {
    let view1:Object = {
                        _id: '_design/view2',
                        views: {
                            index: {
                            map: function mapFun(doc) {
                                if (doc.view === "view2") {
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
    fetchEntriesv2():Promise<Array<View2Interface>> {
        return new Promise((resolve, reject) => {
            let mapFunc:Function = (doc:any) => emit(doc.view);

            let options:Object = {
                key: 'view2',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result:any) => {
                    let entries:Array<View2Interface> = result.rows.map((row:any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one:View2Interface, two:View2Interface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }


    fetchEntry(id:String):Promise<View2Interface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object:any) => {
                    let entry:View2Interface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }
    saveEntryv2(entry:View2Interface):Promise<View2Interface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.put(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }


    deleteEntry(entry:View2Interface):Promise<View2Interface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object:any):View2Interface {
        let entry:View2Interface = new View2Interface();
        entry.id = object._id;
        entry.rev = object._rev;
 
        entry.view = object.view;

        entry.v2name = object.v2name;
        entry.v2email = object.v2email;
        entry.v2password = object.v2password;

       

        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry:View2Interface):Object {
        return {
            _id: entry.id,
            _rev: entry.rev,
            type: View2Interface.TYPE,

            view: entry.view,

            v2name: entry.v2name,
            v2email: entry.v2email,
            v2password: entry.v2password,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }
    
} 
