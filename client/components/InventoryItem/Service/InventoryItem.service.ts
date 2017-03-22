//find and replace
//CrudService
//InventoryItemObserver
//InventoryItemInterface
//../interface/crud.interface
//../observables/crud.observer
// if (doc.view === "InventoryItem") {
// _id: '_design/InventoryItem',    
//    key: 'view2',




import {InventoryItemInterface} from "./InventoryItem.interface";
// import {InventoryItemInterface} from "../interface/InventoryItem.interface";
// import {View2Interface} from "../interface/view2.interface";
import { InventoryItemObserver } from "./InventoryItem.observer";
// import { View1Interface } from "../../view1/service/view1.interface";

declare let PouchDB:any;
declare let emit:Function;


export class InventoryItemService {

    private pouchDb:any;
    private pouchDbEventEmitter:any;
    private pouchDbSyncEventEmitter:any;
    private observer:Array<InventoryItemObserver> = [];


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

    registerObserver(observer:InventoryItemObserver):void {
        if (!this.observer.includes(observer)) {
            this.observer.push(observer);
        }
    }

    unregisterObserver(observer:InventoryItemObserver):void {
        var index:number = this.observer.indexOf(observer);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    notifyObserver():void {
        this.observer.forEach((observer:InventoryItemObserver) => observer.notify());
    }

    createv1() {
    let InventoryItem:Object = {
                        _id: '_design/InventoryItem',
                        views: {
                            index: {
                            map: function mapFun(doc) {
                                if (doc.view === "InventoryItem") {
                                emit(doc.view);
                                }
                            }.toString()
                            }
                        }
                        } ;
        return new Promise((resolve, reject) => {
            
            // this.pouchDb.put(InventoryItem)
// save the design doc
      this.pouchDb.put(InventoryItem).catch(function (err) {
  if (err.name !== 'conflict') {
    throw err;
  }
  // ignore if doc already exists
})
                .catch(reject);
        });
    }
    fetchEntriesv1():Promise<Array<InventoryItemInterface>> {
        return new Promise((resolve, reject) => {
            let mapFunc:Function = (doc:any) => emit(doc.view);

            let options:Object = {
                key: 'InventoryItem',
                include_docs: true
            };

            this.pouchDb.query(mapFunc, options)
                .then((result:any) => {
                    let entries:Array<InventoryItemInterface> = result.rows.map((row:any) => this.mapObjectToEntry(row.doc));
                    entries.sort((one:InventoryItemInterface, two:InventoryItemInterface) => two.compareTo(one));
                    resolve(entries);
                })
                .catch(reject);
        });
    }

    fetchEntry(id:String):Promise<InventoryItemInterface> {
        return new Promise((resolve, reject) => {
            this.pouchDb.get(id)
                .then((object:any) => {
                    let entry:InventoryItemInterface = this.mapObjectToEntry(object);
                    resolve(entry);
                })
                .catch(reject);
        });
    }

    saveEntryv1(entry1:InventoryItemInterface):Promise<InventoryItemInterface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry1);
            this.pouchDb.put(object)
                .then(() => resolve(entry1))
                .catch(reject);
        });
    }


    deleteEntry(entry:InventoryItemInterface):Promise<InventoryItemInterface> {
        return new Promise((resolve, reject) => {
            let object:Object = this.mapEntryToObject(entry);
            this.pouchDb.remove(object)
                .then(() => resolve(entry))
                .catch(reject);
        });
    }

    private mapObjectToEntry(object:any):InventoryItemInterface {
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

    private mapEntryToObject(entry:InventoryItemInterface):Object {
        return {
            _id: entry.id,
            _rev: entry.rev,
            view: entry.view,
            type: InventoryItemInterface.TYPE,
            itemCode: entry.itemCode,
            itemName: entry.itemName,
            unitName: entry.unitName,
            costPrice: entry.costPrice,
            salePrice: entry.salePrice,
            Descrpition: entry.Descrpition,
            created: entry.created.toISOString(),
            updated: entry.updated.toISOString()
        };
    }
    
} 
