//find and replace
//CrudService
//DeliveryNotesObserver
//DeliveryNotesInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "DeliveryNotes") {
// _id: '_design/DeliveryNotes',    
//    key: 'view2',




import { DeliveryNotesInterface } from "./DeliveryNotes.interface";
// import {DeliveryNotesInterface} from "../interface/DeliveryNotes.interface";
// import {View2Interface} from "../interface/view2.interface";
import { DeliveryNotesObserver } from "./DeliveryNotes.observer";

declare let PouchDB: any;
declare let emit: Function;


export class DeliveryNotesService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<DeliveryNotesObserver> = [];


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

    registerObserver(observer: DeliveryNotesObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: DeliveryNotesObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: DeliveryNotesObserver) => observer.notify());
    }

    createv1() {
        let DeliveryNotes: Object = {
            _id: '_design/DeliveryNotes',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "DeliveryNotes") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(DeliveryNotes)
            // save the design doc
            this.pouchDb.put(DeliveryNotes).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<DeliveryNotesInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'DeliveryNotes',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<DeliveryNotesInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: DeliveryNotesInterface, two: DeliveryNotesInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<DeliveryNotesInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: DeliveryNotesInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: DeliveryNotesInterface): Promise<DeliveryNotesInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: DeliveryNotesInterface): Promise<DeliveryNotesInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): DeliveryNotesInterface {
        let entry: DeliveryNotesInterface = new DeliveryNotesInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.deliverynotenumber = object.deliverynotenumber;
        entry.ordernumber = object.ordernumber;
        entry.invoicenumber = object.invoicenumber;
        entry.deliverydate = object.deliverydate;
        entry.customer = object.customer;
        entry.deliveryaddress = object.deliveryaddress;
        entry.deliverynotesummery = object.deliverynotesummery;
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

    private mapEntryToObject(entry: DeliveryNotesInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: DeliveryNotesInterface.TYPE,
            deliverynotenumber: entry.deliverynotenumber,
            ordernumber: entry.ordernumber,
            invoicenumber: entry.invoicenumber,
            deliverydate: entry.deliverydate,
            customer: entry.customer,
            deliveryaddress: entry.deliveryaddress,
            deliverynotesummery: entry.deliverynotesummery,
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
