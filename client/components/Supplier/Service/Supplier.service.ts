//find and replace
//CrudService
//SupplierObserver
//SupplierInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "Supplier") {
// _id: '_design/Supplier',    
//    key: 'view2',

import {SupplierInterface} from "./Supplier.interface";
import { SupplierObserver } from "./Supplier.observer";

declare let PouchDB:any;
declare let emit:Function;

export class SupplierService {
    private pouchDb:any;
    private pouchDbEventEmitter:any;
    private pouchDbSyncEventEmitter:any;
    private observer:Array<SupplierObserver> = [];

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

    registerObserver(observer:SupplierObserver):void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer:SupplierObserver):void {
        var index:number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver():void {
        this.observer.forEach((observer:SupplierObserver) => observer.notify());
    }

    createv1() {
    let Supplier:Object = {
                        _id: '_design/Supplier',
                        views: {
                            index: {
                            map: function mapFun(doc) {
                                if (doc.view === "Supplier") {
                                emit(doc.view);
                                }
                            }.toString()
                            }
                        }
                        } ;
        return new Promise((resolve, reject) => {
            
            // this.pouchDb.put(Supplier)
            // save the design doc
      this.pouchDb.put(Supplier).catch(function (err) {
  if (err.name !== 'conflict') {
    throw err;
  }
  // ignore if doc already exists
})
                .catch(reject);
        });
    }
    fetchEntriesv1():Promise<Array<SupplierInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc:Function = (doc:any) => emit(doc.view);

            let options:Object = {
                key: 'Supplier',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result:any) => {
                    let entries:Array<SupplierInterface> = result.rows.map((row:any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one:SupplierInterface, two:SupplierInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id:String):Promise<SupplierInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object:any) => {
                    let entry:SupplierInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1:SupplierInterface):Promise<SupplierInterface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry:SupplierInterface):Promise<SupplierInterface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object:any):SupplierInterface {
        let entry:SupplierInterface = new SupplierInterface();
        entry.id = object._id;
        entry.rev = object._rev;
 
        entry.view = object.view;

        entry.name = object.name;
        entry.code = object.code;
        entry.address= object.address;
        entry.creditLimit = object.creditLimit;
        entry.email =object.email;
        entry.telephone = object.telephone;
        entry.fax = object.fax;
        entry.mobile = object.mobile;
        entry.info = object.info;

       

        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry:SupplierInterface):Object {
        return {
            _id: entry.id,
            _rev: entry.rev,
            type: SupplierInterface.TYPE,

            view: entry.view,

           name: entry.name,
            code : entry.code,
            address: entry.address,
            creditLimit: entry.creditLimit,
            email: entry.email,
            telephone: entry.telephone,
            fax: entry.fax,
            mobile: entry.mobile,
            info: entry.info,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }
    
} 
