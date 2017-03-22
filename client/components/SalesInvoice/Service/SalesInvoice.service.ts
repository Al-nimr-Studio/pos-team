//find and replace
//CrudService
//SalesInvoiceObserver
//SalesInvoiceInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "SalesInvoice") {
// _id: '_design/SalesInvoice',    
//    key: 'view2',




import { SalesInvoiceInterface } from "./SalesInvoice.interface";
// import {SalesInvoiceInterface} from "../interface/SalesInvoice.interface";
// import {View2Interface} from "../interface/view2.interface";
import { SalesInvoiceObserver } from "./SalesInvoice.observer";

declare let PouchDB: any;
declare let emit: Function;


export class SalesInvoiceService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<SalesInvoiceObserver> = [];


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

    registerObserver(observer: SalesInvoiceObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: SalesInvoiceObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: SalesInvoiceObserver) => observer.notify());
    }

    createv1() {
        let SalesInvoice: Object = {
            _id: '_design/SalesInvoice',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "SalesInvoice") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(SalesInvoice)
            // save the design doc
            this.pouchDb.put(SalesInvoice).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<SalesInvoiceInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'SalesInvoice',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SalesInvoiceInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: SalesInvoiceInterface, two: SalesInvoiceInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<SalesInvoiceInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: SalesInvoiceInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: SalesInvoiceInterface): Promise<SalesInvoiceInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: SalesInvoiceInterface): Promise<SalesInvoiceInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): SalesInvoiceInterface {
        let entry: SalesInvoiceInterface = new SalesInvoiceInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.invoicenumber = object.invoicenumber;
        entry.purchaseorder = object.purchaseorder;
        entry.salesquote = object.salesquote;
        entry.invoicedate = object.invoicedate;
        entry.duedate = object.duedate;
        entry.customer = object.customer;
        entry.billingaddress = object.billingaddress;
        entry.invoicesummery = object.invoicesummery;
        entry.item = object.item;
        entry.description = object.description;
        entry.unitprice = object.unitprice;
        entry.qty = object.qty;
        entry.discount = object.discount;
        entry.amount = object.amount;
        entry.notes = object.notes;


        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: SalesInvoiceInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: SalesInvoiceInterface.TYPE,
            invoicenumber: entry.invoicenumber,
            purchaseorder: entry.purchaseorder,
            salesquote: entry.salesquote,
            invoicedate: entry.invoicedate,
            duedate: entry.duedate,
            customer: entry.customer,
            billingaddress: entry.billingaddress,
            invoicesummery: entry.invoicesummery,
            item: entry.item,
            description: entry.description,
            unitprice: entry.unitprice,
            qty: entry.qty,
            discount: entry.discount,
            amount: entry.amount,
            notes: entry.notes,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

} 
