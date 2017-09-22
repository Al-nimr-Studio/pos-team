//find and replace
//CrudService
//DeliveryNotesObserver
//DeliveryNotesInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "DeliveryNotes") {
// _id: '_design/DeliveryNotes',    
//    key: 'view2',




import { DeliveryNotesInterface, items } from "./DeliveryNotes.interface";
import { DeliveryNotesObserver } from "./DeliveryNotes.observer";
import { CustomerInterface } from '../../Customer/Service/Customer.interface';
import { InventoryItemInterface } from '../../InventoryItem/Service/InventoryItem.interface';


declare let PouchDB: any;
declare let emit: Function;


export class DeliveryNotesService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<DeliveryNotesObserver> = [];
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

    registerObserver(observer: DeliveryNotesObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    export(value): Promise<Array<DeliveryNotesInterface>> {
        if (value === "Json") {
            console.log("3")
            return new Promise((resolve, reject) => {
                let mapFunc: Function = (doc: any) => emit(doc.view);

                let options: Object = {
                    key: 'DeliveryNotes',
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



    saveEntryv1(entry1: DeliveryNotesInterface): Promise<DeliveryNotesInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
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

                    qty: model.qty,


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

    newa(model: DeliveryNotesInterface): Promise<DeliveryNotesInterface> {
        return new Promise((resolve, reject) => {

            let object: Object = this.mapEntryToObject(model);
            this.pouchDb.put(object)
                .then(() => resolve(model))
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
                selector: { name: { $regex: value } }
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<CustomerInterface> = result.docs.map((doc: any) => this.mapObjectToCustomer(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
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

    searchItem(value): Promise<Array<InventoryItemInterface>> {
        return new Promise((resolve, reject) => {

            let options1: Object = {
                selector: { itemName: { $regex: value } }
            };

            this.pouchDb.find(options1)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
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

    search(value): Promise<Array<DeliveryNotesInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
                selector: { issuedate: { $regex: value } }
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<DeliveryNotesInterface> = result.docs.map((doc: any) => this.mapObjectToEntry(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }


    pagination(skipi, value): Promise<Array<DeliveryNotesInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                limit: value,
                key: 'SalesQuote',
                include_docs: true,
                skip: skipi,
                descending: true
            };
            console.log("hello from service pagination =>>> " + skipi);

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
        console.log("hello from service =>>> " + id);
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: DeliveryNotesInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                    console.log("hello from service fetchEntry() =>>> " + entry.deliverynotenumber);

                })
                .catch(reject);
            console.log("hello from service =>>> reject ");

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
        entry.billingaddress = object.billingaddress;
        entry.deliveryaddress = object.deliveryaddress;
        entry.deliverynotesummery = object.deliverynotesummery;
        entry.items = object.item;

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
            billingaddress: entry.billingaddress,
            deliveryaddress: entry.deliveryaddress,
            deliverynotesummery: entry.deliverynotesummery,
            item: entry.items,

            notes: entry.notes,


            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

    private mapObjectToInventory(object: any): InventoryItemInterface {
        let entry: InventoryItemInterface = new InventoryItemInterface();
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

    private array(entry: DeliveryNotesInterface): Object {
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

            item: entry.items,
            description: '',
            unitprice: '',
            qty: '',
            discount: '',
            amount: '',

            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }
} 
