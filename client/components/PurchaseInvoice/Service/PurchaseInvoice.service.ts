//find and replace
//CrudService
//PurchaseInvoiceObserver
//PurchaseInvoiceInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "PurchaseInvoice") {
// _id: '_design/PurchaseInvoice',    
//    key: 'view2',




import { PurchaseInvoiceInterface , SupplierInterface } from "./PurchaseInvoice.interface";
// import {PurchaseInvoiceInterface} from "../interface/PurchaseInvoice.interface";
// import {View2Interface} from "../interface/view2.interface";
import { PurchaseInvoiceObserver } from "./PurchaseInvoice.observer";
// import { View1Interface } from "../../view1/service/view1.interface";
declare let PouchDB: any;
declare let emit: Function;


export class PurchaseInvoiceService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<PurchaseInvoiceObserver> = [];


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

    registerObserver(observer: PurchaseInvoiceObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: PurchaseInvoiceObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: PurchaseInvoiceObserver) => observer.notify());
    }

    createv1() {
        let PurchaseInvoice: Object = {
            _id: '_design/PurchaseInvoice',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "PurchaseInvoice") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(PurchaseInvoice)
            // save the design doc
            this.pouchDb.put(PurchaseInvoice).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<PurchaseInvoiceInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'PurchaseInvoice',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<PurchaseInvoiceInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: PurchaseInvoiceInterface, two: PurchaseInvoiceInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }
fetchsupplier(): Promise<Array<SupplierInterface>> {
               return new Promise((resolve, reject) => {
            let mapFunc:Function = (doc:any) => emit(doc.view);

            let options:Object = {
                key: 'Supplier',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result:any) => {
                    let entries:Array<SupplierInterface> = result.rows.map((row:any) => this.mapObjectToEntrysupplier(row.doc));
                    entries.sort((one:SupplierInterface, two:SupplierInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<PurchaseInvoiceInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: PurchaseInvoiceInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: PurchaseInvoiceInterface): Promise<PurchaseInvoiceInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: PurchaseInvoiceInterface): Promise<PurchaseInvoiceInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }


    private mapObjectToEntry(object: any): PurchaseInvoiceInterface {
        let entry: PurchaseInvoiceInterface = new PurchaseInvoiceInterface();
        entry.id = object._id;
        entry.rev = object._rev;
        entry.view = object.view;
        entry.invoiceDate = object.invoiceDate;
        entry.dueDate = object.dueDate;
        entry.invoiceNumber = object.invoiceNumber;
        entry.orderNumber = object.orderNumber;

        entry.description = object.discription;
        entry.description1 = object.description1;
        entry.qty = object.qty;
        entry.Unitprice = object.Unitprice;
        entry.discount = object.discount;
        entry.amount = object.amount;
        entry.info = object.info;
        entry.Supplier = object.Supplier;

        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: PurchaseInvoiceInterface): Object {
        return {
            _id: entry.id,
            _rev: entry.rev,
            view: entry.view,
            type: PurchaseInvoiceInterface.TYPE,
            invoiceDate: entry.invoiceDate,
            dueDate: entry.dueDate,
            invoiceNumber: entry.invoiceNumber,
            orderNumber: entry.orderNumber,

            description: entry.description,
            description1: entry.description1,
            qty: entry.qty,
            Unitprice: entry.Unitprice,
            discount: entry.discount,
            amount: entry.amount,
            info: entry.info,
            Supplier: entry.Supplier,
            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

    private mapObjectToEntrysupplier(object:any):SupplierInterface {
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

    private mapEntryToObjectsupplier(entry:SupplierInterface):Object {
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
