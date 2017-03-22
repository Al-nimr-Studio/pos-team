//find and replace
//CrudService
//SalesQuoteObserver
//SalesQuoteInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "SalesQuote") {
// _id: '_design/SalesQuote',    
//    key: 'view2',




import { SalesQuoteInterface } from "./SalesQuote.interface";
// import {SalesQuoteInterface} from "../interface/SalesQuote.interface";
// import {View2Interface} from "../interface/view2.interface";
import { SalesQuoteObserver } from "./SalesQuote.observer";

declare let PouchDB: any;
declare let emit: Function;


export class SalesQuoteService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<SalesQuoteObserver> = [];


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

    registerObserver(observer: SalesQuoteObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: SalesQuoteObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: SalesQuoteObserver) => observer.notify());
    }

    createv1() {
        let SalesQuote: Object = {
            _id: '_design/SalesQuote',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "SalesQuote") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(SalesQuote)
            // save the design doc
            this.pouchDb.put(SalesQuote).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<SalesQuoteInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'SalesQuote',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: SalesQuoteInterface, two: SalesQuoteInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<SalesQuoteInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: SalesQuoteInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: SalesQuoteInterface): Promise<SalesQuoteInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: SalesQuoteInterface): Promise<SalesQuoteInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): SalesQuoteInterface {
        let entry: SalesQuoteInterface = new SalesQuoteInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.reference = object.reference;
        entry.issuedate = object.issuedate;
        entry.customer = object.customer;
        entry.billingaddress = object.billingaddress;
        entry.quotesummery = object.quotesummery;
        entry.item = object.item;
        entry.description = object.desription;
        entry.unitprice = object.unitprice;
        entry.qty = object.qty;
        entry.discount = object.discount;
        entry.amount = object.amount;
        entry.notes = object.notes;


        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: SalesQuoteInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: SalesQuoteInterface.TYPE,
            reference: entry.reference,
            issuedate: entry.issuedate,
            customer: entry.customer,
            billingaddress: entry.billingaddress,
            quotesummery: entry.quotesummery,
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
