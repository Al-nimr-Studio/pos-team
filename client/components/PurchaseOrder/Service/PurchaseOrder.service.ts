//find and replace
//CrudService
//PurchaseOrderObserver
//PurchaseOrderInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "PurchaseOrder") {
// _id: '_design/PurchaseOrder',    
//    key: 'view2',




import { PurchaseOrderInterface } from "./PurchaseOrder.interface";
// import {PurchaseOrderInterface} from "../interface/PurchaseOrder.interface";
// import {View2Interface} from "../interface/view2.interface";
import { PurchaseOrderObserver } from "./PurchaseOrder.observer";
// import { View1Interface } from "../../view1/service/view1.interface";

declare let PouchDB: any;
declare let emit: Function;


export class PurchaseOrderService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<PurchaseOrderObserver> = [];


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

    registerObserver(observer: PurchaseOrderObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: PurchaseOrderObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: PurchaseOrderObserver) => observer.notify());
    }

    createv1() {
        let PurchaseOrder: Object = {
            _id: '_design/PurchaseOrder',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "PurchaseOrder") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(PurchaseOrder)
            // save the design doc
            this.pouchDb.put(PurchaseOrder).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<PurchaseOrderInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'PurchaseOrder',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<PurchaseOrderInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: PurchaseOrderInterface, two: PurchaseOrderInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<PurchaseOrderInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: PurchaseOrderInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: PurchaseOrderInterface): Promise<PurchaseOrderInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: PurchaseOrderInterface): Promise<PurchaseOrderInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): PurchaseOrderInterface {
        let entry: PurchaseOrderInterface = new PurchaseOrderInterface();
        entry.id = object._id;
        entry.rev = object._rev;
        entry.view = object.view;
        entry.issueDate = object.issueDate;
        entry.deliveryDate = object.deliveryDate;
        entry.reference = object.reference;
        entry.discription = object.discription;

        entry.description = object.description;
        entry.qty = object.qty;
        entry.Unitprice = object.Unitprice;
        entry.discount = object.discount;

        entry.amount = object.amount;

        entry.deliveryAddress = object.deliveryAddress;
        entry.deliveryInstruction = object.deliveryInstruction;
        entry.authorizedBy = object.authorizedBy;
        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: PurchaseOrderInterface): Object {
        return {
            _id: entry.id,
            _rev: entry.rev,
            view: entry.view,
            type: PurchaseOrderInterface.TYPE,
            issueDate: entry.issueDate,
            deliveryDate: entry.deliveryDate,
            reference: entry.reference,
            discription: entry.discription,
            description: entry.description,
            qty: entry.qty,
            Unitprice: entry.Unitprice,
            discount: entry.discount,
            amount: entry.amount,
            deliveryAddress: entry.deliveryAddress,
            deliveryInstruction: entry.deliveryInstruction,
            authorizedBy: entry.authorizedBy,
            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

} 
