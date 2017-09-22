//find and replace
//CrudService
//SupplierObserver
//SupplierInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "Supplier") {
// _id: '_design/Supplier',    
//    key: 'view2',

import { SupplierInterface } from "./Supplier.interface";
import { SupplierObserver } from "./Supplier.observer";

declare let PouchDB: any;
declare let emit: Function;

export class SupplierService {
    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<SupplierObserver> = [];
    pager;

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

    export(value): Promise<Array<SupplierInterface>> {
        if (value === "Json") {
            console.log("3")
            return new Promise((resolve, reject) => {
                let mapFunc: Function = (doc: any) => emit(doc.view);

                let options: Object = {
                    key: 'Supplier',
                    include_docs: true
                };

                this.pouchDb.query(mapFunc, options)
                    .then((result: any) => {
                        let jason = JSON.stringify(result);
                        resolve(jason);

                        // let myJsonString = JSON.stringify(entries);

                        // console.log(entries);
                        // console.log (result);
                        // console.log (myJsonString);
                        // var xls = json2xls(myJsonString);

                        // fs.writeFileSync('data.xlsx', xls, 'binary');
                    })
                    .catch(reject);
            });
        }
        if (value === "Excel") {
            console.log("2")

        }
        if (value === "Pdf") {
            console.log("1")

        }
    }


    search(value): Promise<Array<SupplierInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
                selector: { issuedate: { $regex: value } }
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<SupplierInterface> = result.docs.map((doc: any) => this.mapObjectToEntry(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }

    registerObserver(observer: SupplierObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: SupplierObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: SupplierObserver) => observer.notify());
    }

    createv1() {
        let Supplier: Object = {
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
        };
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
    fetchEntriesv1(): Promise<Array<SupplierInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'Supplier',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SupplierInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: SupplierInterface, two: SupplierInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<SupplierInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: SupplierInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: SupplierInterface): Promise<SupplierInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: SupplierInterface): Promise<SupplierInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): SupplierInterface {
        let entry: SupplierInterface = new SupplierInterface();
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

    private mapEntryToObject(entry: SupplierInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: SupplierInterface.TYPE,
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
