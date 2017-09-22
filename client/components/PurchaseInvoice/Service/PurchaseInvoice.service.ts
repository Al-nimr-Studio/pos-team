import { PurchaseInvoiceInterface, items } from "./PurchaseInvoice.interface";
import { PurchaseInvoiceObserver } from "./PurchaseInvoice.observer";
import { SupplierInterface } from '../../Supplier/Service/Supplier.interface';
import { InventoryItemInterface } from '../../InventoryItem/Service/InventoryItem.interface';


declare let PouchDB: any;
declare let emit: Function;


export class PurchaseInvoiceService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<PurchaseInvoiceObserver> = [];
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

    export(value): Promise<Array<PurchaseInvoiceInterface>> {
        if (value === "Json") {
            console.log("3")
            return new Promise((resolve, reject) => {
                let mapFunc: Function = (doc: any) => emit(doc.view);

                let options: Object = {
                    key: 'SalesQuote',
                    include_docs: true
                };

                this.pouchDb.query(mapFunc, options)
                    .then((result: any) => {
                        let jason = JSON.stringify(result);
                        // resolve(jason);

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

    fetchSupplier(): Promise<Array<SupplierInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'Supplier',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<SupplierInterface> = result.rows.map((row: any) => this.mapObjectToSupplier(row.doc));
                    entries.sort((one: SupplierInterface, two: SupplierInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    searchSupplier(value): Promise<Array<SupplierInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
                selector: { name: { $regex: value } }
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<SupplierInterface> = result.docs.map((doc: any) => this.mapObjectToSupplier(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
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

    search(value): Promise<Array<PurchaseInvoiceInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
                selector: { issuedate: { $regex: value } }
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<PurchaseInvoiceInterface> = result.docs.map((doc: any) => this.mapObjectToEntry(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }

    pagination(skipi): Promise<Array<PurchaseInvoiceInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                limit: 5,
                key: 'PurchaseOrder',
                include_docs: true,
                skip: skipi,
                descending: true
            };
            console.log("hello from service pagination =>>> " + skipi);

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<PurchaseInvoiceInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: PurchaseInvoiceInterface, two: PurchaseInvoiceInterface) => two.compareTo(one));
                    resolve(entries);
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
    newa(model: PurchaseInvoiceInterface): Promise<PurchaseInvoiceInterface> {
        return new Promise((resolve, reject) => {

            let object: Object = this.mapEntryToObject(model);
            this.pouchDb.put(object)
                .then(() => resolve(model))
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
    hello(model: PurchaseInvoiceInterface): Promise<PurchaseInvoiceInterface> {

        model.id = Date.now().toString();
        model.view = 'SalesQuote';
        model.created = model.updated = new Date();
        return new Promise((resolve, reject) => {
            console.log("from service hello() job is done bosss ! ");
            let object: Object = this.mapEntryToObject(model);
            this.pouchDb.put(object)
                .then(() => resolve(model))
                .catch(reject);

        });
    }
    private mapObjectToEntry(object: any): PurchaseInvoiceInterface {
        let entry: PurchaseInvoiceInterface = new PurchaseInvoiceInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.invoicenumber = object.invoicenumber;
        entry.purchaseorder = object.purchaseorder;
        entry.salesquote = object.salesquote;
        entry.invoicedate = object.invoicedate;
        entry.duedate = object.duedate;
        entry.supplier = object.supplier;
        entry.billingaddress = object.billingaddress;
        entry.invoicesummery = object.invoicesummery;
        entry.items = object.item;

        entry.notes = object.notes;
        entry.total = object.total;


        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: PurchaseInvoiceInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: PurchaseInvoiceInterface.TYPE,
            invoicenumber: entry.invoicenumber,
            purchaseorder: entry.purchaseorder,
            salesquote: entry.salesquote,
            invoicedate: entry.invoicedate,
            duedate: entry.duedate,
            supplier: entry.supplier,
            billingaddress: entry.billingaddress,
            invoicesummery: entry.invoicesummery,
            item: entry.items,

            notes: entry.notes,
            total: entry.total,


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


    private mapObjectToSupplier(object: any): SupplierInterface {
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

    ///////////---------------------Summary Function ------------------///////////////////////////////////
    fetchSupplierTotal(): Promise<Array<PurchaseInvoiceInterface>> {
        return new Promise((resolve, reject) => {
            // let mapFunc: Function = (doc: any) => emit(doc.view);
            var mapReduceFun = {
               map:  function (doc){
                if(doc.view === "PurchaseInvoice"){
                  emit(doc.supplier,doc.total)
                }
            },
                reduce: '_sum'
            };

            let options: Object = {
                // key: 'PurchaseInvoice',
                // include_docs: true
            };

            this.pouchDb.query(mapReduceFun, options)
                .then((result: any) => {
                    console.log("supplier total",result);
                    // let entries: Array<PurchaseInvoiceInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // entries.sort((one: PurchaseInvoiceInterface, two: PurchaseInvoiceInterface) => two.compareTo(one));
                    // resolve(entries);
                })
                .catch(reject);
        });
    }
} 
