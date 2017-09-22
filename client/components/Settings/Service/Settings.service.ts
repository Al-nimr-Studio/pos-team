//find and replace
//CrudService
//SettingsObserver
//SettingsInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "Settings") {
// _id: '_design/Settings',    
//    key: 'view2',




import { SettingsInterface, items } from "./Settings.interface";
// import {SettingsInterface} from "../interface/Settings.interface";
// import {View2Interface} from "../interface/view2.interface";
import { SettingsObserver } from "./Settings.observer";
import { CustomerInterface } from '../../Customer/Service/Customer.interface';
import { InventoryItemInterface } from '../../InventoryItem/Service/InventoryItem.interface';



declare let PouchDB: any;
declare let emit: Function;


export class SettingsService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<SettingsObserver> = [];
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

    registerObserver(observer: SettingsObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: SettingsObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: SettingsObserver) => observer.notify());
    }

    createv1() {
        let Settings: Object = {
            _id: '_design/Settings',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "Settings") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(Settings)
            // save the design doc
            this.pouchDb.put(Settings).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }

    fetchEntriesv1(): Promise<Array<SettingsInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'Settings',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SettingsInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: SettingsInterface, two: SettingsInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

        fetchInventry(): Promise<Array<InventoryItemInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'InventoryItem',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<InventoryItemInterface> = result.rows.map((row: any) => this.mapObjectToInventory(row.doc));
                    entries.sort((one: InventoryItemInterface, two: InventoryItemInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchCustomer(): Promise<Array<CustomerInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'Customer',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<CustomerInterface> = result.rows.map((row: any) => this.mapObjectToCustomer(row.doc));
                    entries.sort((one: CustomerInterface, two: CustomerInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    searchCustomer(value): Promise<Array<CustomerInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
               selector: {name: {$regex: value}}
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SettingsInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<CustomerInterface> = result.docs.map((doc: any) => this.mapObjectToCustomer(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }

    searchItem(value): Promise<Array<InventoryItemInterface>> {
        return new Promise((resolve, reject) => {

            let options1: Object = {
               selector: {itemName: {$regex: value}}
            };

            this.pouchDb.find(options1)
                .then((result: any) => {
                    // let entries: Array<SettingsInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<InventoryItemInterface> = result.docs.map((doc: any) => this.mapObjectToInventory(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }

        fetchItem(): Promise<Array<InventoryItemInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'InventoryItem',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<InventoryItemInterface> = result.rows.map((row: any) => this.mapObjectToInventory(row.doc));
                    entries.sort((one: InventoryItemInterface, two: InventoryItemInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }
    search(value): Promise<Array<SettingsInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
               selector: {issuedate: {$regex: value}}
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SettingsInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<SettingsInterface> = result.docs.map((doc: any) => this.mapObjectToEntry(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }

   pagination(skipi,value): Promise<Array<SettingsInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view)
            // ,reduce: '_count';

            let options: Object = {
                limit : value, 
                key: 'Settings',
                include_docs: true,
                skip : skipi,
                descending : true,
                // reduce: true,
            };
        console.log("hello from service pagination =>>> " + skipi);

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SettingsInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: SettingsInterface, two: SettingsInterface) => two.compareTo(one));
                    resolve(entries);
                                    console.log(result)

                })
                .catch(reject);
        });
    }

 numbering(): Promise<Array<SettingsInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view)
            // ,reduce: '_count';

            let options: Object = {
                // limit : value, 
                key: 'Settings',
                include_docs: true,
                // skip : 0,
                // descending : true,
                // reduce: true,
            };
        // console.log("hello from service pagination =>>> " + skipi);

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SettingsInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    resolve(entries);
                 this.pager= entries.length
                 console.log(this.pager)
                 
                })
                .catch(reject);
    
             });
    }

    fetchEntry(id: String): Promise<SettingsInterface> {
        console.log("hello from service =>>> " + id);
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: SettingsInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                    console.log("hello from service fetchEntry() =>>> " + entry.reference);

                })
                .catch(reject);
        });

    }

    saveEntryv1(model: SettingsInterface): Promise<SettingsInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(model);

            this.pouchDb.put(object)
                .then(() => resolve(model))
                .catch(reject);

            console.log("from service hello() entry is done bosss ! " + model);

        });
    }
    ex(model: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(model);
            let object2: Object = {
                _id: model.id,
               items: [{
                    description: model.description,
                    itemname: model.itemname,
                    unitprice: model.unitprice,
                    qty: model.qty,
                    discount: model.discount,
                    amount: model.amount,
                }]
            };
            this.pouchDb.put(object)
                .then(() => resolve(model))
                .catch(reject);
            this.pouchDb.put(object2)
                .then(() => resolve(model))
                .catch(reject);
            console.log("from service hello() entry is done bosss ! " + model);

        });
    }

    newa(model: SettingsInterface): Promise<SettingsInterface> {
        return new Promise((resolve, reject) => {

            let object: Object = this.mapEntryToObject(model);
            this.pouchDb.put(object)
                .then(() => resolve(model))
                .catch(reject);


        });
    }

    deleteEntry(entry: SettingsInterface): Promise<SettingsInterface> {

        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
            console.log("from service hello() entry is done bosss ! " + entry);
            console.log("from service hello() object is done bosss ! " + object);

        });


    }
    hello(model: SettingsInterface): Promise<SettingsInterface> {

        model.id = Date.now().toString();
        model.view = 'Settings';
        model.created = model.updated = new Date();
        return new Promise((resolve, reject) => {
            console.log("from service hello() job is done bosss ! ");
            let object: Object = this.mapEntryToObject(model);
            this.pouchDb.put(object)
                .then(() => resolve(model))
                .catch(reject);

        });
    }

    private mapObjectToEntry(object: any): SettingsInterface {
        let entry: SettingsInterface = new SettingsInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.reference = object.reference;
        entry.issuedate = object.issuedate;
        entry.customer = object.customer;
        entry.billingaddress = object.billingaddress;
        entry.quotesummery = object.quotesummery;
        entry.items = object.item;
        entry.description = object.desription;
        entry.unitprice = object.unitprice;
        entry.qty = object.qty;
        entry.discount = object.discount;
        entry.amount = object.amount;
        entry.notes = object.notes;
        entry.heading = object.heading;


        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: SettingsInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: SettingsInterface.TYPE,
            reference: entry.reference,
            issuedate: entry.issuedate,
            customer: entry.customer,
            billingaddress: entry.billingaddress,
            quotesummery: entry.quotesummery,
            item: entry.items,
            description: entry.description,
            unitprice: entry.unitprice,
            qty: entry.qty,
            discount: entry.discount,
            amount: entry.amount,
            notes: entry.notes,
            heading: entry.heading,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }
    private mapEntryToObjectItems(entry: items): Object {
        return {    

            description: entry.description,
            itemname: entry.itemname,
            unitprice: entry.unitprice,
            qty: entry.qty,
            discount: entry.discount,
            amount: entry.amount,

        };
    }
        private mapObjectToInventory(object: any): InventoryItemInterface {
           let entry:InventoryItemInterface = new InventoryItemInterface();
        entry.id = object._id;
        entry.rev = object._rev;
        entry.view = object.view;
        entry.itemCode = object.itemCode;
        entry.itemName = object.itemName;
        entry.unitName = object.unitName;
        entry.costPrice = object.costPrice;
        entry.salePrice = object.salePrice;
        entry.Descrpition = object.Descrpition;
        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry  
      }
        private mapObjectToCustomer(object: any): CustomerInterface {
        let entry: CustomerInterface = new CustomerInterface();
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
    private array(entry: SettingsInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: SettingsInterface.TYPE,
            reference: entry.reference,
            issuedate: entry.issuedate,
            customer: entry.customer,
            billingaddress: entry.billingaddress,
            quotesummery: entry.quotesummery,
            item: entry.items,
            description: '',
            unitprice: '',
            qty: '',
            discount: '',
            amount: '',
            notes: entry.notes,
            heading: entry.heading,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }
} 
