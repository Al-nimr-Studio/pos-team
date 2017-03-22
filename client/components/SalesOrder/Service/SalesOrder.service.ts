//find and replace
//CrudService
//SalesOrderObserver
//SalesOrderInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "SalesOrder") {
// _id: '_design/SalesOrder',    
//    key: 'view2',




import { SalesOrderInterface } from "./SalesOrder.interface";
// import {SalesOrderInterface} from "../interface/SalesOrder.interface";
// import {View2Interface} from "../interface/view2.interface";
import { SalesOrderObserver } from "./SalesOrder.observer";

declare let PouchDB: any;
declare let emit: Function;


export class SalesOrderService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<SalesOrderObserver> = [];


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

    registerObserver(observer: SalesOrderObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: SalesOrderObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: SalesOrderObserver) => observer.notify());
    }

    createv1() {
        let SalesOrder: Object = {
            _id: '_design/SalesOrder',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "SalesOrder") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(SalesOrder)
            // save the design doc
            this.pouchDb.put(SalesOrder).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<SalesOrderInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'SalesOrder',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SalesOrderInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: SalesOrderInterface, two: SalesOrderInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<SalesOrderInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: SalesOrderInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: SalesOrderInterface): Promise<SalesOrderInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: SalesOrderInterface): Promise<SalesOrderInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): SalesOrderInterface {
        let entry: SalesOrderInterface = new SalesOrderInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.reference = object.reference;
        entry.issuedate = object.issuedate;
        entry.customername = object.customername;
        entry.billingaddress = object.billingaddress;
        entry.summery = object.summery;
        entry.item = object.item;
        entry.description = object.desription;
        entry.unitprice = object.unitprice;
        entry.qty = object.qty;
        entry.discount = object.discount;
        entry.amount = object.amount;
        entry.deliveryaddress = object.deliveryaddress;
        entry.deliveryinstructions = object.deliveryinstructions;
        entry.authorizedby = object.authorizedby;



        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: SalesOrderInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: SalesOrderInterface.TYPE,
            reference: entry.reference,
            issuedate: entry.issuedate,
            customername: entry.customername,
            billingaddress: entry.billingaddress,
            summery: entry.summery,
            item: entry.item,
            description: entry.description,
            unitprice: entry.unitprice,
            qty: entry.qty,
            discount: entry.discount,
            amount: entry.amount,
            deliverydate: entry.deliverydate,
            deliveryaddress: entry.deliveryaddress,
            deliveryinstructions: entry.deliveryinstructions,
            authorizedby: entry.authorizedby,



            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

} 
