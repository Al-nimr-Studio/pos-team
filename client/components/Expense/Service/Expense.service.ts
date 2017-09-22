import { ExpenseInterface, items } from "./Expense.interface";
import { ExpenseObserver } from "./Expense.observer";
import { SupplierInterface } from '../../Supplier/Service/Supplier.interface';
import { InventoryItemInterface } from '../../InventoryItem/Service/InventoryItem.interface';


declare let PouchDB: any;
declare let emit: Function;


export class ExpenseService {

    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<ExpenseObserver> = [];
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

    registerObserver(observer: ExpenseObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: ExpenseObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: ExpenseObserver) => observer.notify());
    }

    export(value): Promise<Array<ExpenseInterface>> {
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
        let Expense: Object = {
            _id: '_design/Expense',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "Expense") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(Expense)
            // save the design doc
            this.pouchDb.put(Expense).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }

    fetchEntriesv1(): Promise<Array<ExpenseInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'Expense',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<ExpenseInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: ExpenseInterface, two: ExpenseInterface) => two.compareTo(one));
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

    fetchExpenseCategory(): Promise<Array<any>>{
        return new Promise((resolve,reject)=>{
            function map(doc: any){
             if(doc.view =='ExpenseCategories'){
                 emit(doc.category);
             }
            }
            let options: Object = {
                // include_docs: true
            };
            this.pouchDb.query(map, options)
            .then((result: any) => {
               console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ", result.rows)
                resolve(result.rows);
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

    fetchEntry(id: String): Promise<ExpenseInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: ExpenseInterface = this.mapObjectToEntry(object);
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

    search(value): Promise<Array<ExpenseInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
                selector: { issuedate: { $regex: value } }
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<ExpenseInterface> = result.docs.map((doc: any) => this.mapObjectToEntry(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }

    pagination(skipi): Promise<Array<ExpenseInterface>> {
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
                    let entries: Array<ExpenseInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: ExpenseInterface, two: ExpenseInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }
    saveEntryv1(entry1: ExpenseInterface): Promise<ExpenseInterface> {
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
    newa(model: ExpenseInterface): Promise<ExpenseInterface> {
        return new Promise((resolve, reject) => {

            let object: Object = this.mapEntryToObject(model);
            this.pouchDb.put(object)
                .then(() => resolve(model))
                .catch(reject);


        });
    }

    deleteEntry(entry: ExpenseInterface): Promise<ExpenseInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }
    hello(model: ExpenseInterface): Promise<ExpenseInterface> {

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
    private mapObjectToEntry(object: any): ExpenseInterface {
        let entry: ExpenseInterface = new ExpenseInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;

        entry. expenseNumber = object.expenseNumber;
        entry.date = object.date;
        entry.expenseSummery = object.expenseSummery;
        entry.items = object.item;
        entry.notes = object.notes;
        entry.total = object.total;


        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: ExpenseInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: ExpenseInterface.TYPE,

            expenseNumber: entry.expenseNumber,
            date: entry.date,
            expenseSummery: entry.expenseSummery,
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
            expenseCategory: entry.expenseCategory,
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

    
} 
