//find and replace
//CrudService
//MyBusinessDetailsObserver
//MyBusinessDetailsInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "MyBusinessDetails") {
// _id: '_design/MyBusinessDetails',    
//    key: 'view2',




import { MyBusinessDetailsInterface } from "./MyBusinessDetails.interface";
// import {MyBusinessDetailsInterface} from "../interface/MyBusinessDetails.interface";
// import {View2Interface} from "../interface/view2.interface";
import { MyBusinessDetailsObserver } from "./MyBusinessDetails.observer";

declare let PouchDB: any;
declare let emit: Function;


export class MyBusinessDetailsService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<MyBusinessDetailsObserver> = [];


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

    registerObserver(observer: MyBusinessDetailsObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: MyBusinessDetailsObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: MyBusinessDetailsObserver) => observer.notify());
    }

    createv1() {
        let MyBusinessDetails: Object = {
            _id: '_design/MyBusinessDetails',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "MyBusinessDetails") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(MyBusinessDetails)
            // save the design doc
            this.pouchDb.put(MyBusinessDetails).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<MyBusinessDetailsInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'MyBusinessDetails',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<MyBusinessDetailsInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: MyBusinessDetailsInterface, two: MyBusinessDetailsInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<MyBusinessDetailsInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: MyBusinessDetailsInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: MyBusinessDetailsInterface): Promise<MyBusinessDetailsInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: MyBusinessDetailsInterface): Promise<MyBusinessDetailsInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): MyBusinessDetailsInterface {
        let entry: MyBusinessDetailsInterface = new MyBusinessDetailsInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.name = object.name;
        entry.email = object.email;
        entry.code = object.code;
        entry.currency = object.currency;
        entry.businessidentifier = object.businessidentifierd;
        entry.billingaddress = object.billingaddress;
        entry.telephonenumber = object.telephonenumber;
        entry.fax = object.fax;
        entry.mobile = object.mobile;
        entry.additionalinformation = object.additionalinformation;


        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: MyBusinessDetailsInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: MyBusinessDetailsInterface.TYPE,
            name: entry.name,
            email: entry.email,
            code: entry.code,
            currency: entry.currency,
            businessidentifier: entry.businessidentifier,
            billingaddress: entry.billingaddress,
            telephonenumber: entry.telephonenumber,
            fax: entry.fax,
            mobile: entry.mobile,
            additionalinformation: entry.additionalinformation,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

} 
