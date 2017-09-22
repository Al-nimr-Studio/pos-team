import { ExpenseCategoriesInterface } from "./ExpenseCategories.interface";
import { ExpenseCategoriesObserver } from "./ExpenseCategories.observer";

declare let PouchDB: any;
declare let emit: Function;

export class ExpenseCategoriesService {
    private pouchDb: any;
    private pouchDbEventEmitter: any;
    private pouchDbSyncEventEmitter: any;
    private observer: Array<ExpenseCategoriesObserver> = [];
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

    export(value): Promise<Array<ExpenseCategoriesInterface>> {
        if (value === "Json") {
            console.log("3")
            return new Promise((resolve, reject) => {
                let mapFunc: Function = (doc: any) => emit(doc.view);

                let options: Object = {
                    key: 'ExpenseCategories',
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


    search(value): Promise<Array<ExpenseCategoriesInterface>> {
        return new Promise((resolve, reject) => {

            let options: Object = {
                selector: { issuedate: { $regex: value } }
            };

            this.pouchDb.find(options)
                .then((result: any) => {
                    // let entries: Array<SalesQuoteInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    // resolve(entries);
                    let entries: Array<ExpenseCategoriesInterface> = result.docs.map((doc: any) => this.mapObjectToEntry(doc));
                    resolve(entries);
                    // console.log(result.docs)
                })
                .catch(reject);
        });
    }

    registerObserver(observer: ExpenseCategoriesObserver): void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer: ExpenseCategoriesObserver): void {
        var index: number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this.observer.forEach((observer: ExpenseCategoriesObserver) => observer.notify());
    }

    createv1() {
        let ExpenseCategories: Object = {
            _id: '_design/ExpenseCategories',
            views: {
                index: {
                    map: function mapFun(doc) {
                        if (doc.view === "ExpenseCategories") {
                            emit(doc.view);
                        }
                    }.toString()
                }
            }
        };
        return new Promise((resolve, reject) => {

            // this.pouchDb.put(ExpenseCategories)
            // save the design doc
            this.pouchDb.put(ExpenseCategories).catch(function (err) {
                if (err.name !== 'conflict') {
                    throw err;
                }
                // ignore if doc already exists
            })
                .catch(reject);
        });
    }
    fetchEntriesv1(): Promise<Array<ExpenseCategoriesInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc: Function = (doc: any) => emit(doc.view);

            let options: Object = {
                key: 'ExpenseCategories',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result: any) => {
                    let entries: Array<ExpenseCategoriesInterface> = result.rows.map((row: any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one: ExpenseCategoriesInterface, two: ExpenseCategoriesInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id: String): Promise<ExpenseCategoriesInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object: any) => {
                    let entry: ExpenseCategoriesInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1: ExpenseCategoriesInterface): Promise<ExpenseCategoriesInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry: ExpenseCategoriesInterface): Promise<ExpenseCategoriesInterface> {
        return new Promise((resolve, reject) => {
            let object: Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object: any): ExpenseCategoriesInterface {
        let entry: ExpenseCategoriesInterface = new ExpenseCategoriesInterface();
        entry.view = object.view;
        entry.id = object._id;
        entry.rev = object._rev;
        entry.category = object.category;
       

        entry.created = new Date(object.created);
        entry.updated = new Date(object.updated);
        return entry
    }

    private mapEntryToObject(entry: ExpenseCategoriesInterface): Object {
        return {
            view: entry.view,
            _id: entry.id,
            _rev: entry.rev,
            type: ExpenseCategoriesInterface.TYPE,
            category: entry.category,
           

            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }

} 
